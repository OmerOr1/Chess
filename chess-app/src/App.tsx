import React, { useState } from "react";
import ChessBoard from "./Components/ChessBoard.tsx";
import { Board, Location } from "./types.ts";
import { initialBoard } from "./boardData.ts";

const App: React.FC = () => {
    const [board, setBoard] = useState<Board>(initialBoard);
    const [selectedLocation, setSelectedSquare] = useState<Location | null>(null);

    const handleMove = (start: Location, target: Location, action: string) => {
        // check later what to do when clicking on a piece and then on an unreachable piece of the other color
        const squareStart = board[start.row][start.col]
        const squareTarget = board[target.row][target.col]

        if (!squareStart || !squareTarget) {
            throw new Error("one of the clicked squares has no piece but still got to handleMove function");
        }



        throw new Error("Function not implemented.");
    }

    const showPossibleMoves = (location: Location | null) => {
        if (location == null) {
            // clear every possibleMove class from all squares
        }
        else {
            // add a possibleMove class to the relevant squares
        }
        
        // set board to be the new board
        throw new Error("Function not implemented.");
    }

    const handleSquareClick = (newLocation: Location) => {
        const newSquare = board[newLocation.row][newLocation.col];

        if (!newSquare && !selectedLocation) {
            setSelectedSquare(null)
            showPossibleMoves(null)
        }
        else if (!newSquare) {
            handleMove(selectedLocation!, newLocation, "movement");
        }
        else if (!selectedLocation) { // no possible moves are showing currently
            setSelectedSquare(newLocation)
            showPossibleMoves(newLocation)
        }
        else if (newLocation.row === selectedLocation.row && 
                 newLocation.col === selectedLocation.col) { // clicked on the previous square again
            setSelectedSquare(null)
            showPossibleMoves(null)
        }
        else { 
            const selectedSquare = board[selectedLocation.row][selectedLocation.col]!;
            if (newSquare.color === selectedSquare.color) {
                setSelectedSquare(newLocation);
                showPossibleMoves(newLocation);
            } 
            else {
                handleMove(selectedLocation, newLocation, "eating");
            }
        }
    }

    return (
        <div className="app">
            <ChessBoard board={board} onSquareClick={handleSquareClick} />
        </div>
    );
};

export default App;