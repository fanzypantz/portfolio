import { Position } from "@components/BoardGame/Position";
import { Board } from "@components/BoardGame/Board";
import { Player } from "@components/BoardGame/Player";
import { Move, AbstractMove } from "@components/BoardGame/Move";

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
    throw new Error("Method not implemented.");
  }

  public get isOver(): boolean {
    throw new Error("Method not implemented.");
  }

  public get isDraw(): boolean {
    throw new Error("Method not implemented.");
  }

  public get isStalemate(): boolean {
    throw new Error("Method not implemented.");
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

  public reset(): void {
    throw new Error("Method not implemented.");
  }
}
