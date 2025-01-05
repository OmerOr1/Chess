import React from "react";
import pieceSymbols from "./utils/pieceSymbols";
import { Location } from "../types";
import "../styles/PromotionModal.css";

interface PromotionModalProps {
  onSelect: (pieceType: string) => void;
  isWhite: boolean;
  location: Location;
}

const PromotionModal: React.FC<PromotionModalProps> = ({ onSelect, isWhite, location }) => {
  const options = ["Queen", "Rook", "Knight", "Bishop"];
  const orderedOptions = isWhite ? options : [...options].reverse();

  const modalPositionStyle = isWhite
    ? { top: 0, bottom: "auto", borderTop: "none" }
    : { bottom: 0, top: "auto", borderBottom: "none" };


  return (
    <div
      className="promotion-modal"
      style={{
        ...modalPositionStyle,
        left: `${location.col * 10}vmin`,
      }}
    >
      <div className="promotion-options">
        {orderedOptions.map((pieceType, index) => (
          <div
            key={index}
            className="promotion-option"
            onClick={() => onSelect(pieceType)}
          >
            <img
              src={pieceSymbols[pieceType][isWhite ? "White" : "Black"]}
              alt={pieceType}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromotionModal;