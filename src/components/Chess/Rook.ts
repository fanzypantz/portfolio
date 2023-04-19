import { AbstractPiece, PieceColor } from "@components/BoardGame/Piece";
import { BoardPosition, Position } from "@components/BoardGame/Position";
import { Board } from "@components/BoardGame/Board";
import { AbstractMove } from "@components/BoardGame/Move";

export enum ChessPieceType {
  King = "King",
  Queen = "Queen",
  Rook = "Rook",
  Bishop = "Bishop",
  Knight = "Knight",
  Pawn = "Pawn"
}

class Rook extends AbstractPiece {
  constructor(color: PieceColor, position: Position) {
    super(ChessPieceType.Rook, color, position);
  }

  generatePossibleMoves(board: Board): void {
    this.possibleMoves.length = 0;

    const { x, y } = this.position.currentPosition;

    // Check squares along the same rank
    for (let fileIndex = 0; fileIndex < 8; fileIndex++) {
      if (fileIndex !== x) {
        const targetTile = board.getTileAt(new BoardPosition(fileIndex, y));
        const targetPiece = targetTile?.piece;

        if (!targetPiece || targetPiece.color !== this.color) {
          this.possibleMoves.push(new AbstractMove(this.position, new BoardPosition(fileIndex, y)));
        }

        if (targetPiece && targetPiece.color !== this.color) {
          break; // Can't go past an enemy piece
        }
      }
    }

    // Check squares along the same file
    for (let rankIndex = 0; rankIndex < 8; rankIndex++) {
      if (rankIndex !== y) {
        const targetTile = board.getTileAt(new BoardPosition(x, rankIndex));
        const targetPiece = targetTile?.piece;

        if (!targetPiece || targetPiece.color !== this.color) {
          this.possibleMoves.push(new AbstractMove(this.position, new BoardPosition(x, rankIndex)));
        }

        if (targetPiece && targetPiece.color !== this.color) {
          break; // Can't go past an enemy piece
        }
      }
    }
  }
}

export default Rook;
