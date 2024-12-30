import React from "react";
import { Piece } from "../types.ts";

const ChessPiece: React.FC<{ piece: Piece }> = ({ piece }) => {
    const { color, type } = piece;
    const pieceImage = `src/assets/${color}-${type}.png`;

    return <img src={pieceImage} />;
};

export default ChessPiece;