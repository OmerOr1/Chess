import React from "react";
import ChessPiece from "./ChessPiece.tsx";
import { Piece } from "../types.ts";
import "./ChessSquare.css"

interface ChessSquareProps {
    piece: Piece | null;
    row: number;
    col: number;
    onClick: (row: number, col: number) => void;
}

const ChessSquare: React.FC<ChessSquareProps> = ({ piece, row, col, onClick }) => {
    const isDarkSquare = (row + col) % 2 === 1;

    return (
        <button
            className={`square ${isDarkSquare ? "dark" : "light"}`}
            onClick={() => onClick(row, col)}
        >
            {piece && <ChessPiece piece={piece} />}
        </button>
    );
};

export default ChessSquare;
