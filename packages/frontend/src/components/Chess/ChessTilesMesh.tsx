"use client";

import ChessTileMesh from "@components/Chess/ChessTileMesh";
import { useContext } from "react";
import { ChessContext } from "@components/Chess/chessProvider";

const ChessTilesMesh = () => {
  const { board } = useContext(ChessContext);

  return (
    <group position={[-0.6, 0, -0.6]}>
      {board?.tiles?.flatMap((row, rowIndex) => {
        return row.map((tile, columnIndex) => {
          return <ChessTileMesh key={`${rowIndex}-${columnIndex}`} tile={tile} />;
        });
      })}
    </group>
  );
};

export default ChessTilesMesh;
