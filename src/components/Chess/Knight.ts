import { AbstractPiece, PieceColor } from "@components/BoardGame/Piece";
import { Position, BoardPosition } from "@components/BoardGame/Position";
import { Board } from "@components/BoardGame/Board";
import { AbstractMove } from "@components/BoardGame/Move";

import { ChessPieceType } from "@components/Chess/Pawn";

class Knight extends AbstractPiece {
  constructor(color: PieceColor, position: Position) {
    super(ChessPieceType.Knight, color, position);
  }

  generatePossibleMoves(board: Board): void {
    this.possibleMoves.length = 0;

    const { x, y } = this.position.currentPosition;

    // Define all potential knight moves (in a 2x1 "L" shape)
    const knightMoves = [
      { dx: 2, dy: -1 },
      { dx: 2, dy: 1 },
      { dx: -2, dy: -1 },
      { dx: -2, dy: 1 },
      { dx: 1, dy: -2 },
      { dx: 1, dy: 2 },
      { dx: -1, dy: -2 },
      { dx: -1, dy: 2 }
    ];

    for (const { dx, dy } of knightMoves) {
      const targetPosition = new BoardPosition(x + dx, y + dy);
      const targetPiece = board.getPieceAt(targetPosition);

      // Knights can jump over pieces, so they only care about the target square
      if (!targetPiece || targetPiece.color !== this.color) {
        this.possibleMoves.push(new AbstractMove(this.position, targetPosition));
      }
    }
  }
}

export default Knight;
