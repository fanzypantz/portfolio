"use client";

import ChessBoardRenderer from "@components/Chess/ChessBoardRenderer";
import { ChessProvider } from "@components/Chess/chessProvider";
import { ReactNode, useContext } from "react";
import { GameContext } from "@components/BoardGame/GameProvider";

const ChessGame = () => {
  const { currentGame, currentPieces } = useContext(GameContext);

  return (
    <ChessProvider game_id={currentGame?.id} pieces={currentPieces}>
      <>
        <ChessBoardRenderer />
      </>
    </ChessProvider>
  );
};

export default ChessGame;
