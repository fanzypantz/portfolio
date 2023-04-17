import { AbstractGame } from "@components/BoardGame/Game";

class ChessGame extends AbstractGame {
  public get isCheck(): boolean {
    return false;
  }

  public get isCheckmate(): boolean {
    return false;
  }
}

export default ChessGame;
