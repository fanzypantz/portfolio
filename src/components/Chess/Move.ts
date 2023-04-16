import { Position } from "@components/Chess/Position";

export interface Move {
  get from(): Position;
  get to(): Position;
}

export class AbstractMove implements Move {
  private readonly fromMove: Position;
  private readonly toMove: Position;

  constructor(from: Position, to: Position) {
    this.fromMove = from;
    this.toMove = to;
  }

  public get from(): Position {
    return this.fromMove;
  }

  public get to(): Position {
    return this.toMove;
  }
}
