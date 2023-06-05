import { Piece } from "@components/BoardGame/Piece";
import { Position } from "@components/BoardGame/Position";
import { action, makeObservable, observable } from "mobx";

export enum TileColor {
  White = "White",
  Black = "Black"
}

export interface Tile {
  get piece(): Piece | undefined;
  get color(): TileColor;
  get position(): Position;
  get active(): boolean;
  equals(other: Tile): boolean;
  hasPiece(): boolean;
  setPiece(piece: Piece | undefined): void;
  setActiveStatus(active: boolean): void;
  removePiece(): void;
}

export class AbstractTile implements Tile {
  private readonly tilePosition: Position;
  private readonly tileColor: TileColor;
  public active: boolean = false;
  public tilePiece?: Piece;

  constructor(position: Position, piece?: Piece) {
    this.tilePosition = position;
    this.tileColor = (position.x + position.y) % 2 === 0 ? TileColor.White : TileColor.Black;
    this.tilePiece = piece;

    makeObservable(this, {
      active: observable,
      setActiveStatus: action,
      tilePiece: observable,
      setPiece: action,
      removePiece: action
    });
  }

  get piece(): Piece | undefined {
    return this.tilePiece;
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

  public hasPiece(): boolean {
    return this.tilePiece !== undefined;
  }

  public setPiece(piece: Piece | undefined): void {
    this.tilePiece = piece;
  }

  public setActiveStatus(active: boolean): void {
    this.active = active;
  }

  public removePiece(): void {
    this.tilePiece = undefined;
  }
}
