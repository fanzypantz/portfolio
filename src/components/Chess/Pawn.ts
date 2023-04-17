import { AbstractPiece, PieceColor } from "@components/BoardGame/Piece";
import { BoardPosition, Position } from "@components/BoardGame/Position";
import { Board } from "@components/BoardGame/Board";
import { AbstractMove } from "@components/BoardGame/Move";
import { Color } from "@components/BoardGame/Color";
import { ChessPieceType } from "@components/Chess/Rook";

class Pawn extends AbstractPiece {
  constructor(color: PieceColor, position: Position) {
    super(ChessPieceType.Pawn, color, position);
  }

  generatePossibleMoves(board: Board): void {
    this.possibleMoves.length = 0;

    const { x, y } = this.position.currentPosition;

    // Determine the direction of movement based on the color of the pawn
    const direction = this.color === PieceColor.White ? -1 : 1;

    // Check the square directly in front of the pawn
    const targetTile = board.getTileAt(new BoardPosition(x, y + direction));
    if (targetTile && !targetTile.piece) {
      // Pawn can move one square forward if the square is empty
      this.possibleMoves.push(new AbstractMove(this.position, new BoardPosition(x, y + direction)));

      // Check if the pawn is in its starting position and if the two squares in front are empty
      if ((this.color === PieceColor.White && y === 6) || (this.color === PieceColor.Black && y === 1)) {
        const twoSquaresAhead = board.getTileAt(new BoardPosition(x, y + 2 * direction));
        if (twoSquaresAhead && !twoSquaresAhead.piece) {
          // Pawn can move two squares forward if both squares are empty
          this.possibleMoves.push(new AbstractMove(this.position, new BoardPosition(x, y + 2 * direction)));
        }
      }
    }

    // Check the two diagonal squares for potential captures
    const leftDiagonal = board.getTileAt(new BoardPosition(x - 1, y + direction));
    if (leftDiagonal && leftDiagonal.piece && leftDiagonal.piece.color !== this.color) {
      this.possibleMoves.push(new AbstractMove(this.position, new BoardPosition(x - 1, y + direction)));
    }

    const rightDiagonal = board.getTileAt(new BoardPosition(x + 1, y + direction));
    if (rightDiagonal && rightDiagonal.piece && rightDiagonal.piece.color !== this.color) {
      this.possibleMoves.push(new AbstractMove(this.position, new BoardPosition(x + 1, y + direction)));
    }
  }
}

export default Pawn;
