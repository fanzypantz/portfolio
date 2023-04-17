import { Color } from "@components/BoardGame/Color";

export interface Player {
  get name(): string;
  get color(): Color;
}

export class AbstractPlayer implements Player {
  private readonly playerName: string;
  private readonly playerColor: Color;

  constructor(name: string, color: Color) {
    this.playerName = name;
    this.playerColor = color;
  }

  public get name(): string {
    return this.playerName;
  }

  public get color(): Color {
    return this.playerColor;
  }
}
