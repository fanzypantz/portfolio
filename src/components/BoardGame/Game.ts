import { Position } from "@components/BoardGame/Position";
import { Board } from "@components/BoardGame/Board";
import { Player } from "@components/BoardGame/Player";
import { Move, AbstractMove } from "@components/BoardGame/Move";
import { GameScore } from "@components/BoardGame/GameScore";

export interface Game {
  get board(): Board;
  get players(): Player[];
  get currentPlayer(): Player;
  get winner(): Player | undefined;
  movePiece(from: Position, to: Position): void;
  undoMove(): void;
  redoMove(): void;
  reset(): void;
}

export class AbstractGame implements Game {
  private readonly gameBoard: Board;
  private readonly gamePlayers: Player[];
  private readonly gameMoves: Move[];
  private readonly gameScore: GameScore;
  private gameMovesIndex: number;

  constructor(gameBoard: Board, gamePlayers: Player[], gameScore: GameScore) {
    this.gameBoard = gameBoard;
    this.gamePlayers = gamePlayers;
    this.gameScore = gameScore;
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
