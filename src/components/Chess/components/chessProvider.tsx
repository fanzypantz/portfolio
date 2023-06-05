import { createContext, useEffect, useState } from "react";
import ChessGame from "@components/Chess/ChessGame";
import ChessBoard from "@components/Chess/ChessBoard";
import { AbstractPlayer } from "@components/BoardGame/Player";
import { Piece, PieceColor } from "@components/BoardGame/Piece";
import { AbstractGameScore } from "@components/BoardGame/GameScore";

export interface ChessContextInterface {
  game: ChessGame | null;
  board: ChessBoard | null;
  player1: AbstractPlayer | null;
  player2: AbstractPlayer | null;
  gameScore: AbstractGameScore | null;
}

export const ChessContext = createContext({} as ChessContextInterface);

export const ChessProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [chessGame, setChessGame] = useState<ChessGame | null>(null);
  const [chessBoard, setChessBoard] = useState<ChessBoard | null>(null);
  const [player1, setPlayer1] = useState<AbstractPlayer | null>(null);
  const [player2, setPlayer2] = useState<AbstractPlayer | null>(null);
  const [gameScore, setGameScore] = useState<AbstractGameScore | null>(null);

  useEffect(() => {
    const board = new ChessBoard();
    const p1 = new AbstractPlayer("Andreas", PieceColor.White);
    const p2 = new AbstractPlayer("Amalie", PieceColor.Black);
    const score = new AbstractGameScore();
    const newChessGame = new ChessGame(board, [p1, p2], score);

    setChessBoard(board);
    setPlayer1(p1);
    setPlayer2(p2);
    setGameScore(score);
    setChessGame(newChessGame);
  }, []);

  return (
    <ChessContext.Provider
      value={{
        game: chessGame,
        board: chessBoard,
        player1: player1,
        player2: player2,
        gameScore: gameScore
      }}
    >
      {children}
    </ChessContext.Provider>
  );
};
