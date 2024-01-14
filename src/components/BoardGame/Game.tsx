"use client";

import { GameContext } from "@components/BoardGame/GameProvider";
import { useContext } from "react";
import ChessGame from "@components/Chess/ChessGame";

const Game = () => {
  const { currentGame } = useContext(GameContext);

  if (currentGame === "chess") {
    return <ChessGame />;
  }

  return null;
};

export default Game;
