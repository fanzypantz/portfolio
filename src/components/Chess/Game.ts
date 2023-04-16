import { Position } from "@components/Chess/Position";
import { Board } from "@components/Chess/Board";
import { Player } from "@components/Chess/Player";
import { Move, AbstractMove } from "@components/Chess/Move";

export interface Game {
  get board(): Board;
  get players(): Player[];
  get currentPlayer(): Player;
  get winner(): Player | undefined;
  get isOver(): boolean;
  get isDraw(): boolean;
  get isStalemate(): boolean;
  movePiece(from: Position, to: Position): void;
  undoMove(): void;
  redoMove(): void;
  reset(): void;
}

export class AbstractGame implements Game {
  private readonly gameBoard: Board;
  private readonly gamePlayers: Player[];
  private readonly gameMoves: Move[];
  private gameMovesIndex: number;

  constructor(gameBoard: Board, gamePlayers: Player[]) {
    this.gameBoard = gameBoard;
    this.gamePlayers = gamePlayers;
    this.gameMoves = [];
    this.gameMovesIndex = 0;
  }

  public get board(): Board {
    return this.gameBoard;
  }

  public get players(): Player[] {
    return this.gamePlayers;
  }

  public get currentPlayer(): Player {
    return this.players[this.gameMovesIndex % this.players.length];
  }

  public get winner(): Player | undefined {
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

  public movePiece(from: Position, to: Position): void {
    // Add chess move to list at current index
    this.gameMoves.splice(this.gameMovesIndex, this.gameMoves.length - this.gameMovesIndex, new AbstractMove(from, to));
    this.gameMovesIndex++;
    this.board.movePiece(from, to);
  }

  public undoMove(): void {
    // Undo move at current index
    if (this.gameMovesIndex > 0) {
      this.gameMovesIndex--;
      const move = this.gameMoves[this.gameMovesIndex];
      this.board.movePiece(move.to, move.from);
    }
  }

  public redoMove(): void {
    // Redo move at current index
    if (this.gameMovesIndex < this.gameMoves.length) {
      const move = this.gameMoves[this.gameMovesIndex];
      this.board.movePiece(move.from, move.to);
      this.gameMovesIndex++;
    }
  }

  public reset(): void {}
}
