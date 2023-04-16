import { ChessPosition } from "@components/Chess/ChessPosition";
import { ChessBoard, ChessBoardImpl } from "@components/Chess/ChessBoard";
import { ChessPlayer } from "@components/Chess/ChessPlayer";
import { ChessMove } from "@components/Chess/ChessMove";

export interface ChessGame {
  get board(): ChessBoard;
  get players(): ChessPlayer[];
  get currentPlayer(): ChessPlayer;
  get winner(): ChessPlayer | undefined;
  get isOver(): boolean;
  get isDraw(): boolean;
  get isCheck(): boolean;
  get isCheckmate(): boolean;
  get isStalemate(): boolean;
  movePiece(from: ChessPosition, to: ChessPosition): void;
  undoMove(): void;
  redoMove(): void;
  reset(): void;
}

export class ChessGameImpl implements ChessGame {
  private readonly chessBoard: ChessBoard;
  private readonly chessPlayers: ChessPlayer[];
  private readonly chessMoves: ChessMove[];
  private readonly chessMovesIndex: number;

  constructor() {
    this.chessBoard = new ChessBoardImpl();
    this.chessPlayers = [];
    this.chessMoves = [];
    this.chessMovesIndex = 0;
  }

  public get board(): ChessBoard {
    return this.chessBoard;
  }

  public get players(): ChessPlayer[] {
    return this.chessPlayers;
  }

  public get currentPlayer(): ChessPlayer {
    return this.players[this.chessMovesIndex % this.players.length];
  }

  public get winner(): ChessPlayer | undefined {
    return undefined;
  }

  public get isOver(): boolean {
    return false;
  }

  public get isDraw(): boolean {
    return false;
  }

  public get isCheck(): boolean {
    return false;
  }

  public get isCheckmate(): boolean {
    return false;
  }

  public get isStalemate(): boolean {
    return false;
  }

  public movePiece(from: ChessPosition, to: ChessPosition): void {
    const piece = this.board.getTileAt(from)?.piece;
    if (piece) {
      piece;
    }
  }

  public undoMove(): void {}

  public redoMove(): void {}

  public reset(): void {}
}
