"use client";
import { useContext } from "react";
import { Stats } from "@react-three/drei";

import Renderer from "@components/3D/Renderer";
import Lighting from "@components/3D/Lighting";
import Controls from "@components/3D/Controls";

import ChessTilesMesh from "@components/Chess/components/ChessTilesMesh";

// Game classes
import { Piece, PieceColor } from "@components/BoardGame/Piece";

// Board
import ChessBoardBaseMesh from "@components/Chess/components/ChessBoardBaseMesh";

// Pieces
import ChessPiece from "@components/Chess/components/ChessPiece";
import { ChessContext } from "@components/Chess/components/chessProvider";
import ChessPieces from "@components/Chess/components/ChessPieces";

const ChessBoardRenderer = () => {
  const { chessGame } = useContext(ChessContext);

  if (!chessGame || !chessGame.board || !chessGame.board.pieces) {
    return null;
  }

  return (
    <Renderer>
      <Stats />
      <Lighting />
      <Controls />
      <ChessBoardBaseMesh />
      <ChessTilesMesh />
      <ChessPieces />
    </Renderer>
  );
};

export default ChessBoardRenderer;
