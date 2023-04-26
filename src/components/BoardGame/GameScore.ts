export interface GameScore {
  get score(): number;
  get isOver(): boolean;
  get isDraw(): boolean;
  get isStalemate(): boolean;
}

export class AbstractGameScore implements GameScore {
  private readonly gameScore = 0;
  private readonly gameIsOver = false;
  private readonly gameIsDraw = false;
  private readonly gameIsStalemate = false;

  public get score(): number {
    return this.gameScore;
  }

  public get isOver(): boolean {
    return this.gameIsOver;
  }

  public get isDraw(): boolean {
    return this.gameIsDraw;
  }

  public get isStalemate(): boolean {
    return this.gameIsStalemate;
  }
}
