import { Location } from "../types";
import { Piece } from "./Piece";

export class Pawn extends Piece {
  constructor(color: "White" | "Black", moved: boolean = false) {
    super("Pawn", color, moved);
  }

  isValidMove(board: (Piece | null)[][], start: Location, target: Location): boolean {
    const direction = this.color === "White" ? -1 : 1; // White pawns move up (-1), Black pawns move down (+1)
    const targetPiece = board[target.row][target.col];

    // Forward movement (1 square)
    if (
      target.row === start.row + direction &&
      target.col === start.col &&
      targetPiece === null // Target square must be empty
    ) {
      return true;
    }

    // Forward movement (2 squares) on the first move
    if (
      !this.moved &&
      target.row === start.row + 2 * direction &&
      target.col === start.col &&
      board[start.row + direction][start.col] === null && // Square in between must be empty
      targetPiece === null
    ) {
      return true;
    }

    // Diagonal capture
    if (
      target.row === start.row + direction &&
      (target.col === start.col - 1 || target.col === start.col + 1) && // One square diagonally
      targetPiece !== null && // There must be a piece to capture
      targetPiece.color !== this.color // It must be an opponent's piece
    ) {
      return true;
    }

    // If none of the above conditions are met, it's an invalid move
    return false;
  }

  getValidMoves(board: (Piece | null)[][], start: Location): Location[] {
    const validMoves: Location[] = [];
    const direction = this.color === "White" ? -1 : 1; // White pawns move up, Black pawns move down
    const startRow = this.color === "White" ? 6 : 1; // Starting row for pawns

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