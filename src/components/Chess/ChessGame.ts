import { ChessPosition } from "@components/Chess/ChessPosition";
import { ChessBoard } from "@components/Chess/ChessBoard";
import { ChessPlayer } from "@components/Chess/ChessPlayer";
import { ChessMove, ChessMoveImpl } from "@components/Chess/ChessMove";

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
  private chessMoves: ChessMove[];
  private chessMovesIndex: number;

  constructor(chessBoard: ChessBoard, chessPlayers: ChessPlayer[]) {
    this.chessBoard = chessBoard;
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
    // Add chess move to list at current index
    this.chessMoves.splice(
      this.chessMovesIndex,
      this.chessMoves.length - this.chessMovesIndex,
      new ChessMoveImpl(from, to)
    );
    this.chessMovesIndex++;
    this.board.movePiece(from, to);
  }

  public undoMove(): void {
    // Undo move at current index
    if (this.chessMovesIndex > 0) {
      this.chessMovesIndex--;
      const move = this.chessMoves[this.chessMovesIndex];
      this.board.movePiece(move.to, move.from);
    }
  }

  public redoMove(): void {
    // Redo move at current index
    if (this.chessMovesIndex < this.chessMoves.length) {
      const move = this.chessMoves[this.chessMovesIndex];
      this.board.movePiece(move.from, move.to);
      this.chessMovesIndex++;
    }
  }

  public reset(): void {}
}
