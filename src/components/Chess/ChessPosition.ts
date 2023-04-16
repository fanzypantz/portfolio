export interface Position {
  x: number;
  y: number;
}

export interface ChessPosition {
  get x(): number;
  get y(): number;
  get currentPosition(): Position;
  equals(other: ChessPosition): boolean;
}

export class ChessPositionImpl implements ChessPosition {
  private readonly position: Position;

  constructor(x: number, y: number) {
    this.position = { x, y };
  }

  get x(): number {
    return this.position.x;
  }

  get y(): number {
    return this.position.y;
  }

  get currentPosition(): Position {
    return this.position;
  }

  public equals(other: ChessPosition): boolean {
    return this.x === other.x && this.y === other.y;
  }
}
