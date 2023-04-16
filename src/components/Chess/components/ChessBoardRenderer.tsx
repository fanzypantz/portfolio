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

const ChessBoardRenderer = () => {
  // const [board, setBoard] = useState<ChessTile[][]>(initBoard());

  const initBoard = (): ChessTile[][] => {
    const board: ChessTile[][] = [];
    for (let i = 0; i < 8; i++) {
      board.push([]);
      for (let j = 0; j < 8; j++) {
        board[i].push(new ChessTileImpl(new ChessPositionImpl(i, j)));
      }
    }

    console.log("board : ", board);
    return board;
  };

  return (
    <Renderer>
      <Lighting />
      <Controls />
      <ChessBoardBaseMesh />
      <Queen />
    </Renderer>
  );
};

export default ChessBoardRenderer;
