export type PieceType = "Pawn" | "Knight" | "Bishop" | "Rook" | "Queen" | "King";
export type PieceColor = "White" | "Black";

export interface Piece {
    type: PieceType;
    color: PieceColor;
}

export interface Square {
    key: string;
    piece: Piece | null;
    row: number;
    col: number;
    notation: string | null;
    onClick: (row: number, col: number) => void;
}

export type Board = (Piece | null)[][];

export interface BoardProps {
    board: Board;
    onSquareClick: (row: number, col: number) => void;
}