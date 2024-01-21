"use client";

import { GameContext } from "@components/BoardGame/GameProvider";
import { ReactNode, useContext } from "react";
import ChessGame from "@components/Chess/ChessGame";

const Game = () => {
  const { currentGameType, currentGame, currentPieces } = useContext(GameContext);

  if (!currentGame) {
    return null; // TODO: Add loading screen
  }

  if (currentGameType === "chess") {
    return <ChessGame />;
  }

  return null;
};

export default Game;
