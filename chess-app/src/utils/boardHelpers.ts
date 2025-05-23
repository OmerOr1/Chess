import { Location } from "../types";
import { Piece, King } from "../Pieces";

function filterOutMoves(
  optionalMoves: Location[],
  from: Location,
  board: (Piece | null)[][],
  color: "White" | "Black",
  kingPosition: Location
): Location[] {
  const validMoves: Location[] = [];

  for (const move of optionalMoves) {
    // Clone the board deeply
    const newBoard = board.map((row) => row.slice());
    const movingPiece = newBoard[from.row][from.col];

    // Simulate the move
    newBoard[from.row][from.col] = null;
    newBoard[move.row][move.col] = movingPiece;

    // If king is the moving piece, simulate king position change
    const newKingPos = movingPiece instanceof King ? move : kingPosition;

    // Check if the king is now in check
    const stillSafe = !isKingInCheck(newBoard, newKingPos, color);

    if (stillSafe) {
      validMoves.push(move);
    }
  }

  return validMoves;
}

function isKingInCheck(
  board: (Piece | null)[][],
  kingPosition: Location,
  kingColor: "White" | "Black"
): boolean {
    const attackingColor = kingColor === "White" ? "Black" : "White";

    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        const piece = board[row][col];
        if (piece && 
            piece.color === attackingColor &&
            piece.isValidMove(board, {row, col}, kingPosition)) {
              return true;     
        }
      }
    }
    return false;
}

function opponentHasMoves(
  board: (Piece | null)[][],
  opponentKingPos: Location,
  opponentColor: string): boolean {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        const piece = board[row][col];
        if(!piece || piece.color !== opponentColor){
          continue
        }

        const optional = piece.getValidMoves(board, {row, col});
        const valid = filterOutMoves(optional, {row, col}, board, opponentColor, opponentKingPos);

        if (valid.length > 0){
          return true;
        }
      }
    }
    return false;
}

function findKingPosition(
  board: (Piece | null)[][],
  color: "White" | "Black"
): Location {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const piece = board[row][col];
      if (piece && piece instanceof King && piece.color === color) {
        return { row, col };
      }
    }
  }
  throw new Error(`King of color ${color} not found on the board`);
}

function getCurrentColor(
  isWhiteTurn: boolean
): "White" | "Black" {
  return isWhiteTurn ? "White" : "Black";
}

function getOppositeColor(
  isWhiteTurn: boolean
): "White" | "Black" {
  return isWhiteTurn ? "Black": "White";
}

function isSameLocation(
  a: Location,
  b: Location
): boolean {
  return a.row === b.row && a.col === b.col;
}

export {
    filterOutMoves, 
    isKingInCheck, 
    opponentHasMoves, 
    findKingPosition, 
    getCurrentColor, 
    getOppositeColor,
    isSameLocation
};