import React from "react";
import ChessSquare from "./ChessSquare.tsx";
import { BoardProps } from "../types.ts";
import "./ChessBoard.css"

const ChessBoard: React.FC<BoardProps> = ({ board, onSquareClick }) => {
    function getNotation(row: number, col: number): string | null {
        const classes = [];
    
        if (col === 0) {
            const rowNotation = 8 - row; 
            classes.push(`number-${rowNotation}`);
        }
    
        if (row === 7) {
            const colNotation = String.fromCharCode(97 + col);
            classes.push(`letter-${colNotation}`);
        }
    
        return classes.length > 0 ? classes.join(' ') : null;
    }
    

    return (
        <div className="board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((piece, colIndex) => (
                        <ChessSquare
                            key={`${rowIndex}-${colIndex}`}
                            piece={piece}
                            row={rowIndex}
                            col={colIndex}
                            notation={getNotation(rowIndex, colIndex)}
                            onClick={onSquareClick}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ChessBoard;