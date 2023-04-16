export interface ChessPiece {
  get type(): string;
  get color(): string;
}

export class ChessPieceImpl implements ChessPiece {
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
