import { Hand, HandPieceType } from '@/shogi/types';
import { PIECE_NAMES } from '@/shogi/constants';

type HandPiecesProps = {
  hand: Hand;
  isBlack: boolean; // 先手かどうか
};

export const HandPieces = ({ hand, isBlack }: HandPiecesProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handEntries = Object.entries(hand).filter(([_, count]) => count > 0);
  
  if (handEntries.length === 0) {
    return (
      <div className="w-32 h-16 border border-gray-300 rounded bg-gray-50 flex items-center justify-center">
        <span className="text-sm text-gray-400">持ち駒なし</span>
      </div>
    );
  }
  
  return (
    <div className="w-32 min-h-16 border border-gray-300 rounded bg-white p-2">
      <div className="text-xs text-center mb-1 font-bold">
        {isBlack ? '先手' : '後手'}
      </div>
      <div className="grid grid-cols-2 gap-1">
        {handEntries.map(([pieceType, count]) => (
          <HandPieceItem
            key={pieceType}
            pieceType={pieceType as HandPieceType}
            count={count}
            isBlack={isBlack}
          />
        ))}
      </div>
    </div>
  );
};

const HandPieceItem = ({ pieceType, count, isBlack }: { 
  pieceType: HandPieceType; 
  count: number; 
  isBlack: boolean; 
}) => {
  const pieceName = PIECE_NAMES[pieceType];
  
  return (
    <div className="flex items-center justify-center bg-yellow-50 border border-yellow-200 rounded p-1">
      <span 
        className={`text-xs font-bold ${isBlack ? 'text-black' : 'text-red-600'}`}
        style={{ transform: isBlack ? 'none' : 'rotate(180deg)' }}
      >
        {pieceName}
      </span>
      {count > 1 && (
        <span className="text-xs ml-1 text-gray-600">
          {count}
        </span>
      )}
    </div>
  );
};
