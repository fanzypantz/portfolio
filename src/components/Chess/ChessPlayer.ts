import { ChessColor } from "@components/Chess/ChessColor";

export interface ChessPlayer {
  get name(): string;
  get color(): ChessColor;
}

class ChessPlayerImpl implements ChessPlayer {
  private readonly playerName: string;
  private readonly playerColor: ChessColor;

  constructor(name: string, color: ChessColor) {
    this.playerName = name;
    this.playerColor = color;
  }

  public get name(): string {
    return this.playerName;
  }

  public get color(): ChessColor {
    return this.playerColor;
  }
}
