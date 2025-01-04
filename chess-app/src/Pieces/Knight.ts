import { Location } from "../types";
import { Piece } from "./Piece";

export class Knight extends Piece {
    constructor(color: "White" | "Black", moved: boolean = false) {
      super("Knight", color, moved);
    }
  
    isValidMove(board: (Piece | null)[][], start: Location, target: Location): boolean {
      const rowDifference = Math.abs(start.row - target.row);
      const colDifference = Math.abs(start.col - target.col);
  
      // Check if the move forms an "L" shape
      const isLShapeMove =
        (rowDifference === 2 && colDifference === 1) ||
        (rowDifference === 1 && colDifference === 2);
  
      if (!isLShapeMove) {
        return false; // Invalid knight move
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
      const knightMoves = [
        { row: -2, col: -1 },
        { row: -2, col: 1 },
        { row: -1, col: -2 },
        { row: -1, col: 2 },
        { row: 1, col: -2 },
        { row: 1, col: 2 },
        { row: 2, col: -1 },
        { row: 2, col: 1 },
      ];
  
      for (const { row: rowOffset, col: colOffset } of knightMoves) {
        const row = start.row + rowOffset;
        const col = start.col + colOffset;
  
        if (this.isInBounds(row, col)) {
          const piece = board[row][col];
          if (!piece || piece.color !== this.color) {
            validMoves.push({ row, col });
          }
        }
      }
  
      return validMoves;
    }
}