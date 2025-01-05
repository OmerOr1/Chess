import React from "react";
import pieceSymbols from "./utils/pieceSymbols";
import "../styles/Piece.css"

interface PieceComponentProps {
  type: string;
  color: "White" | "Black";
}

const PieceComponent: React.FC<PieceComponentProps> = ({ type, color }) => {
  const imagePath = pieceSymbols[type]?.[color];

  if (!imagePath) return null;

  return (
    <img
      src={imagePath}
      alt={`${color} ${type}`}
      draggable={false}
    />
  );
};

export default PieceComponent;