import React, { useState } from "react";
import { Piece, Rook, Queen, Bishop, Knight, Pawn, King } from "../Pieces";
import {filterOutMoves, isKingInCheck, opponentHasMoves, findKingPosition, getCurrentColor, getOppositeColor, isSameLocation } from "../utils/boardHelpers";
import { Location } from "../types";
import { getInitialBoard } from "../boardData";
import SquareComponent from "./SquareComponent";
import PromotionModal from "./PromotionModal";
import GameOverModal from "./GameOverModal";
import GraveyardComponent from "./GraveyardComponent";
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

type GameOverDetails = {
  winner: "White" | "Black" | "Draw";
  method: "Checkmate" | "Time" | "Repetition" | "Stalemate" | "Insufficient Material";
}

type capturedPiecesData = {
  White: Piece[],
  Black: Piece[]
}

const BoardComponent: React.FC = () => {
  const [board, setBoard] = useState<(Piece | null)[][]>(getInitialBoard());
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);
  const [lastMove, setLastMove] = useState<MoveDetails | null>(null);
  const [promotionSquare, setPromotionSquare] = useState<Location | null>(null);
  const [selectedSquare, setSelectedSquare] = useState<SquareData | null>(null);
  const [isCheck, setIsCheck] = useState(false);
  const [enPassantTarget, setEnPassantTarget] = useState<Location | null>(null);
  const [gameOver, setGameOver] = useState<GameOverDetails | null>(null);
  const [capturedPieces, setCapturedPieces] = useState<capturedPiecesData>({ White: [], Black: [] });

  const toggleTurn = () => {
    setIsWhiteTurn((prev) => !prev);
  }

  const handleSquareClick = (targetRow: number, targetCol: number) => {
    const targetPiece = board[targetRow][targetCol];
    
    // we want to cancel the promotion move
    if (promotionSquare) {
      // if cancled promotion by clicking on another piece, calculate valid moves for it
      if (targetPiece && targetPiece.color === (getCurrentColor(isWhiteTurn))) {
        const kingColor = getCurrentColor(isWhiteTurn);
        const kingPos = findKingPosition(board, kingColor);
        const optionalMoves = targetPiece!.getValidMoves(board, {row: targetRow, col: targetCol});
        const validMoves = filterOutMoves(optionalMoves, {row: targetRow, col: targetCol}, board, kingColor, kingPos, enPassantTarget);

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
      // Inject en passant manually
      if (targetPiece instanceof Pawn &&
        enPassantTarget &&
        Math.abs(enPassantTarget.col - targetCol) === 1 &&
        enPassantTarget.row === targetRow + (targetPiece.color === "White" ? -1 : 1)
      ) {
        optionalMoves.push({ row: enPassantTarget.row, col: enPassantTarget.col });
      }
      const validMoves = filterOutMoves(optionalMoves, {row: targetRow, col: targetCol}, board, kingColor, kingPos, enPassantTarget);

      setSelectedSquare({
        location: { row: targetRow, col: targetCol },
        validMoves: validMoves,
      });
      return;
    }

    const isMoveValid = selectedSquare?.validMoves.some(
      (move) => move.row === targetRow && move.col === targetCol
    );
    // if clicked on an empty square or an opponent's piece, remove selected square
    if (!isMoveValid) {
      setSelectedSquare(null);
      return;
    }

    const from = {row: selectedSquare!.location.row, col: selectedSquare!.location.col}
    const movingPiece = board[from.row][from.col];
    const newBoard = [...board];

    const promotionMove = 
      movingPiece instanceof Pawn &&
      (targetRow === 0 || targetRow === 7);

    if (movingPiece instanceof Pawn &&
      enPassantTarget &&
      targetRow === enPassantTarget.row &&
      targetCol === enPassantTarget.col &&
      from.col !== targetCol // diagonal move
    ) {
      const capturedPiece = newBoard[from.row][targetCol];
      setCapturedPieces(prev => ({
        ...prev,
        [getOppositeColor(isWhiteTurn)]: [
          ...prev[getOppositeColor(isWhiteTurn)],
          capturedPiece,
        ],
      }));
      newBoard[from.row][targetCol] = null; // remove captured pawn
    }
    else if (!promotionMove && newBoard[targetRow][targetCol]) {
      const capturedPiece = newBoard[targetRow][targetCol];
      setCapturedPieces(prev => ({
        ...prev,
        [getOppositeColor(isWhiteTurn)]: [
          ...prev[getOppositeColor(isWhiteTurn)],
          capturedPiece,
        ],
      }));
    }

    // make the move
    newBoard[from.row][from.col] = null;
    newBoard[targetRow][targetCol] = movingPiece;
    
    // update EnPassant
    if (movingPiece instanceof Pawn && Math.abs(from.row - targetRow) === 2) {
      const dir = movingPiece.color === "White" ? -1 : 1;
      setEnPassantTarget({ row: from.row + dir, col: from.col });
    } else {
      setEnPassantTarget(null);
    }

    if (movingPiece instanceof Rook || movingPiece instanceof King || movingPiece instanceof Pawn) {
      movingPiece.hasMoved = true;
    }

    const isCastlingMove = movingPiece instanceof King && Math.abs(targetCol - from.col) === 2;

    if (isCastlingMove) {
      const row = from.row;

      if (targetCol === 6) {
        // King-side castling
        const rookFrom = { row, col: 7 };
        const rookTo = { row, col: 5 };
        board[rookTo.row][rookTo.col] = board[rookFrom.row][rookFrom.col];
        board[rookFrom.row][rookFrom.col] = null;

        if (board[rookTo.row][rookTo.col]) {
          board[rookTo.row][rookTo.col]!.hasMoved = true;
        }
      } else if (targetCol === 2) {
        // Queen-side castling
        const rookFrom = { row, col: 0 };
        const rookTo = { row, col: 3 };
        board[rookTo.row][rookTo.col] = board[rookFrom.row][rookFrom.col];
        board[rookFrom.row][rookFrom.col] = null;

        if (board[rookTo.row][rookTo.col]) {
          board[rookTo.row][rookTo.col]!.hasMoved = true;
        }
      }
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
      }
      else if(!check && isCheck){
        setIsCheck(false);
      }
      if (!opponentHasMoves(newBoard, opponentKingPos, opponentColor, enPassantTarget)) {
      if (check) {
        setGameOver({
          winner: isWhiteTurn ? "White" : "Black",
          method: "Checkmate",
        });
      } else {
        setGameOver({
          winner: "Draw",
          method: "Stalemate",
        });
      }
    }
      setBoard(newBoard);
      toggleTurn();
    }
    setSelectedSquare(null);
  }

  const handlePromotion = (pieceType: string) => {
    //maybe get the captured piece as a parameter
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

    // the piece that the pawn captured in promotion
    const capturedPiece = lastMove!.capturedPiece;

    if (capturedPiece){
      setCapturedPieces(prev => ({
        ...prev,
        [getOppositeColor(isWhiteTurn)]: [
          ...prev[getOppositeColor(isWhiteTurn)],
          capturedPiece,
        ],
      }));
    }

    newBoard[row][col] = newPiece;

    const opponentColor = isWhiteTurn ? "Black" : "White"; 
    const opponentKingPos = findKingPosition(newBoard, opponentColor)
    const check = isKingInCheck(newBoard, opponentKingPos, opponentColor)
    if(check){
      setIsCheck(true);
    }
    else if(!check && isCheck){
      setIsCheck(false);
    }
    if (!opponentHasMoves(newBoard, opponentKingPos, opponentColor, enPassantTarget)) {
      if (check) {
        setGameOver({
          winner: isWhiteTurn ? "White" : "Black",
          method: "Checkmate",
        });
      } else {
        setGameOver({
          winner: "Draw",
          method: "Stalemate",
        });
      }
    }

    setBoard(newBoard);
    setPromotionSquare(null);
    toggleTurn();
  }

  function handleNewGame(){
    setBoard(getInitialBoard());
    setIsWhiteTurn(true);
    setLastMove(null);
    setPromotionSquare(null);
    setSelectedSquare(null);
    setIsCheck(false);
    setEnPassantTarget(null);
    setGameOver(null);
    setCapturedPieces({ White: [], Black: [] });
  }

  return (
    <div className="board-container" style={{ position: "relative" }}>
      <GraveyardComponent
        capturedPieces={capturedPieces.White}
        position="top"
      />

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
                isKing={isSameLocation(findKingPosition(board, getCurrentColor(isWhiteTurn)), { row: rowIndex, col: colIndex })}
                isCheck={isCheck}
              />
            );
          })
        )}
      </div> 

      <GraveyardComponent
        capturedPieces={capturedPieces.Black}
        position="bottom"
      />
      
      <GameOverModal
        winner={gameOver?.winner || null}
        method={gameOver?.method || null}
        onNewGame={handleNewGame}
        isVisible={!!gameOver}
      />
    </div>
  );
}

export default BoardComponent;