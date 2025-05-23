import { Location } from "../types";
import { Piece, Rook } from "../Pieces";

export class King extends Piece {
  constructor(color: "White" | "Black", hasMoved: boolean = false) {
    super("King", color, hasMoved);
  }
  
  isValidMove(board: (Piece | null)[][], start: Location, target: Location): boolean {
    const rowDifference = Math.abs(start.row - target.row);
    const colDifference = Math.abs(start.col - target.col);

    // Ensure the king moves only one square in any direction
    if (rowDifference > 1 || colDifference > 1) {
      return false;
    }

    // Ensure the target square is empty or has an opponent's piece
    const targetPiece = board[target.row][target.col];
    if (targetPiece && targetPiece.color === this.color) {
      return false;
    }
  
    return true;
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
      const target = board[row][col];
      if (!target || target.color !== this.color) {
        validMoves.push({ row, col });
      }
    }
  }

  // Castling base logic
  if (!this.hasMoved) {
    const row = start.row;

    // King-side castling
    const rightRook = board[row][7];
    if (
      rightRook instanceof Rook &&
      !rightRook.hasMoved &&
      !board[row][5] &&
      !board[row][6]
    ) {
      validMoves.push({ row, col: 6 });
    }

    // Queen-side castling
    const leftRook = board[row][0];
    if (
      leftRook instanceof Rook &&
      !leftRook.hasMoved &&
      !board[row][1] &&
      !board[row][2] &&
      !board[row][3]
    ) {
      validMoves.push({ row, col: 2 });
    }
  }

  return validMoves;
  }
}