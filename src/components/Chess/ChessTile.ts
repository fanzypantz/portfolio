import { ChessPiece } from "@components/Chess/ChessPiece";
import { ChessPosition } from "@components/Chess/ChessPosition";

export interface ChessTile {
  get piece(): ChessPiece | undefined;
  get position(): ChessPosition;
  equals(other: ChessTile): boolean;
  hasPiece(): boolean;
  setPiece(piece: ChessPiece): void;
}

export class ChessTileImpl implements ChessTile {
  private readonly currentPosition: ChessPosition;
  private currentPiece?: ChessPiece;

  constructor(position: ChessPosition, piece?: ChessPiece) {
    this.currentPosition = position;
    this.currentPiece = piece;
  }

  get piece(): ChessPiece | undefined {
    return this.currentPiece;
  }

  get position(): ChessPosition {
    return this.currentPosition;
  }

  public equals(other: ChessTile): boolean {
    return this.position.equals(other.position);
  }

  public hasPiece(): boolean {
    return this.currentPiece !== undefined;
  }

  public setPiece(piece: ChessPiece): void {
    this.currentPiece = piece;
  }
}
