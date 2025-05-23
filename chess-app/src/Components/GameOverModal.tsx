import React from "react";
import ReactDOM from "react-dom";
import "../styles/GameOverModal.css";

interface GameOverModalProps {
  winner: "White" | "Black" | "Draw" | null;
  method: "Checkmate" | "Time" | "Repetition" | "Stalemate" | "Insufficient Material" | null;
  onNewGame: () => void;
  isVisible: boolean;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ winner, method, onNewGame, isVisible }) => {
  if(!isVisible) return null;

  const comment = winner === "Draw" ? `Draw by ${method}!` : `${winner} wins by ${method}!`;
  
  const modal = (
    <>
      <div className="game-over-overlay" />
      <div className="game-over-modal">
        <h2 className="game-over-header">Game Over!</h2>
        <h2 className="game-over-message">{comment}</h2>
        <button className="game-over-new-game-button" onClick={onNewGame}>Start New Game</button>
      </div>
    </>
  );

  return ReactDOM.createPortal(modal, document.body);
};

export default GameOverModal;
