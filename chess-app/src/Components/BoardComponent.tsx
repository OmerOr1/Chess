import React, { useState } from "react";
import { Piece, Rook, Queen, Bishop, Knight, Pawn, King } from "../Pieces";
import {filterOutMoves, isKingInCheck, opponentHasMoves, findKingPosition, getCurrentColor, getOppositeColor } from "../utils/boardHelpers";
import { Location } from "../types";
import { initialBoard } from "../boardData";
import SquareComponent from "./SquareComponent";
import PromotionModal from "./PromotionModal";
import "../styles/Board.css";

type MoveDetails = {
  from: Location;
  to: Location;
  movingPiece: Piece | null;
  capturedPiece: Piece | null;
  moveBefore?: MoveDetails | null;
}

type SquareData = {
  location: Location;
  validMoves: Location[];
}

const BoardComponent: React.FC = () => {
  const [board, setBoard] = useState<(Piece | null)[][]>(initialBoard);
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);
  const [lastMove, setLastMove] = useState<MoveDetails | null>(null);
  const [promotionSquare, setPromotionSquare] = useState<Location | null>(null);
  const [selectedSquare, setSelectedSquare] = useState<SquareData | null>(null);
  const [isCheck, setIsCheck] = useState(false);

  const toggleTurn = () => {
    setIsWhiteTurn((prev) => !prev);
  }

  const handleSquareClick = (targetRow: number, targetCol: number) => {
    const targetPiece = board[targetRow][targetCol];
    
    // promotion modal is currently showing
    if (promotionSquare) {
      // cancled promotion by clicking on another piece
      if (targetPiece && targetPiece.color === (getCurrentColor(isWhiteTurn))) {
        const kingColor = getCurrentColor(isWhiteTurn);
        const kingPos = findKingPosition(board, kingColor);
        const optionalMoves = targetPiece.getValidMoves(board, {row: targetRow, col: targetCol});
        const validMoves = filterOutMoves(optionalMoves, {row: targetRow, col: targetCol}, board, kingColor, kingPos);

        setSelectedSquare({
          location: { row: targetRow, col: targetCol },
          validMoves: validMoves,
        });
      }
      // replicating last move
      const newBoard = [...board];
      const { from, to, movingPiece, capturedPiece } = lastMove!;

      newBoard[from.row][from.col] = movingPiece;
      newBoard[to.row][to.col] = capturedPiece;

      setBoard(newBoard);
      setPromotionSquare(null);
      setLastMove({
        from: lastMove!.moveBefore!.from,
        to: lastMove!.moveBefore!.to,
        movingPiece: null,
        capturedPiece: null,
      });
      return;
    }

    // selected square is clicked again
    if (selectedSquare && selectedSquare.location.row === targetRow && selectedSquare.location.col === targetCol) {
      setSelectedSquare(null);
      return;
    }

    // clicked on a different piece of the same color
    if (targetPiece && targetPiece.color === (getCurrentColor(isWhiteTurn))) {
      const kingColor = getCurrentColor(isWhiteTurn);
      const kingPos = findKingPosition(board, kingColor);
      const optionalMoves = targetPiece.getValidMoves(board, {row: targetRow, col: targetCol});
      const validMoves = filterOutMoves(optionalMoves, {row: targetRow, col: targetCol}, board, kingColor, kingPos);

      setSelectedSquare({
        location: { row: targetRow, col: targetCol },
        validMoves: validMoves,
      });
      return;
    }

    const isMoveValid = selectedSquare?.validMoves.some(
      (move) => move.row === targetRow && move.col === targetCol
    );
    if (!isMoveValid) {
      setSelectedSquare(null);
      return;
    }

    const movingPiece = board[selectedSquare!.location.row][selectedSquare!.location.col];
    const newBoard = [...board];
    newBoard[selectedSquare!.location.row][selectedSquare!.location.col] = null;
    newBoard[targetRow][targetCol] = movingPiece;
    
    if (movingPiece instanceof Rook || movingPiece instanceof King || movingPiece instanceof Pawn) {
      movingPiece.moved = true;
    }

    setLastMove({
      from: selectedSquare!.location,
      to: { row: targetRow, col: targetCol },
      movingPiece: movingPiece,
      capturedPiece: targetPiece,
      moveBefore: lastMove,
    });

    if (movingPiece instanceof Pawn && (targetRow === 0 || targetRow === 7)) {
      setPromotionSquare({ row: targetRow, col: targetCol });
    } 
    else {
      const opponentColor = getOppositeColor(isWhiteTurn);
      const opponentKingPos = findKingPosition(newBoard, opponentColor)
      const check = isKingInCheck(newBoard, opponentKingPos, opponentColor)
      
      if(check){
        setIsCheck(true);
        console.log("check");
      }
      else if(!check && isCheck){
        setIsCheck(false);
      }
      if(!opponentHasMoves(newBoard, opponentKingPos, opponentColor)){
        if(check){
          console.log(`Checkmate! ${getCurrentColor(isWhiteTurn)} won.`);
        }
        else {
          console.log(`Stalemate! ${opponentColor} has no legal moves.`);
        }
      }
      setBoard(newBoard);
      toggleTurn();
    }
    setSelectedSquare(null);
  }

  const handlePromotion = (pieceType: string) => {
    const color = getCurrentColor(isWhiteTurn);
    const newPiece =
      pieceType === "Queen"
        ? new Queen(color, true)
        : pieceType === "Rook"
        ? new Rook(color, true)
        : pieceType === "Bishop"
        ? new Bishop(color, true)
        : new Knight(color, true);

    const newBoard = [...board];
    const { row, col } = promotionSquare!;
    newBoard[row][col] = newPiece;

    const opponentColor = isWhiteTurn ? "Black" : "White"; 
    const opponentKingPos = findKingPosition(newBoard, opponentColor)
    const check = isKingInCheck(newBoard, opponentKingPos, opponentColor)
    if(check){
      setIsCheck(true);
      console.log("check");
    }
    else if(!check && isCheck){
      setIsCheck(false);
    }
    if(!opponentHasMoves(newBoard, opponentKingPos, opponentColor)){
      if(check){
        console.log(`Checkmate! ${isWhiteTurn ? "White" : "Black"} won.`);
      }
      else {
        console.log(`Stalemate! ${opponentColor} has no legal moves.`);
      }
    }

    setBoard(newBoard);
    setPromotionSquare(null);
    toggleTurn();
  }

  return (
    <div className="board">
      {promotionSquare && (
        <PromotionModal
          onSelect={(pieceType) => handlePromotion(pieceType)}
          isWhite={isWhiteTurn}
          location={{ row: promotionSquare.row, col: promotionSquare.col }}
        />
      )}
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => {
          const isSelected =
            selectedSquare?.location?.row === rowIndex &&
            selectedSquare?.location?.col === colIndex;

          const isLastMove =
            (lastMove?.from.row === rowIndex && lastMove?.from.col === colIndex) ||
            (lastMove?.to.row === rowIndex && lastMove?.to.col === colIndex);

          return (
            <SquareComponent
              key={`${rowIndex}-${colIndex}`}
              piece={piece}
              squareColor={(rowIndex + colIndex) % 2 === 0 ? "Light" : "Dark"}
              location={{ row: rowIndex, col: colIndex }}
              onClick={() => handleSquareClick(rowIndex, colIndex)}
              isSelected={isSelected}
              isLastMove={isLastMove}
              validMoves={selectedSquare?.validMoves || []}
            />
          );
        })
      )}
    </div>
  );
}

export default BoardComponent;