import { ChessPiece } from "@components/Chess/ChessPiece";
import { ChessPosition } from "@components/Chess/ChessPosition";

export interface ChessTile {
  get piece(): ChessPiece | undefined;
  get position(): ChessPosition;
  get color(): string;
  equals(other: ChessTile): boolean;
  hasPiece(): boolean;
  setPiece(piece: ChessPiece | undefined): void;
}

export class ChessTileImpl implements ChessTile {
  private readonly currentPosition: ChessPosition;
  private currentPiece?: ChessPiece;
  private currentColor: string;

  constructor(position: ChessPosition, piece?: ChessPiece) {
    this.currentPosition = position;
    this.currentPiece = piece;
    this.currentColor = (position.x + position.y) % 2 === 0 ? "white" : "black";
  }

  get piece(): ChessPiece | undefined {
    return this.currentPiece;
  }

  get position(): ChessPosition {
    return this.currentPosition;
  }

  get color(): string {
    return this.currentColor;
  }

  public equals(other: ChessTile): boolean {
    return this.position.equals(other.position);
  }

  public hasPiece(): boolean {
    return this.currentPiece !== undefined;
  }

  public setPiece(piece: ChessPiece | undefined): void {
    this.currentPiece = piece;
  }
}
