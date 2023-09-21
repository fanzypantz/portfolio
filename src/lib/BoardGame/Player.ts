import { PieceColor } from "@lib/BoardGame/Piece";

export interface Player {
  get name(): string;
  get color(): PieceColor;
}

export class AbstractPlayer implements Player {
  private readonly playerName: string;
  private readonly playerColor: PieceColor;

  constructor(name: string, color: PieceColor) {
    this.playerName = name;
    this.playerColor = color;
  }

  public get name(): string {
    return this.playerName;
  }

  public get color(): PieceColor {
    return this.playerColor;
  }
}
