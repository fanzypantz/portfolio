"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createGameAction } from "@lib/BoardGame/actions/createGame";
import { getGameAction } from "@lib/BoardGame/actions/getGame";
import { getPiecesAction } from "@lib/BoardGame/actions/getPieces";
import { LobbyContext } from "@components/Lobby/LobbyProvider";
import { closeGameAction } from "@lib/BoardGame/actions/closeGame";
import { Game, GameMove, GamePiece } from "@prisma/client";

export enum GameType {
  Chess = "chess"
}

export interface GameContextInterface {
  currentGameType: GameType | null;
  currentGame: Game | null;
  currentPieces: GamePiece[] | null;
  createGame: (lobby_id: number, owner_id: string) => Promise<boolean>;
  closeGame: () => void;
}

export const GameContext = createContext({} as GameContextInterface);

export const GameProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const { currentLobby } = useContext(LobbyContext);
  const [currentGameType, setCurrentGameType] = useState<GameType | null>(null);
  const [currentGame, setCurrentGame] = useState<Game | null>(null);
  const [currentPieces, setCurrentPieces] = useState<GamePiece[] | null>(null);
  const [currentMoves, setCurrentMoves] = useState<GameMove[] | null>(null);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {}, [currentGame]);

  const init = async (id?: string) => {
    const gameId = id || localStorage.getItem("gameId");

    if (gameId) {
      await fetchGame(parseInt(gameId));
      await fetchPieces(parseInt(gameId));
      localStorage.setItem("gameId", gameId);
    }
  };

  // const handleNewGame = (payload: RealtimePostgresInsertPayload<{ [p: string]: any }>) => {
  //   const newGame = payload.new as Tables<"games">;
  //
  //   init(newGame.id.toString());
  // };
  //
  // const handleGameChange = (payload: RealtimePostgresUpdatePayload<{ [p: string]: any }>) => {
  //   const newGame = payload.new as Tables<"games">;
  //   console.log("Game change : ", newGame);
  //
  //   if (newGame.status === "Closed") {
  //     clearGame();
  //   }
  // };
  //
  // const handleGameMove = (payload: RealtimePostgresUpdatePayload<{ [p: string]: any }>) => {
  //   const gameMove = payload.new as Tables<"piece_moves">;
  //
  //   console.log(gameMove);
  // };

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

  const clearGame = () => {
    setCurrentGameType(null);
    setCurrentGame(null);
    setCurrentPieces(null);
    localStorage.removeItem("gameId");
  };

  const closeGame = async () => {
    if (!currentGame?.id) return;
    console.log("Closing game: ", currentGame.id);

    const { data, error } = await closeGameAction(currentGame?.id);

    if (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <GameContext.Provider value={{ currentGameType, currentGame, currentPieces, createGame, closeGame }}>
      {children}
    </GameContext.Provider>
  );
};
