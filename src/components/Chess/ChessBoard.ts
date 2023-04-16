import { ChessTile, ChessTileImpl } from "@components/Chess/ChessTile";
import { ChessPosition, ChessPositionImpl } from "@components/Chess/ChessPosition";

export interface ChessBoard {
  get tiles(): ChessTile[];
  getTileAt(position: ChessPosition): ChessTile | undefined;
  movePiece(from: ChessPosition, to: ChessPosition): void;
}

export class ChessBoardImpl implements ChessBoard {
  private readonly chessTiles: ChessTile[];

  constructor() {
    this.chessTiles = [];
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        this.chessTiles.push(new ChessTileImpl(new ChessPositionImpl(x, y)));
      }
    }
  }

  public get tiles(): ChessTile[] {
    return this.chessTiles;
  }

  public getTileAt(position: ChessPosition): ChessTile | undefined {
    return this.tiles.find((tile) => tile.position.equals(position));
  }

  public movePiece(from: ChessPosition, to: ChessPosition): void {
    const fromTile = this.getTileAt(from);
    const toTile = this.getTileAt(to);
    if (fromTile && toTile) {
      toTile.setPiece(fromTile.piece);
      fromTile.setPiece(undefined);
    }
  }
}
