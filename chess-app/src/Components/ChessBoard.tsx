// ChessBoard.tsx
import React from "react";
import ChessSquare from "./ChessSquare.tsx";
import { Board } from "../types.ts";
import "./ChessBoard.css"

interface ChessBoardProps {
    board: Board;
    onSquareClick: (row: number, col: number) => void;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ board, onSquareClick }) => {
    return (
        <div className="board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((piece, colIndex) => (
                        <ChessSquare
                            key={`${rowIndex}-${colIndex}`}
                            piece={piece}
                            row={rowIndex}
                            col={colIndex}
                            onClick={onSquareClick}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ChessBoard;


// import { useState } from 'react';
// import './ChessBoard.css'
// import ChessSquare from './ChessSquare';

// type Piece = { 
//     type: "Pawn" | "Knight" | "Bishop" | "Rook" | "Queen" | "King"; 
//     color: "White" | "Black"; 
// } | null;
  
// const initialBoard: Piece[][] = [
//     // Row 1: Black pieces
//     [
//       { type: "Rook", color: "Black" },
//       { type: "Knight", color: "Black" },
//       { type: "Bishop", color: "Black" },
//       { type: "Queen", color: "Black" },
//       { type: "King", color: "Black" },
//       { type: "Bishop", color: "Black" },
//       { type: "Knight", color: "Black" },
//       { type: "Rook", color: "Black" }
//     ],
//     // Row 2: Black pawns
//     [
//       { type: "Pawn", color: "Black" },
//       { type: "Pawn", color: "Black" },
//       { type: "Pawn", color: "Black" },
//       { type: "Pawn", color: "Black" },
//       { type: "Pawn", color: "Black" },
//       { type: "Pawn", color: "Black" },
//       { type: "Pawn", color: "Black" },
//       { type: "Pawn", color: "Black" }
//     ],
//     // Row 3: Empty row
//     [null, null, null, null, null, null, null, null],
//     // Row 4: Empty row
//     [null, null, null, null, null, null, null, null],
//     // Row 5: Empty row
//     [null, null, null, null, null, null, null, null],
//     // Row 6: Empty row
//     [null, null, null, null, null, null, null, null],
//     // Row 7: White pawns
//     [
//       { type: "Pawn", color: "White" },
//       { type: "Pawn", color: "White" },
//       { type: "Pawn", color: "White" },
//       { type: "Pawn", color: "White" },
//       { type: "Pawn", color: "White" },
//       { type: "Pawn", color: "White" },
//       { type: "Pawn", color: "White" },
//       { type: "Pawn", color: "White" }
//     ],
//     // Row 8: White pieces
//     [
//       { type: "Rook", color: "White" },
//       { type: "Knight", color: "White" },
//       { type: "Bishop", color: "White" },
//       { type: "Queen", color: "White" },
//       { type: "King", color: "White" },
//       { type: "Bishop", color: "White" },
//       { type: "Knight", color: "White" },
//       { type: "Rook", color: "White" }
//     ]
// ];
  

// function ChessBoard() {
//     const [board, setBoard] = useState<Piece[][]>(initialBoard);

//     return (
//       <div className='board'>
//         {board.map((pieces, rowIndex) => (
//           <div key={rowIndex} className="row">
//             {pieces.map((piece, colIndex) => (
//               <button key={colIndex}>
//                 {piece && <img src={`public/${piece.color}-${piece.type}.png`}/>}
//               </button>
//             ))}
//           </div>
//         ))}
//       </div>
//     );
    
// }

// export default ChessBoard