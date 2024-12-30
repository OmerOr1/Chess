import React from "react";
import ChessPiece from "./ChessPiece.tsx";
import { Piece, Location } from "../types.ts";
import "./ChessSquare.css"

interface ChessSquareProps {
    piece: Piece | null;
    location: Location
    onClick: (location: Location) => void;
}

const ChessSquare: React.FC<ChessSquareProps> = ({ piece, location, onClick }) => {
    const {row, col} = location;
    const isDarkSquare = (row + col) % 2 === 1;

    let classes = `square ${isDarkSquare ? "dark" : "light"}`;

    if (col === 0) {
        classes += ` number-${8 - row}`;
    }

    if (row === 7) {
        classes += ` letter-${String.fromCharCode(97 + col)}`;
    }

    return (
        <button
            className={classes}
            onClick={() => onClick(location)}
        >
            {piece && <ChessPiece piece={piece} />}
        </button>
    );
};

export default ChessSquare;