import { Tile, AbstractTile } from "@components/BoardGame/Tile";
import { Position, BoardPosition } from "@components/BoardGame/Position";
import { Piece } from "@components/BoardGame/Piece";

export interface Board {
  get width(): number;
  get height(): number;
  get tiles(): Tile[];
  get pieces(): Piece[];
  getTileAt(position: Position): Tile | undefined;

  initBoard(): void;
  inBounds(position: Position): boolean;
  isValidPosition(position: Position): boolean;
  movePiece(from: Position, to: Position): void;
}

export class AbstractBoard implements Board {
  private readonly boardWidth: number;
  private readonly boardHeight: number;
  private readonly boardTiles: Tile[];

  constructor(width: number, height: number) {
    this.boardWidth = width;
    this.boardHeight = height;

    this.boardTiles = [];
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        this.boardTiles.push(new AbstractTile(new BoardPosition(x, y)));
      }
    }
  }

  public get width(): number {
    return this.boardWidth;
  }

  public get height(): number {
    return this.boardHeight;
  }

  public get tiles(): Tile[] {
    return this.boardTiles;
  }

  public get pieces(): Piece[] {
    return this.boardTiles.filter((tile) => tile.hasPiece()).map((tile) => tile.piece as Piece);
  }

  public getTileAt(position: Position): Tile | undefined {
    return this.tiles.find((tile) => tile.position.equals(position));
  }

  public initBoard(): void {
    throw new Error("Method not implemented.");
  }

  public inBounds(position: Position): boolean {
    return position.x >= 0 && position.y >= 0 && position.x < 8 && position.y < 8;
  }

  public isValidPosition(position: Position): boolean {
    return this.boardTiles.some((tile) => tile.position.equals(position));
  }

  public movePiece(from: Position, to: Position): void {
    const fromTile = this.getTileAt(from);
    const toTile = this.getTileAt(to);
    if (fromTile && toTile && this.isValidPosition(toTile.position) && this.inBounds(toTile.position)) {
      toTile.setPiece(fromTile.piece);
      fromTile.setPiece(undefined);
    }
  }
}
