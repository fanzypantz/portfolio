"use client";

import { ChessGame } from "@components/Chess/ChessGame";
import ChessTileMesh from "@components/Chess/components/ChessTileMesh";

const ChessTilesMesh = ({ chessGame }: { chessGame: ChessGame }) => {
  return (
    <group position={[-0.6, 0, -0.6]}>
      {chessGame.board.tiles.map((tile, index) => {
        return <ChessTileMesh key={index} tile={tile} />;
      })}
    </group>
  );
};

export default ChessTilesMesh;
