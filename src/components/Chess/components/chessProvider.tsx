import { createContext, useEffect, useState } from "react";
import ChessGame from "@components/Chess/ChessGame";
import ChessBoard from "@components/Chess/ChessBoard";
import { AbstractPlayer } from "@components/BoardGame/Player";
import { Piece, PieceColor } from "@components/BoardGame/Piece";
import { AbstractGameScore } from "@components/BoardGame/GameScore";

export interface ChessContextInterface {
  chessGame: ChessGame | null;
}

export const ChessContext = createContext({} as ChessContextInterface);

export const ChessProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [chessGame, setChessGame] = useState<ChessGame | null>(null);

  useEffect(() => {
    const chessBoard = new ChessBoard();
    const player1 = new AbstractPlayer("Andreas", PieceColor.White);
    const player2 = new AbstractPlayer("Amalie", PieceColor.Black);
    const gameScore = new AbstractGameScore();
    const newChessGame = new ChessGame(chessBoard, [player1, player2], gameScore);
    setChessGame(newChessGame);
  }, []);

  return (
    <ChessContext.Provider
      value={{
        chessGame
      }}
    >
      {children}
    </ChessContext.Provider>
  );
};
