import { Piece, Pawn, Bishop, Knight, Rook, Queen, King } from "./Pieces";

export const getInitialBoard = (): (Piece | null)[][] => [
    // Row 8 (Black major pieces)
    [
      new Rook("Black"),
      new Knight("Black"),
      new Bishop("Black"),
      new Queen("Black"),
      new King("Black"),
      new Bishop("Black"),
      new Knight("Black"),
      new Rook("Black"),
    ],
    // Row 7 (Black pawns)
    [
      new Pawn("Black"),
      new Pawn("Black"),
      new Pawn("Black"),
      new Pawn("Black"),
      new Pawn("Black"),
      new Pawn("Black"),
      new Pawn("Black"),
      new Pawn("Black"),
    ],
    // Rows 6 to 3 (Empty squares)
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    // Row 2 (White pawns)
    [
      new Pawn("White"),
      new Pawn("White"),
      new Pawn("White"),
      new Pawn("White"),
      new Pawn("White"),
      new Pawn("White"),
      new Pawn("White"),
      new Pawn("White"),
    ],
    // Row 1 (White major pieces)
    [
      new Rook("White"),
      new Knight("White"),
      new Bishop("White"),
      new Queen("White"),
      new King("White"),
      new Bishop("White"),
      new Knight("White"),
      new Rook("White"),
    ],
  ];