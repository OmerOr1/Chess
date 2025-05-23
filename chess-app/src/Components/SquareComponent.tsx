import React from "react";
import { Piece } from "../Pieces";
import { Location } from "../types";
import PieceComponent from "./PieceComponent"; 
import "../styles/Square.css";

interface SquareComponentProps {
  piece: Piece | null;
  squareColor: "Light" | "Dark";
  location: { row: number; col: number };
  onClick: (row: number, col: number) => void;
  isSelected: boolean;
  isLastMove: boolean;
  validMoves: { row: number; col: number }[];
  isKing: boolean;
  isCheck: boolean
}

const SquareComponent: React.FC<SquareComponentProps> = ({ 
  piece, 
  squareColor, 
  location, 
  onClick, 
  isSelected,
  isLastMove,
  validMoves,
  isKing,
  isCheck
}) => {
  const { row, col } = location;

  const isLeftColumn = col === 0;
  const isBottomRow = row === 7;

  const handleClick = () => {
    onClick(row, col);
  };

  // Check if the current square is a valid move
  const isValidMove = validMoves.some(move => move.row === row && move.col === col);

  const capturable = isValidMove && piece;
  const reachable = isValidMove && !piece;
  const isInDanger = isCheck && isKing;

  const className = [
    'square',
    squareColor,
    isSelected && 'selected',
    capturable && 'capturable',
    reachable && 'reachable',
    isLastMove && 'lastMove',
    isInDanger && 'inDanger',
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={className}
      onClick={handleClick}
    >
      {isLeftColumn && <span className="row-notation">{8 - row}</span>}
      
      {piece && <PieceComponent type={piece.type} color={piece.color} />}

      {isBottomRow && <span className="col-notation">{String.fromCharCode(65 + col)}</span>}
    </div>
  );
};

export default SquareComponent;