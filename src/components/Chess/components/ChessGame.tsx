"use client";

import ChessBoardRenderer from "@components/Chess/components/ChessBoardRenderer";
import { ChessProvider } from "@components/Chess/components/chessProvider";

const ChessGame = () => {
  return (
    <ChessProvider>
      <ChessBoardRenderer />
    </ChessProvider>
  );
};

export default ChessGame;
