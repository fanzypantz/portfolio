import { AbstractBoard } from "@lib/BoardGame/Board";
import { PieceColor } from "@lib/BoardGame/Piece";
import { BoardPosition } from "@lib/BoardGame/Position";

import Pawn from "@lib/Chess/Pawn";
import Rook from "@lib/Chess/Rook";
import Bishop from "@lib/Chess/Bishop";
import Knight from "@lib/Chess/Knight";
import Queen from "@lib/Chess/Queen";
import King from "@lib/Chess/King";
import { Tables } from "@supabase/database.types";
import { createPiecesAction } from "@lib/BoardGame/actions/createPieces";

class ChessBoard extends AbstractBoard {
  constructor(game_id: number) {
    super(8, 8, game_id);
  }

  async initBoard(): Promise<void> {
    // Initialize the board with the pieces in their starting positions
    for (let i = 0; i < this.width; i++) {
      this.addPiece(new Pawn(PieceColor.White, new BoardPosition(i, 1)));
      this.addPiece(new Pawn(PieceColor.Black, new BoardPosition(i, 6)));
    }

    // Initialize the rooks
    this.addPiece(new Rook(PieceColor.White, new BoardPosition(0, 0)));
    this.addPiece(new Rook(PieceColor.White, new BoardPosition(7, 0)));
    this.addPiece(new Rook(PieceColor.Black, new BoardPosition(0, 7)));
    this.addPiece(new Rook(PieceColor.Black, new BoardPosition(7, 7)));

    // Initialize the bishops
    this.addPiece(new Bishop(PieceColor.White, new BoardPosition(2, 0)));
    this.addPiece(new Bishop(PieceColor.White, new BoardPosition(5, 0)));
    this.addPiece(new Bishop(PieceColor.Black, new BoardPosition(2, 7)));
    this.addPiece(new Bishop(PieceColor.Black, new BoardPosition(5, 7)));

    // Initialize the knights
    this.addPiece(new Knight(PieceColor.White, new BoardPosition(1, 0)));
    this.addPiece(new Knight(PieceColor.White, new BoardPosition(6, 0)));
    this.addPiece(new Knight(PieceColor.Black, new BoardPosition(1, 7)));
    this.addPiece(new Knight(PieceColor.Black, new BoardPosition(6, 7)));

    // Initialize the queens
    this.addPiece(new Queen(PieceColor.White, new BoardPosition(3, 0)));
    this.addPiece(new Queen(PieceColor.Black, new BoardPosition(3, 7)));

    // Initialize the kings
    this.addPiece(new King(PieceColor.White, new BoardPosition(4, 0)));
    this.addPiece(new King(PieceColor.Black, new BoardPosition(4, 7)));

    // TODO think about moving this
    // Initialize the pieces in the database
    const pieces = this.boardPieces.map((piece) => {
      return {
        game_id: this.game_id,
        x_coordinate: piece.position.x,
        y_coordinate: piece.position.y,
        color: piece.color,
        type: piece.type
      };
    });

    const { data, error } = await createPiecesAction(this.game_id, pieces);

    console.log("initiated database : ", data);
  }

  async initBoardFromDatabase(pieces: Tables<"pieces">[]): Promise<void> {
    // Initialize the board with the pieces in their starting positions
    for (const piece of pieces) {
      const pieceColor = piece.color === "White" ? PieceColor.White : PieceColor.Black;
      const pieceType = piece.type;
      const piecePosition = new BoardPosition(piece.x_coordinate || 0, piece.y_coordinate || 0);

      switch (pieceType) {
        case "Pawn":
          this.addPiece(new Pawn(pieceColor, piecePosition));
          break;
        case "Rook":
          this.addPiece(new Rook(pieceColor, piecePosition));
          break;
        case "Bishop":
          this.addPiece(new Bishop(pieceColor, piecePosition));
          break;
        case "Knight":
          this.addPiece(new Knight(pieceColor, piecePosition));
          break;
        case "Queen":
          this.addPiece(new Queen(pieceColor, piecePosition));
          break;
        case "King":
          this.addPiece(new King(pieceColor, piecePosition));
          break;
        default:
          throw new Error("Invalid piece type");
      }
    }
  }
}

export default ChessBoard;
