"use client";

import Renderer from "@components/3D/Renderer";
import Lighting from "@components/3D/Lighting";
import Controls from "@components/3D/Controls";

import ChessTilesMesh from "@components/Chess/components/ChessTilesMesh";

// Game classes
import ChessGame from "@components/Chess/ChessGame";
import { AbstractBoard } from "@components/BoardGame/Board";
import { AbstractPlayer } from "@components/BoardGame/Player";
import { AbstractColor } from "@components/BoardGame/Color";
import { PieceColor } from "@components/BoardGame/Piece";
import { BoardPosition } from "@components/BoardGame/Position";

// Board
import ChessBoardBaseMesh from "@components/Chess/components/ChessBoardBaseMesh";

// Pieces
import RookPiece from "@components/Chess/components/RookPiece";
import { useEffect } from "react";
import ChessBoard from "@components/Chess/ChessBoard";

const ChessBoardRenderer = () => {
  const chessGame = new ChessGame(new ChessBoard(), [
    new AbstractPlayer("Andreas", new AbstractColor("white")),
    new AbstractPlayer("Amalie", new AbstractColor("black"))
  ]);

  // useEffect(() => {
  //     chessGame.
  // }, []);

  return (
    <Renderer>
      <Lighting />
      <Controls />
      <ChessBoardBaseMesh />
      <ChessTilesMesh chessGame={chessGame} />
      <group position={[-0.7, 0, -0.7]}>
        {chessGame.board.pieces.map((piece, index) => {
          return <RookPiece key={index} color={piece.color} position={piece.position} />;
        })}
      </group>
    </Renderer>
  );
};

export default ChessBoardRenderer;
