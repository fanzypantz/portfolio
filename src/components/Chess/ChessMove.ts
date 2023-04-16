import { ChessPosition } from "@components/Chess/ChessPosition";

export interface ChessMove {
  get from(): ChessPosition;
  get to(): ChessPosition;
}

export class ChessMoveImpl implements ChessMove {
  private readonly fromMove: ChessPosition;
  private readonly toMove: ChessPosition;

  constructor(from: ChessPosition, to: ChessPosition) {
    this.fromMove = from;
    this.toMove = to;
  }

  public get from(): ChessPosition {
    return this.fromMove;
  }

  public get to(): ChessPosition {
    return this.toMove;
  }
}
