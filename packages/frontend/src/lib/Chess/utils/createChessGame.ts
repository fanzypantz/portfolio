import ChessBoard from "@lib/Chess/ChessBoard";
import { AbstractPlayer } from "@lib/BoardGame/Player";
import { PieceColor } from "@lib/BoardGame/Piece";
import { AbstractGameScore } from "@lib/BoardGame/GameScore";
import ChessGame from "@lib/Chess/ChessGame";

export const createChessGame = (gameId: string) => {
  const board = new ChessBoard(gameId);
  const p1 = new AbstractPlayer("Andreas", PieceColor.White);
  const p2 = new AbstractPlayer("Amalie", PieceColor.Black);
  const gameScore = new AbstractGameScore();
  const chessGame = new ChessGame(gameId, board, [p1, p2], gameScore);

  return { board, players: [p1, p2], gameScore, game: chessGame };
};
