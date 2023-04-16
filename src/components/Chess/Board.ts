import { Tile, AbstractTile } from "@components/Chess/Tile";
import { Position, AbstractPosition } from "@components/Chess/Position";

export interface Board {
  get tiles(): Tile[];
  getTileAt(position: Position): Tile | undefined;
  movePiece(from: Position, to: Position): void;
}

export class AbstractBoard implements Board {
  private readonly chessTiles: Tile[];

  constructor() {
    this.chessTiles = [];
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        this.chessTiles.push(new AbstractTile(new AbstractPosition(x, y)));
      }
    }
  }

  public get tiles(): Tile[] {
    return this.chessTiles;
  }

  public getTileAt(position: Position): Tile | undefined {
    return this.tiles.find((tile) => tile.position.equals(position));
  }

  public movePiece(from: Position, to: Position): void {
    const fromTile = this.getTileAt(from);
    const toTile = this.getTileAt(to);
    if (fromTile && toTile) {
      toTile.setPiece(fromTile.piece);
      fromTile.setPiece(undefined);
    }
  }
}
