import { Location } from "../types";
import { Piece } from "./Piece";

export class Queen extends Piece {
    constructor(color: "White" | "Black", hasMoved: boolean = false) {
      super("Queen", color, hasMoved);
    }
  
    isValidMove(board: (Piece | null)[][], start: Location, target: Location): boolean {
      // Calculate row and column differences
      const rowDiff = Math.abs(target.row - start.row);
      const colDiff = Math.abs(target.col - start.col);
  
      // Determine the type of move: horizontal, vertical, or diagonal
      const isDiagonalMove = rowDiff === colDiff;
      const isHorizontalMove = target.row === start.row;
      const isVerticalMove = target.col === start.col;
  
      if (!isDiagonalMove && !isHorizontalMove && !isVerticalMove) {
        return false; // Invalid queen move
      }
  
      // Check for path obstructions
      let rowDirection = 0;
      let colDirection = 0;
  
      if (isDiagonalMove) {
        rowDirection = target.row > start.row ? 1 : -1;
        colDirection = target.col > start.col ? 1 : -1;
      } else if (isHorizontalMove) {
        rowDirection = 0;
        colDirection = target.col > start.col ? 1 : -1;
      } else if (isVerticalMove) {
        rowDirection = target.row > start.row ? 1 : -1;
        colDirection = 0;
      }
  
      let currentRow = start.row + rowDirection;
      let currentCol = start.col + colDirection;
  
      while (currentRow !== target.row || currentCol !== target.col) {
        if (board[currentRow][currentCol] !== null) {
          return false; // Path is blocked
        }
        currentRow += rowDirection;
        currentCol += colDirection;
      }
  
      // Ensure the target square is empty or has an opponent's piece
      const targetPiece = board[target.row][target.col];
      if (targetPiece && targetPiece.color === this.color) {
        return false; // Cannot capture a piece of the same color
      }
  
      return true; // Valid move
    }

    getValidMoves(board: (Piece | null)[][], start: Location): Location[] {
      const validMoves: Location[] = [];
      const directions = [
        { row: -1, col: 0 }, // Up
        { row: 1, col: 0 },  // Down
        { row: 0, col: -1 }, // Left
        { row: 0, col: 1 },  // Right
        { row: -1, col: -1 }, // Up-Left
        { row: -1, col: 1 },  // Up-Right
        { row: 1, col: -1 },  // Down-Left
        { row: 1, col: 1 },   // Down-Right
      ];
  
      for (const { row: rowDir, col: colDir } of directions) {
        let row = start.row + rowDir;
        let col = start.col + colDir;
  
        while (this.isInBounds(row, col)) {
          const piece = board[row][col];
          if (piece) {
            if (piece.color !== this.color) {
              validMoves.push({ row, col }); // Can capture
            }
            break; // Blocked by a piece
          }
          validMoves.push({ row, col });
          row += rowDir;
          col += colDir;
        }
      }
  
      return validMoves;
    }
}