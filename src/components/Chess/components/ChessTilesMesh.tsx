"use client";

import ChessTileMesh from "@components/Chess/components/ChessTileMesh";
import { useContext } from "react";
import { ChessContext } from "@components/Chess/components/chessProvider";

const ChessTilesMesh = () => {
  const { chessGame } = useContext(ChessContext);

  return (
    <group position={[-0.6, 0, -0.6]}>
      {chessGame?.board.tiles.flatMap((row, rowIndex) => {
        return row.map((tile, columnIndex) => {
          return <ChessTileMesh key={`${rowIndex}-${columnIndex}`} tile={tile} />;
        });
      })}
    </group>
  );
};

export default ChessTilesMesh;
