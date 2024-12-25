import React, { useState } from "react";
import ChessBoard from "./Components/ChessBoard.tsx";
import { Board } from "./types.ts";

const initialBoard: Board = [
    // Row 1: Black pieces
    [
        { type: "Rook", color: "Black" },
        { type: "Knight", color: "Black" },
        { type: "Bishop", color: "Black" },
        { type: "Queen", color: "Black" },
        { type: "King", color: "Black" },
        { type: "Bishop", color: "Black" },
        { type: "Knight", color: "Black" },
        { type: "Rook", color: "Black" },
    ],
    // Row 2: Black pawns
    Array(8).fill({ type: "Pawn", color: "Black" }),
    // Row 3: Empty row
    [null, null, null, null, null, null, null, null],
    // Row 4: Empty row
    [null, null, null, null, null, null, null, null],
    // Row 5: Empty row
    [null, null, null, null, null, null, null, null],
    // Row 6: Empty row
    [null, null, null, null, null, null, null, null],
    // Row 7: White pawns
    Array(8).fill({ type: "Pawn", color: "White" }),
    // Row 8: White pieces
    [
        { type: "Rook", color: "White" },
        { type: "Knight", color: "White" },
        { type: "Bishop", color: "White" },
        { type: "Queen", color: "White" },
        { type: "King", color: "White" },
        { type: "Bishop", color: "White" },
        { type: "Knight", color: "White" },
        { type: "Rook", color: "White" },
    ],
];

const App: React.FC = () => {
    const [board, setBoard] = useState<Board>(initialBoard);

    const handleSquareClick = (row: number, col: number) => {
        console.log(`Clicked square at row ${row}, col ${col}`);
        // Add game logic here, e.g., selecting/moving a piece.
    };

    return (
        <div className="app">
            <ChessBoard board={board} onSquareClick={handleSquareClick} />
        </div>
    );
};

export default App;
