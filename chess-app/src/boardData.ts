import { Board } from './types';

export const initialBoard: Board = [
    // Row 1: Black pieces
    [
        { type: "Rook", color: "Black" },
        { type: "Knight", color: "Black" },
        { type: "Bishop", color: "Black" },
        { type: "Queen", color: "Black" },
        { type: "King", color: "Black" },
        { type: "Bishop", color: "Black" },
        { type: "Knight", color: "Black" },
        { type: "Rook", color: "Black" }
    ],
    // Row 2: Black pawns
    [
        { type: "Pawn", color: "Black" },
        { type: "Pawn", color: "Black" },
        { type: "Pawn", color: "Black" },
        { type: "Pawn", color: "Black" },
        { type: "Pawn", color: "Black" },
        { type: "Pawn", color: "Black" },
        { type: "Pawn", color: "Black" },
        { type: "Pawn", color: "Black" }
    ],
    // Rows 3-6: Empty rows
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    // Row 7: White pawns
    [
        { type: "Pawn", color: "White" },
        { type: "Pawn", color: "White" },
        { type: "Pawn", color: "White" },
        { type: "Pawn", color: "White" },
        { type: "Pawn", color: "White" },
        { type: "Pawn", color: "White" },
        { type: "Pawn", color: "White" },
        { type: "Pawn", color: "White" }
    ],
    // Row 8: White pieces
    [
        { type: "Rook", color: "White" },
        { type: "Knight", color: "White" },
        { type: "Bishop", color: "White" },
        { type: "Queen", color: "White" },
        { type: "King", color: "White" },
        { type: "Bishop", color: "White" },
        { type: "Knight", color: "White" },
        { type: "Rook", color: "White" }
    ],
];