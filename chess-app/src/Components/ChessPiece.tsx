import React from "react";
import { Piece } from "../types.ts";

interface ChessPieceProps {
    piece: Piece;
}

const ChessPiece: React.FC<ChessPieceProps> = ({ piece }) => {
    const { color, type } = piece;
    const pieceImage = `src/assets/${color}-${type}.png`;

    return <img src={pieceImage}/>;
};

export default ChessPiece;