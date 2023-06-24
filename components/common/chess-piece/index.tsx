import { BishopPiece, KingPiece, KnightPiece, PawnPiece, QueenPiece, RookPiece } from './pieces';

const ChessPiece = () => null;

ChessPiece.Bishop = BishopPiece;
ChessPiece.King = KingPiece;
ChessPiece.Knight = KnightPiece;
ChessPiece.Pawn = PawnPiece;
ChessPiece.Queen = QueenPiece;
ChessPiece.Rook = RookPiece;

ChessPiece.displayName = 'ChessPiece';

export default ChessPiece;
