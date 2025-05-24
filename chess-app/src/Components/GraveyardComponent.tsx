import React from "react";
import { Piece } from "../Pieces";
import pieceSymbols from "./utils/pieceSymbols";
import "../styles/Graveyard.css";

interface GraveyardProps {
  capturedPieces: Piece[];
  position: "top" | "bottom"
}

const pieceOrder = {
  Pawn: 1,
  Knight: 2,
  Bishop: 3,
  Rook: 4,
  Queen: 5
};

const isSortablePiece = (piece: Piece): piece is Piece & { type: keyof typeof pieceOrder } => {
  return piece.type !== "King";
};

const sortCaptured = (pieces: Piece[]) => {
  return pieces
    .filter(isSortablePiece) // Filter out the King (not capturable)
    .sort((a, b) => pieceOrder[a.type] - pieceOrder[b.type]); // Sort by importance
};

const GraveyardComponent: React.FC<GraveyardProps> = ({ capturedPieces, position }) => {
  const sortedPieces = sortCaptured(capturedPieces);
  const className = `graveyard graveyard-${position}`;

  return (
    <div className={className}>
      {sortedPieces.map((piece, index) => (
        <img
          key={index}
          src={pieceSymbols[piece.type]?.[piece.color]}
          alt={`${piece.color} ${piece.type}`}
          className="graveyard-piece"
        />
      ))}
    </div>
  );
};

export default GraveyardComponent;