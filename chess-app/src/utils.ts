import { Board, Location, Piece } from "./types";

// Check if the path between two locations is clear (used for rooks, bishops, queens)
export const isPathClear = (
    board: Board,
    start: Location,
    target: Location
): boolean => {
    const rowDiff = target.row - start.row;
    const colDiff = target.col - start.col;
    const stepRow = rowDiff === 0 ? 0 : rowDiff / Math.abs(rowDiff);
    const stepCol = colDiff === 0 ? 0 : colDiff / Math.abs(colDiff);

    let currentRow = start.row + stepRow;
    let currentCol = start.col + stepCol;

    while (currentRow !== target.row || currentCol !== target.col) {
        if (board[currentRow][currentCol]) { // Path is blocked
            return false;
        }
        currentRow += stepRow;
        currentCol += stepCol;
    }

    return true;
};

export const isValidPawnMove = (
    board: Board,
    piece: Piece,
    start: Location,
    target: Location
): boolean => {
    const rowDiff = target.row - start.row;
    const colDiff = target.col - start.col;
    const targetSquare = board[target.row][target.col];
    const direction = piece.color === "White" ? -1 : 1;

    if (!targetSquare) {
        // Move
        if (colDiff === 0 && rowDiff === direction) return true;
        if (colDiff === 0 && rowDiff === 2 * direction && !piece.moved) return true;
    } else {
        // Eat
        if (Math.abs(colDiff) === 1 && rowDiff === direction && targetSquare.color !== piece.color) {
            return true;
        }
    }

    return false;
};

export const isValidRookMove = (
    board: Board,
    start: Location,
    target: Location
): boolean => {
    const rowDiff = target.row - start.row;
    const colDiff = target.col - start.col;

    if (rowDiff !== 0 && colDiff !== 0) return false; // Must move straight
    return isPathClear(board, start, target);
};

export const isValidKnightMove = (start: Location, target: Location): boolean => {
    const rowDiff = Math.abs(target.row - start.row);
    const colDiff = Math.abs(target.col - start.col);
    return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
};

export const isValidBishopMove = (
    board: Board,
    start: Location,
    target: Location
): boolean => {
    const rowDiff = Math.abs(target.row - start.row);
    const colDiff = Math.abs(target.col - start.col);

    if (rowDiff !== colDiff) return false; // Must move diagonally
    return isPathClear(board, start, target);
};

export const isValidQueenMove = (
    board: Board,
    start: Location,
    target: Location
): boolean => {
    const rowDiff = Math.abs(target.row - start.row);
    const colDiff = Math.abs(target.col - start.col);

    const isDiagonal = rowDiff === colDiff;
    const isStraight = rowDiff === 0 || colDiff === 0;

    if (!isDiagonal && !isStraight) return false;

    return isPathClear(board, start, target);
};

export const isValidKingMove = (
    start: Location,
    target: Location
): boolean => {
    const rowDiff = Math.abs(target.row - start.row);
    const colDiff = Math.abs(target.col - start.col);

    return rowDiff <= 1 && colDiff <= 1;
};