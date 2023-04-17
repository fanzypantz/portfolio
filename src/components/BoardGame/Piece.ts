import { Move } from "@components/BoardGame/Move";
import { Position } from "@components/BoardGame/Position";
import { Board } from "@components/BoardGame/Board";
import { Color } from "@components/BoardGame/Color";

export enum PieceColor {
  White = "White",
  Black = "Black"
}

export interface Piece {
  get type(): string;
  get color(): PieceColor;
  get position(): Position;
  get possibleMoves(): Move[];
  set position(position: Position);
  generatePossibleMoves(board: Board): void;
}

export class AbstractPiece implements Piece {
  private readonly pieceType: string;
  private readonly pieceColor: PieceColor;
  private piecePosition: Position;
  private readonly possibleMovesList: Move[];

  constructor(type: string, color: PieceColor, position: Position) {
    this.pieceType = type;
    this.pieceColor = color;
    this.piecePosition = position;
    this.possibleMovesList = [];
  }

  get type(): string {
    return this.pieceType;
  }

  get color(): PieceColor {
    return this.pieceColor;
  }

  get position(): Position {
    return this.piecePosition;
  }

  get possibleMoves(): Move[] {
    return this.possibleMovesList;
  }

  set position(position: Position) {
    this.piecePosition = position;
  }

  generatePossibleMoves(board: Board): void {
    throw new Error("Method not implemented.");
  }
}
