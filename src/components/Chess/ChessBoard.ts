import { AbstractBoard } from "@components/BoardGame/Board";
import { PieceColor } from "@components/BoardGame/Piece";
import { BoardPosition } from "@components/BoardGame/Position";

import Pawn from "@components/Chess/Pawn";
import Rook from "@components/Chess/Rook";
import Bishop from "@components/Chess/Bishop";
import Knight from "@components/Chess/Knight";
import Queen from "@components/Chess/Queen";
import King from "@components/Chess/King";

class ChessBoard extends AbstractBoard {
  constructor() {
    super(8, 8);

    this.initBoard();
  }

  initBoard(): void {
    // Initialize the board with the pieces in their starting positions
    for (let i = 0; i < this.width; i++) {
      this.getTileAt(new BoardPosition(i, 1))?.setPiece(new Pawn(PieceColor.White, new BoardPosition(i, 1)));
      this.getTileAt(new BoardPosition(i, 6))?.setPiece(new Pawn(PieceColor.Black, new BoardPosition(i, 6)));
    }

    // Initialize the rooks
    this.getTileAt(new BoardPosition(0, 0))?.setPiece(new Rook(PieceColor.White, new BoardPosition(0, 0)));
    this.getTileAt(new BoardPosition(7, 0))?.setPiece(new Rook(PieceColor.White, new BoardPosition(7, 0)));
    this.getTileAt(new BoardPosition(0, 7))?.setPiece(new Rook(PieceColor.Black, new BoardPosition(0, 7)));
    this.getTileAt(new BoardPosition(7, 7))?.setPiece(new Rook(PieceColor.Black, new BoardPosition(7, 7)));

    // Initialize the bishops
    this.getTileAt(new BoardPosition(2, 0))?.setPiece(new Bishop(PieceColor.White, new BoardPosition(2, 0)));
    this.getTileAt(new BoardPosition(5, 0))?.setPiece(new Bishop(PieceColor.White, new BoardPosition(5, 0)));
    this.getTileAt(new BoardPosition(2, 7))?.setPiece(new Bishop(PieceColor.Black, new BoardPosition(2, 7)));
    this.getTileAt(new BoardPosition(5, 7))?.setPiece(new Bishop(PieceColor.Black, new BoardPosition(5, 7)));

    // Initialize the knights
    this.getTileAt(new BoardPosition(1, 0))?.setPiece(new Knight(PieceColor.White, new BoardPosition(1, 0)));
    this.getTileAt(new BoardPosition(6, 0))?.setPiece(new Knight(PieceColor.White, new BoardPosition(6, 0)));
    this.getTileAt(new BoardPosition(1, 7))?.setPiece(new Knight(PieceColor.Black, new BoardPosition(1, 7)));
    this.getTileAt(new BoardPosition(6, 7))?.setPiece(new Knight(PieceColor.Black, new BoardPosition(6, 7)));

    // Initialize the queens
    this.getTileAt(new BoardPosition(3, 0))?.setPiece(new Queen(PieceColor.White, new BoardPosition(3, 0)));
    this.getTileAt(new BoardPosition(3, 7))?.setPiece(new Queen(PieceColor.Black, new BoardPosition(3, 7)));

    // Initialize the kings
    this.getTileAt(new BoardPosition(4, 0))?.setPiece(new King(PieceColor.White, new BoardPosition(4, 0)));
    this.getTileAt(new BoardPosition(4, 7))?.setPiece(new King(PieceColor.Black, new BoardPosition(4, 7)));
  }
}

export default ChessBoard;
