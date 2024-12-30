import React, { useState } from "react";
import ChessBoard from "./Components/ChessBoard.tsx";
import { Board } from "./types.ts";
import { initialBoard } from "./boardData.ts";

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
