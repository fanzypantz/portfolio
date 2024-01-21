"use client";

import { createContext, useEffect, useState } from "react";
import { createGameAction } from "@components/BoardGame/actions/createGame";
import { Tables } from "@supabase/database.types";
import { getGameAction } from "@components/BoardGame/actions/getGame";
import { getPiecesAction } from "@components/BoardGame/actions/getPieces";

export enum GameType {
  Chess = "chess"
}

export interface GameContextInterface {
  currentGameType: GameType | null;
  currentGame: Tables<"games"> | null;
  currentPieces: Tables<"pieces">[] | null;
  createGame: (lobby_id: number, owner_id: string) => Promise<boolean>;
  closeGame: () => void;
}

export const GameContext = createContext({} as GameContextInterface);

export const GameProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [currentGameType, setCurrentGameType] = useState<GameType | null>(null);
  const [currentGame, setCurrentGame] = useState<Tables<"games"> | null>(null);
  const [currentPieces, setCurrentPieces] = useState<Tables<"pieces">[] | null>(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const gameId = localStorage.getItem("gameId");

    if (gameId) {
      await fetchGame(parseInt(gameId));
      await fetchPieces(parseInt(gameId));
    }
  };

  const fetchGame = async (id: number) => {
    const { data, error } = await getGameAction(id);

    if (error) {
      console.error(error);
      return false;
    }

    setCurrentGame(data ?? null);
    setCurrentGameType(GameType.Chess);
  };

  const fetchPieces = async (game_id: number): Promise<boolean> => {
    const { data, error } = await getPiecesAction(game_id);

    if (error) {
      console.error(error);
      return false;
    }

    setCurrentPieces(data ?? []);
    return true;
  };

  const createGame = async (lobby_id: number, owner_id: string): Promise<boolean> => {
    const { data, error } = await createGameAction(lobby_id, owner_id);

    if (error) {
      console.error(error);
      return false;
    }

    if (!data || !data?.id) {
      return false;
    }

    setCurrentGameType(GameType.Chess);
    setCurrentGame(data);
    localStorage.setItem("gameId", data.id.toString());

    return await fetchPieces(data.id);
  };

  const closeGame = () => {
    setCurrentGameType(null);
    setCurrentGame(null);
    setCurrentPieces(null);
    localStorage.removeItem("gameId");
  };

  return (
    <GameContext.Provider value={{ currentGameType, currentGame, currentPieces, createGame, closeGame }}>
      {children}
    </GameContext.Provider>
  );
};
