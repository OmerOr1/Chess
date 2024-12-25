export type PieceType = "Pawn" | "Knight" | "Bishop" | "Rook" | "Queen" | "King";
export type PieceColor = "White" | "Black";

export interface Piece {
    type: PieceType;
    color: PieceColor;
}

export type Board = (Piece | null)[][];