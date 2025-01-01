import WhitePawn from '../../assets/pieces/WhitePawn.png';
import BlackPawn from "../../assets/pieces/BlackPawn.png";
import WhiteRook from "../../assets/pieces/WhiteRook.png";
import BlackRook from "../../assets/pieces/BlackRook.png";
import WhiteKnight from "../../assets/pieces/WhiteKnight.png";
import BlackKnight from "../../assets/pieces/BlackKnight.png";
import WhiteBishop from "../../assets/pieces/WhiteBishop.png";
import BlackBishop from "../../assets/pieces/BlackBishop.png";
import WhiteQueen from "../../assets/pieces/WhiteQueen.png";
import BlackQueen from "../../assets/pieces/BlackQueen.png";
import WhiteKing from "../../assets/pieces/WhiteKing.png";
import BlackKing from "../../assets/pieces/BlackKing.png";

const pieceSymbols: Record<string, Record<string, string>> = {
  Pawn: { White: WhitePawn, Black: BlackPawn },
  Rook: { White: WhiteRook, Black: BlackRook },
  Knight: { White: WhiteKnight, Black: BlackKnight },
  Bishop: { White: WhiteBishop, Black: BlackBishop },
  Queen: { White: WhiteQueen, Black: BlackQueen },
  King: { White: WhiteKing, Black: BlackKing },
};

export default pieceSymbols;