export interface Piece {
  get type(): string;
  get color(): string;
}

export class AbstractPiece implements Piece {
  private readonly pieceType: string;
  private readonly pieceColor: string;

  constructor(type: string, color: string) {
    this.pieceType = type;
    this.pieceColor = color;
  }

  get type(): string {
    return this.pieceType;
  }

  get color(): string {
    return this.pieceColor;
  }
}
