import { Piece } from "@components/Chess/Piece";
import { Position } from "@components/Chess/Position";

export interface Tile {
  get piece(): Piece | undefined;
  get position(): Position;
  get color(): string;
  equals(other: Tile): boolean;
  hasPiece(): boolean;
  setPiece(piece: Piece | undefined): void;
}

export class AbstractTile implements Tile {
  private readonly currentPosition: Position;
  private currentPiece?: Piece;
  private currentColor: string;

  constructor(position: Position, piece?: Piece) {
    this.currentPosition = position;
    this.currentPiece = piece;
    this.currentColor = (position.x + position.y) % 2 === 0 ? "white" : "black";
  }

  get piece(): Piece | undefined {
    return this.currentPiece;
  }

  get position(): Position {
    return this.currentPosition;
  }

  get color(): string {
    return this.currentColor;
  }

  public equals(other: Tile): boolean {
    return this.position.equals(other.position);
  }

  public hasPiece(): boolean {
    return this.currentPiece !== undefined;
  }

  public setPiece(piece: Piece | undefined): void {
    this.currentPiece = piece;
  }
}
