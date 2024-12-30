import React, { useState } from "react";
import ChessBoard from "./Components/ChessBoard.tsx";
import { Board, Location } from "./types.ts";
import { initialBoard } from "./boardData.ts";

const App: React.FC = () => {
    const [board, setBoard] = useState<Board>(initialBoard);
    const [selectedSquare, setSelectedSquare] = useState<Location | null>(null);

    const handleSquareClick = (clicked: Location) => {
        console.log(`Clicked square at row ${clicked.row}, col ${clicked.col}`);
        // Add game logic here, e.g., selecting/moving a piece.
    };

    return (
        <div className="app">
            <ChessBoard board={board} onSquareClick={handleSquareClick} />
        </div>
    );
};

export default App;