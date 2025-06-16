import { Piece } from '@/shogi/types';
import { PIECE_NAMES } from '@/shogi/constants';

export const ShogiCell = ({ piece }: { piece: Piece }) => {
  const isBlackPiece = piece && (piece === piece.toUpperCase() || piece.startsWith('+') && piece[1] === piece[1].toUpperCase());
  
  return (
    <div className="w-12 h-12 border border-black flex items-center justify-center text-xs hover:bg-blue-200 cursor-pointer transition-colors">
      {piece && (
        <span 
          className={`font-bold ${isBlackPiece ? 'text-black' : 'text-red-600'}`}
          style={{ transform: isBlackPiece ? 'none' : 'rotate(180deg)' }}
        >
          {PIECE_NAMES[piece]}
        </span>
      )}
    </div>
  );
};