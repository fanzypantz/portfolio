"use client";

import Renderer from "@components/3D/Renderer";
import Lighting from "@components/3D/Lighting";
import Controls from "@components/3D/Controls";

// Chess classes
import { Tile, AbstractTile } from "@components/Chess/Tile";
import { Position, AbstractPosition } from "@components/Chess/Position";

// Board
import ChessBoardBaseMesh from "@components/Chess/components/ChessBoardBaseMesh";
import ChessTileMesh from "@components/Chess/components/ChessTileMesh";

// Pieces
import Queen from "@components/Chess/components/Queen";
import { useState } from "react";
import { AbstractGame } from "@components/Chess/Game";
import { AbstractBoard } from "@components/Chess/Board";
import { AbstractPlayer } from "@components/Chess/Player";
import { AbstractColor } from "@components/Chess/Color";
import ChessTilesMesh from "@components/Chess/components/ChessTilesMesh";

const ChessBoardRenderer = () => {
  const chessGame = new AbstractGame(new AbstractBoard(), [
    new AbstractPlayer("Andreas", new AbstractColor("white")),
    new AbstractPlayer("Amalie", new AbstractColor("black"))
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
