import { Location } from "../types";
import { Piece } from "./Piece";

export class King extends Piece {
    constructor(color: "White" | "Black", moved: boolean = false) {
      super("King", color, moved);
    }
  
    isValidMove(board: (Piece | null)[][], start: Location, target: Location): boolean {
      const rowDifference = Math.abs(start.row - target.row);
      const colDifference = Math.abs(start.col - target.col);
  
      // Ensure the king moves only one square in any direction
      if (rowDifference > 1 || colDifference > 1) {
        return false; // King can only move one square
      }
  
      // Ensure the target square is empty or has an opponent's piece
      const targetPiece = board[target.row][target.col];
      if (targetPiece && targetPiece.color === this.color) {
        return false; // Cannot move to a square occupied by a piece of the same color
      }
  
      // Add logic here for castling if needed in the future
  
      return true; // Valid move
    }

    getValidMoves(board: (Piece | null)[][], start: Location): Location[] {
      const validMoves: Location[] = [];
      const directions = [
        { row: -1, col: 0 },  // Up
        { row: 1, col: 0 },   // Down
        { row: 0, col: -1 },  // Left
        { row: 0, col: 1 },   // Right
        { row: -1, col: -1 }, // Up-Left
        { row: -1, col: 1 },  // Up-Right
        { row: 1, col: -1 },  // Down-Left
        { row: 1, col: 1 },   // Down-Right
      ];
  
      for (const { row: rowDir, col: colDir } of directions) {
        const row = start.row + rowDir;
        const col = start.col + colDir;
  
        if (this.isInBounds(row, col)) {
          const piece = board[row][col];
          if (!piece || piece.color !== this.color) {
            validMoves.push({ row, col });
          }
        }
      }
  
      // TODO: Implement castling logic (if needed)
  
      return validMoves;
    }
}