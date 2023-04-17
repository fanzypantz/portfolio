"use client";

import { Game } from "@components/BoardGame/Game";
import ChessTileMesh from "@components/Chess/components/ChessTileMesh";

const ChessTilesMesh = ({ chessGame }: { chessGame: Game }) => {
  return (
    <group position={[-0.6, 0, -0.6]}>
      {chessGame.board.tiles.map((tile, index) => {
        return <ChessTileMesh key={index} tile={tile} />;
      })}
    </group>
  );
};

export default ChessTilesMesh;
