"use client";

import Renderer from "@components/3D/Renderer";
import Lighting from "@components/3D/Lighting";
import Controls from "@components/3D/Controls";

// Chess classes
import { ChessTile, ChessTileImpl } from "@components/Chess/ChessTile";
import { ChessPosition, ChessPositionImpl } from "@components/Chess/ChessPosition";

// Board
import ChessBoardBaseMesh from "@components/Chess/components/ChessBoardBaseMesh";
import ChessTileMesh from "@components/Chess/components/ChessTileMesh";

// Pieces
import Queen from "@components/Chess/components/Queen";
import { useState } from "react";
import { ChessGameImpl } from "@components/Chess/ChessGame";
import { ChessBoardImpl } from "@components/Chess/ChessBoard";
import { ChessPlayerImpl } from "@components/Chess/ChessPlayer";
import { ChessColorImpl } from "@components/Chess/ChessColor";
import ChessTilesMesh from "@components/Chess/components/ChessTilesMesh";

const ChessBoardRenderer = () => {
  const chessGame = new ChessGameImpl(new ChessBoardImpl(), [
    new ChessPlayerImpl("Andreas", new ChessColorImpl("white")),
    new ChessPlayerImpl("Amalie", new ChessColorImpl("black"))
  ]);

  return (
    <Renderer>
      <Lighting />
      <Controls />
      <ChessBoardBaseMesh />
      <ChessTilesMesh chessGame={chessGame} />
      <Queen />
    </Renderer>
  );
};

export default ChessBoardRenderer;
