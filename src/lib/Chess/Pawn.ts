import { AbstractPiece, PieceColor } from "@lib/BoardGame/Piece";
import { BoardPosition, Position } from "@lib/BoardGame/Position";
import { Board } from "@lib/BoardGame/Board";
import { AbstractMove } from "@lib/BoardGame/Move";

export enum ChessPieceType {
  King = "King",
  Queen = "Queen",
  Rook = "Rook",
  Bishop = "Bishop",
  Knight = "Knight",
  Pawn = "Pawn"
}

class Pawn extends AbstractPiece {
  constructor(color: PieceColor, position: Position) {
    super(ChessPieceType.Pawn, color, position);
  }

  generatePossibleMoves(board: Board): void {
    this.possibleMoves.length = 0;

    const { x, y } = this.position.currentPosition;

    // Determine the direction of movement based on the color of the pawn
    const direction = this.color === PieceColor.White ? 1 : -1;

    // Check the square directly in front of the pawn
    const frontTile = new BoardPosition(x, y + direction);
    if (!board.getPieceAt(frontTile)) {
      // Pawn can move one square forward if the square is empty
      this.possibleMoves.push(new AbstractMove(this.position, frontTile));

      // Check if the pawn is in its starting position and if the two squares in front are empty
      if ((this.color === PieceColor.White && y === 1) || (this.color === PieceColor.Black && y === 6)) {
        const twoSquaresAhead = new BoardPosition(x, y + 2 * direction);
        if (!board.getPieceAt(twoSquaresAhead)) {
          // Pawn can move two squares forward if both squares are empty
          this.possibleMoves.push(new AbstractMove(this.position, twoSquaresAhead));
        }
      }
    }

    // Check the two diagonal squares for potential captures
    const leftDiagonal = new BoardPosition(x - 1, y + direction);
    const rightDiagonal = new BoardPosition(x + 1, y + direction);
    const leftPiece = board.getPieceAt(leftDiagonal);
    const rightPiece = board.getPieceAt(rightDiagonal);

    if (leftPiece && leftPiece.color !== this.color) {
      this.possibleMoves.push(new AbstractMove(this.position, leftDiagonal));
    }
    if (rightPiece && rightPiece.color !== this.color) {
      this.possibleMoves.push(new AbstractMove(this.position, rightDiagonal));
    }

    console.log(
      "moves : ",
      this.possibleMoves.map((move) => {
        return move.toString();
      })
    );
  }
}

export default Pawn;
