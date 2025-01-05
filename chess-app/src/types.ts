import { Piece } from "./Pieces";

export type PieceType = "Pawn" | "Knight" | "Bishop" | "Rook" | "Queen" | "King";

export type PieceColor = "White" | "Black";

export type Location = {
    row: number; 
    col: number;
}

export  type SquareData = {
    location: Location;
    validMoves: Location[];
}

export type MoveDetails = {
    from: Location;
    to: Location;
    movingPiece: Piece | null;
    capturedPiece: Piece | null;
    moveBefore?: MoveDetails | null;
};