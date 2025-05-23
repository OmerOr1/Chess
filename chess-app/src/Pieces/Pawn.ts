import { Location } from "../types";
import { Piece } from "./Piece";

export class Pawn extends Piece {
  constructor(color: "White" | "Black", hasMoved: boolean = false) {
    super("Pawn", color, hasMoved);
  }

  isValidMove(board: (Piece | null)[][], start: Location, target: Location): boolean {
    const direction = this.color === "White" ? -1 : 1;
    const targetPiece = board[target.row][target.col];

    // Forward movement (1 square)
    if (
      target.row === start.row + direction &&
      target.col === start.col &&
      targetPiece === null
    ) {
      return true;
    }

    // Forward movement (2 squares) on the first move
    if (
      !this.hasMoved &&
      target.row === start.row + 2 * direction &&
      target.col === start.col &&
      board[start.row + direction][start.col] === null &&
      targetPiece === null
    ) {
      return true;
    }

    // Diagonal capture
    if (
      target.row === start.row + direction &&
      (target.col === start.col - 1 || target.col === start.col + 1) &&
      targetPiece !== null &&
      targetPiece.color !== this.color
    ) {
      return true;
    }

    return false;
  }

  getValidMoves(board: (Piece | null)[][], start: Location): Location[] {
    const validMoves: Location[] = [];
    const direction = this.color === "White" ? -1 : 1;
    const startRow = this.color === "White" ? 6 : 1;

    // Forward 1 square
    const forwardOneRow = start.row + direction;
    if (this.isInBounds(forwardOneRow, start.col) && !board[forwardOneRow][start.col]) {
      validMoves.push({ row: forwardOneRow, col: start.col });

      // Forward 2 squares (only if at starting position and both squares are empty)
      const forwardTwoRow = start.row + 2 * direction;
      if (
        start.row === startRow &&
        this.isInBounds(forwardTwoRow, start.col) &&
        !board[forwardTwoRow][start.col]
      ) {
        validMoves.push({ row: forwardTwoRow, col: start.col });
      }
    }

    // Diagonal capture (left)
    const leftCol = start.col - 1;
    if (
      this.isInBounds(forwardOneRow, leftCol) &&
      board[forwardOneRow][leftCol] &&
      board[forwardOneRow][leftCol]?.color !== this.color
    ) {
      validMoves.push({ row: forwardOneRow, col: leftCol });
    }

    // Diagonal capture (right)
    const rightCol = start.col + 1;
    if (
      this.isInBounds(forwardOneRow, rightCol) &&
      board[forwardOneRow][rightCol] &&
      board[forwardOneRow][rightCol]?.color !== this.color
    ) {
      validMoves.push({ row: forwardOneRow, col: rightCol });
    }

    return validMoves;
  }
}