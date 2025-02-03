"use client";

import { useContext } from "react";
import { Stats } from "@react-three/drei";

import Renderer from "@components/3D/Renderer";
import Lighting from "@components/3D/Lighting";
import Controls from "@components/3D/Controls";
import { ChessContext } from "@components/Chess/chessProvider";

import ChessTilesMesh from "@components/Chess/ChessTilesMesh";

// Board
import ChessBoardBaseMesh from "@components/Chess/ChessBoardBaseMesh";

// Pieces
import ChessPieces from "@components/Chess/ChessPieces";
import CapturedPieces from "@components/Chess/CapturedPieces";

const ChessBoardRenderer = () => {
  const { game } = useContext(ChessContext);

  if (!game || !game.board || !game.board.pieces) {
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
      <CapturedPieces />
    </Renderer>
  );
};

export default ChessBoardRenderer;
