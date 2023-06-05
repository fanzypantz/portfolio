import { Move } from "@components/BoardGame/Move";
import { Position } from "@components/BoardGame/Position";
import { Board } from "@components/BoardGame/Board";
import { action, makeObservable, observable } from "mobx";

export enum PieceColor {
  White = "White",
  Black = "Black"
}

export interface Piece {
  get type(): string;
  get color(): PieceColor;
  position: Position;
  possibleMoves: Move[];
  setPosition(position: Position): void;
  generatePossibleMoves(board: Board): void;
  toString(): string;
}

export class AbstractPiece implements Piece {
  private readonly _type: string;
  private readonly _color: PieceColor;
  position: Position;
  possibleMoves: Move[] = [];

  constructor(type: string, color: PieceColor, position: Position) {
    this._type = type;
    this._color = color;
    this.position = position;

    makeObservable(this, {
      position: observable,
      setPosition: action,
      possibleMoves: observable
    });
  }

  get type(): string {
    return this._type;
  }

  get color(): PieceColor {
    return this._color;
  }

  setPosition(position: Position) {
    this.position = position;
  }

  generatePossibleMoves(board: Board): void {
    throw new Error("Method not implemented.");
  }

  toString(): string {
    return `${this.color} ${this.type}`;
  }
}
