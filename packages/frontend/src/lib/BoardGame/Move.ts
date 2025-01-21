import { Position } from "@lib/BoardGame/Position";
import { Tile } from "@lib/BoardGame/Tile";

export interface Move {
  get from(): Position;
  get to(): Position;
  toString(): string;
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

  public toString(): string {
    console.log("this.from : ", this.from);
    console.log("this.to : ", this.to);
    return `${this.from.toString()} -> ${this.to.toString()}`;
  }
}
