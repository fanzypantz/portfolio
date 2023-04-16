export interface ChessColor {
  get name(): string;
}

export class ChessColorImpl implements ChessColor {
  private readonly colorName: string;

  constructor(name: string) {
    this.colorName = name;
  }

  public get name(): string {
    return this.colorName;
  }
}
