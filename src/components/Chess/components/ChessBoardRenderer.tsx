"use client";
import { useEffect } from "react";
import { Stats } from "@react-three/drei";

import Renderer from "@components/3D/Renderer";
import Lighting from "@components/3D/Lighting";
import Controls from "@components/3D/Controls";

import ChessTilesMesh from "@components/Chess/components/ChessTilesMesh";

// Game classes
import ChessGame from "@components/Chess/ChessGame";
import ChessBoard from "@components/Chess/ChessBoard";
import { PieceColor } from "@components/BoardGame/Piece";
import { AbstractPlayer } from "@components/BoardGame/Player";
import { AbstractGameScore } from "@components/BoardGame/GameScore";

// Board
import ChessBoardBaseMesh from "@components/Chess/components/ChessBoardBaseMesh";

// Pieces
import ChessPiece from "@components/Chess/components/ChessPiece";

const ChessBoardRenderer = () => {
  const chessGame = new ChessGame(
    new ChessBoard(),
    [new AbstractPlayer("Andreas", PieceColor.White), new AbstractPlayer("Amalie", PieceColor.Black)],
    new AbstractGameScore()
  );

  return (
    <Renderer>
      <Stats />
      <Lighting />
      <Controls />
      <ChessBoardBaseMesh />
      <ChessTilesMesh chessGame={chessGame} />

      <>
        {chessGame.board.pieces.map((piece, index) => {
          return <ChessPiece key={index} piece={piece} />;
        })}
      </>
    </Renderer>
  );
};

export default ChessBoardRenderer;
