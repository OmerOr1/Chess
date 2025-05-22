import { Location, PieceType, PieceColor } from "../types";

export abstract class Piece {
  type: PieceType;
  color: PieceColor;
  moved: boolean;

  constructor(type: PieceType, color: PieceColor, moved: boolean = false) {
    this.type = type;
    this.color = color;
    this.moved = moved;
  }

  abstract isValidMove(board: (Piece | null)[][], start: Location, target: Location): boolean;

  abstract getValidMoves(board: (Piece | null)[][], start: Location): Location[];

  protected isInBounds(row: number, col: number): boolean {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
  }

  protected hasMoved(): boolean {
    return this.moved;
  }
}
