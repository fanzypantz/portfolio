import { AbstractPiece, PieceColor } from "@components/BoardGame/Piece";
import { Position, BoardPosition } from "@components/BoardGame/Position";
import { Board } from "@components/BoardGame/Board";
import { AbstractMove } from "@components/BoardGame/Move";

import { ChessPieceType } from "@components/Chess/Pawn";

class King extends AbstractPiece {
  constructor(color: PieceColor, position: Position) {
    super(ChessPieceType.King, color, position);
  }

  generatePossibleMoves(board: Board): void {
    this.possibleMoves.length = 0;

    const { x, y } = this.position.currentPosition;

    // Check each of the eight directions a King can move
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
      const targetPosition = new BoardPosition(x + dx, y + dy);
      const targetPiece = board.getPieceAt(targetPosition);

      if (!targetPiece || targetPiece.color !== this.color) {
        // King can move to an empty tile or capture an enemy piece
        this.possibleMoves.push(new AbstractMove(this.position, targetPosition));
      }
    }
  }
}

export default King;
