import { Position } from "@lib/BoardGame/Position";
import { Board } from "@lib/BoardGame/Board";
import { Player } from "@lib/BoardGame/Player";
import { Move, AbstractMove } from "@lib/BoardGame/Move";
import { GameScore } from "@lib/BoardGame/GameScore";
import { SupabaseClient } from "@supabase/supabase-js";
import { movePieceAction } from "@components/BoardGame/actions/movePiece";

export interface Game {
  get board(): Board;
  get players(): Player[];
  get currentPlayer(): Player;
  get winner(): Player | undefined;
  movePiece(from: Position, to: Position): void;
  saveMove(from: Position, to: Position): void;
  undoMove(): void;
  redoMove(): void;
  reset(): void;
}

export class AbstractGame implements Game {
  private readonly gameBoard: Board;
  private readonly gamePlayers: Player[];
  private readonly gameMoves: Move[];
  private readonly gameScore: GameScore;
  public readonly game_id: number;
  private gameMovesIndex: number;

  constructor(game_id: number, gameBoard: Board, gamePlayers: Player[], gameScore: GameScore) {
    this.game_id = game_id;
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

  public async movePiece(from: Position, to: Position): Promise<void> {
    if (!this.board.selectedPiece?.possibleMoves.some((move) => move.to.equals(to))) {
      return;
    }

    // Add chess move to list at current index
    this.gameMoves.splice(this.gameMovesIndex, this.gameMoves.length - this.gameMovesIndex, new AbstractMove(from, to));
    this.gameMovesIndex++;
    const moveResult = this.board.movePiece(from, to);

    if (moveResult) {
      await movePieceAction(this.game_id, from.currentPosition, to.currentPosition);
      // Add score to current player
      // this.gameScore.addScore(this.currentPlayer, moveResult.score);
    }
  }

  saveMove(from: Position, to: Position) {}

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
