import { AbstractPiece, PieceColor } from "@components/BoardGame/Piece";
import { Position, BoardPosition } from "@components/BoardGame/Position";
import { Board } from "@components/BoardGame/Board";
import { AbstractMove } from "@components/BoardGame/Move";

import { ChessPieceType } from "@components/Chess/Pawn";

class Queen extends AbstractPiece {
  constructor(color: PieceColor, position: Position) {
    super(ChessPieceType.Queen, color, position);
  }

  generatePossibleMoves(board: Board): void {
    this.possibleMoves.length = 0;

    const { x, y } = this.position.currentPosition;

    // Check each of the eight directions a Queen can move
    const directions = [
      { dx: 0, dy: 1 }, // up
      { dx: 1, dy: 0 }, // right
      { dx: 0, dy: -1 }, // down
      { dx: -1, dy: 0 }, // left
      { dx: 1, dy: 1 }, // up-right
      { dx: -1, dy: -1 }, // down-left
      { dx: 1, dy: -1 }, // down-right
      { dx: -1, dy: 1 } // up-left
    ];

    for (const { dx, dy } of directions) {
      for (let distance = 1; distance <= 7; distance++) {
        const targetPosition = new BoardPosition(x + dx * distance, y + dy * distance);
        const targetPiece = board.getPieceAt(targetPosition);

        if (!targetPiece) {
          // if the tile is empty, add it as a possible move
          this.possibleMoves.push(new AbstractMove(this.position, targetPosition));
        } else if (targetPiece.color !== this.color) {
          // if the tile contains an enemy piece, add it as a possible move and stop checking this direction
          this.possibleMoves.push(new AbstractMove(this.position, targetPosition));
          break;
        } else {
          // if the tile contains a friendly piece, stop checking this direction
          break;
        }
      }
    }
  }
}

export default Queen;
