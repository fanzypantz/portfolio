export interface Vector2 {
  x: number;
  y: number;
}

export interface Position {
  get x(): number;
  get y(): number;
  get currentPosition(): Vector2;
  equals(other: Position): boolean;
  toString(): string;
}

export class BoardPosition implements Position {
  private readonly position: Vector2;

  constructor(x: number, y: number) {
    this.position = { x, y };
  }

  get x(): number {
    return this.position.x;
  }

  get y(): number {
    return this.position.y;
  }

  get currentPosition(): Vector2 {
    return this.position;
  }

  public equals(other: Position): boolean {
    return this.x === other.x && this.y === other.y;
  }

  public toString(): string {
    // Return a string representation of the position with the format "A1, B2, C3, etc."
    return String.fromCharCode(65 + this.x) + (this.y + 1);
  }
}
