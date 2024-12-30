import React from "react";
import ChessPiece from "./ChessPiece.tsx";
import { Piece } from "../types.ts";
import "./ChessSquare.css"

interface ChessSquareProps {
    key: string;
    piece: Piece | null;
    row: number;
    col: number;
    notation: string | null;
    onClick: (row: number, col: number) => void;
}

const ChessSquare: React.FC<ChessSquareProps> = ({ key, piece, row, col, notation, onClick }) => {
    const isDarkSquare = (row + col) % 2 === 1;

    return (
        <button
            id={`square-${key}`}
            data-key={key}
            className={`square ${isDarkSquare ? "dark" : "light"} ${notation || ""}`.trim()}
            onClick={() => onClick(row, col)}
        >
            {piece && <ChessPiece piece={piece} />}
        </button>
    );
};

export default ChessSquare;