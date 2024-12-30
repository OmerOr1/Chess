export type PieceType = "Pawn" | "Knight" | "Bishop" | "Rook" | "Queen" | "King";
export type PieceColor = "White" | "Black";

export type Piece = {
    type: PieceType;
    color: PieceColor;
}

export type Board = (Piece | null)[][];