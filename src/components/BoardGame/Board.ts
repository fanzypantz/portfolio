import { Tile, AbstractTile } from "@components/BoardGame/Tile";
import { Position, BoardPosition } from "@components/BoardGame/Position";
import { Piece } from "@components/BoardGame/Piece";
import { action, makeObservable, observable } from "mobx";

export interface Board {
  get width(): number;
  get height(): number;
  get tiles(): Tile[][];
  get pieces(): Piece[];
  selectedPiece: Piece | undefined;
  getTileAt(position: Position): Tile | undefined;

  initBoard(): void;
  inBounds(position: Position): boolean;
  isValidPosition(position: Position): boolean;
  selectPiece(piece: Piece): void;
  unselectPiece(): void;
  movePiece(from: Position, to: Position): void;
  debugPrint(): void;
}

export class AbstractBoard implements Board {
  private readonly boardWidth: number;
  private readonly boardHeight: number;
  public readonly boardTiles: Tile[][];
  public selectedPiece: Piece | undefined = undefined;

  constructor(width: number, height: number) {
    this.boardWidth = width;
    this.boardHeight = height;

    this.boardTiles = Array.from({ length: height }, (_, y) =>
      Array.from({ length: width }, (_, x) => new AbstractTile(new BoardPosition(x, y)))
    );

    makeObservable(this, {
      selectedPiece: observable,
      selectPiece: action,
      unselectPiece: action
    });
  }

  public get width(): number {
    return this.boardWidth;
  }

  public get height(): number {
    return this.boardHeight;
  }

  public get tiles(): Tile[][] {
    return this.boardTiles;
  }

  public get pieces(): Piece[] {
    return this.boardTiles.flat().reduce((pieces: Piece[], tile) => {
      if (tile.hasPiece()) {
        pieces.push(tile.piece as Piece);
      }
      return pieces;
    }, []);
  }

  public getTileAt(position: Position): Tile | undefined {
    return this.boardTiles[position.y][position.x];
  }

  public initBoard(): void {
    throw new Error("Method not implemented.");
  }

  public inBounds(position: Position): boolean {
    return position.x >= 0 && position.y >= 0 && position.x < 8 && position.y < 8;
  }

  public isValidPosition(position: Position): boolean {
    return position.x >= 0 && position.x < this.width && position.y >= 0 && position.y < this.height;
  }

  public selectPiece(piece: Piece): void {
    this.selectedPiece = piece;
  }

  public unselectPiece(): void {
    this.selectedPiece = undefined;
  }

  public movePiece(from: Position, to: Position): void {
    const fromTile = this.getTileAt(from);
    const toTile = this.getTileAt(to);
    if (fromTile && toTile && this.isValidPosition(toTile.position) && this.inBounds(toTile.position)) {
      if (toTile.hasPiece()) {
        // capture piece
        // const capturedPiece = toTile.piece;
        // capturedPiece?.setCaptured(true);
        toTile.removePiece();
      }

      toTile.setPiece(fromTile.piece);
      toTile.piece?.setPosition(toTile.position);
      fromTile.removePiece();
    }
  }

  public debugPrint(): void {
    let boardRepresentation = "";
    for (let y = this.height - 1; y >= 0; y--) {
      // start from the top row
      for (let x = 0; x < this.width; x++) {
        const tile = this.boardTiles[y][x];
        if (tile.piece) {
          // You can replace this with the actual symbol or name of the piece
          boardRepresentation += ` ${tile.piece.toString()} `;
        } else {
          boardRepresentation += " . ";
        }
      }
      boardRepresentation += "\n";
    }
    console.log(boardRepresentation);
  }
}
