import React from "react";
import ChessSquare from "./ChessSquare.tsx";
import { Board, Location } from "../types.ts";
import "./ChessBoard.css"

export interface ChessBoardProps {
    board: Board;
    onSquareClick: (location: Location) => void;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ board, onSquareClick }) => {
    return (
        <div className="board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((piece, colIndex) => (
                        <ChessSquare
                            key={`${rowIndex}-${colIndex}`}
                            piece={piece}
                            location={{ row: rowIndex, col: colIndex }}
                            onClick={onSquareClick}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ChessBoard;