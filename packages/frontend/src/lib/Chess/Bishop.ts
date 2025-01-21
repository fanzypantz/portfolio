import { AbstractPiece, PieceColor } from "@lib/BoardGame/Piece";
import { Position, BoardPosition } from "@lib/BoardGame/Position";
import { Board } from "@lib/BoardGame/Board";
import { AbstractMove } from "@lib/BoardGame/Move";

import { ChessPieceType } from "@lib/Chess/Pawn";

class Bishop extends AbstractPiece {
  constructor(color: PieceColor, position: Position) {
    super(ChessPieceType.Bishop, color, position);
  }

  generatePossibleMoves(board: Board): void {
    this.possibleMoves.length = 0;

    const { x, y } = this.position.currentPosition;

    // Check each of the four diagonal directions a Bishop can move
    const directions = [
      { dx: 1, dy: 1 }, // up-right
      { dx: -1, dy: -1 }, // down-left
      { dx: 1, dy: -1 }, // down-right
      { dx: -1, dy: 1 } // up-left
    ];

    for (const { dx, dy } of directions) {
      for (let i = 1; i < 8; i++) {
        const targetPosition = new BoardPosition(x + dx * i, y + dy * i);
        const targetPiece = board.getPieceAt(targetPosition);

        if (!targetPiece) {
          // Bishop can move to an empty tile
          this.possibleMoves.push(new AbstractMove(this.position, targetPosition));
        } else {
          if (targetPiece.color !== this.color) {
            // Bishop can capture an enemy piece
            this.possibleMoves.push(new AbstractMove(this.position, targetPosition));
          }
          // Bishop can't jump over a piece, so break the loop
          break;
        }
      }
    }
  }
}

export default Bishop;
