import { Piece } from "@components/BoardGame/Piece";
import { Position } from "@components/BoardGame/Position";
import { action, makeObservable, observable } from "mobx";

export enum TileColor {
  White = "White",
  Black = "Black"
}

export interface Tile {
  get color(): TileColor;
  get position(): Position;
  equals(other: Tile): boolean;
}

export class AbstractTile implements Tile {
  private readonly tilePosition: Position;
  private readonly tileColor: TileColor;

  constructor(position: Position, piece?: Piece) {
    this.tilePosition = position;
    this.tileColor = (position.x + position.y) % 2 === 0 ? TileColor.White : TileColor.Black;
  }
  get color(): TileColor {
    return this.tileColor;
  }

  get position(): Position {
    return this.tilePosition;
  }

  public equals(other: Tile): boolean {
    return this.position.equals(other.position);
  }
}
