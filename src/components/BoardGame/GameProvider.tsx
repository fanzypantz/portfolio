"use client";

import { createContext, useState } from "react";
import ChessGame from "@components/Chess/ChessGame";

export enum GameType {
  Chess = "chess"
}

export interface GameContextInterface {
  currentGame: GameType | null;
  createGame: () => void;
  closeGame: () => void;
}

export const GameContext = createContext({} as GameContextInterface);

export const GameProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [currentGame, setCurrentGame] = useState<GameType | null>(null);

  const createGame = () => {
    setCurrentGame(GameType.Chess);
  };

  const closeGame = () => {
    setCurrentGame(null);
  };

  return <GameContext.Provider value={{ currentGame, createGame, closeGame }}>{children}</GameContext.Provider>;
};
