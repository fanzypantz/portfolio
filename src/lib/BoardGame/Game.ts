import { Position } from "@lib/BoardGame/Position";
import { Board } from "@lib/BoardGame/Board";
import { Player } from "@lib/BoardGame/Player";
import { Move, AbstractMove } from "@lib/BoardGame/Move";
import { GameScore } from "@lib/BoardGame/GameScore";

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
    if (!this.board.selectedPiece?.possibleMoves.some((move) => move.to.equals(to))) {
      return;
    }

    // Add chess move to list at current index
    console.log("current Player : ", this.currentPlayer.color);
    this.gameMoves.splice(this.gameMovesIndex, this.gameMoves.length - this.gameMovesIndex, new AbstractMove(from, to));
    this.gameMovesIndex++;
    const moveResult = this.board.movePiece(from, to);

    if (moveResult) {
      // Add score to current player
      // this.gameScore.addScore(this.currentPlayer, moveResult.score);
    }
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
