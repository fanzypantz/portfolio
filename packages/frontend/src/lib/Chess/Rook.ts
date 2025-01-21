import { AbstractPiece, PieceColor } from "@lib/BoardGame/Piece";
import { BoardPosition, Position } from "@lib/BoardGame/Position";
import { Board } from "@lib/BoardGame/Board";
import { AbstractMove } from "@lib/BoardGame/Move";
import { ChessPieceType } from "@lib/Chess/Pawn";

class Rook extends AbstractPiece {
  constructor(color: PieceColor, position: Position) {
    super(ChessPieceType.Rook, color, position);
  }

  generatePossibleMoves(board: Board): void {
    this.possibleMoves.length = 0;

    const { x, y } = this.position.currentPosition;

    // Rooks can move in four straight-line directions
    const directions = [
      { dx: 1, dy: 0 }, // right
      { dx: -1, dy: 0 }, // left
      { dx: 0, dy: 1 }, // up
      { dx: 0, dy: -1 } // down
    ];

    for (const { dx, dy } of directions) {
      for (let i = 1; i < 8; i++) {
        const targetPosition = new BoardPosition(x + dx * i, y + dy * i);
        const targetPiece = board.getPieceAt(targetPosition);

        if (!targetPiece) {
          // Rook can move to an empty tile
          this.possibleMoves.push(new AbstractMove(this.position, targetPosition));
        } else {
          if (targetPiece.color !== this.color) {
            // Rook can capture an enemy piece
            this.possibleMoves.push(new AbstractMove(this.position, targetPosition));
          }
          // Rook can't jump over a piece, so break the loop
          break;
        }
      }
    }
  }
}

export default Rook;
