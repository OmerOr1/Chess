import React from "react";
import ChessPiece from "./ChessPiece.tsx";
import { Square } from "../types.ts";
import "./ChessSquare.css"

const ChessSquare: React.FC<Square> = ({ piece, row, col, notation, onClick }) => {
    const isDarkSquare = (row + col) % 2 === 1;

    return (
        <button
            className={`square ${isDarkSquare ? "dark" : "light"} ${notation || ""}`.trim()}
            onClick={() => onClick(row, col)}
        >
            {piece && <ChessPiece piece={piece} />}
        </button>
    );
};

export default ChessSquare;