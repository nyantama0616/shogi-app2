import { Piece } from '@/shogi/types';
import { ShogiCell } from './shogi-cell';

export const ShogiRow = ({ row }: { row: Piece[] }) => {
  return (
    <div className="flex">
      {row.map((piece, colIndex) => (
        <ShogiCell key={colIndex} piece={piece} />
      ))}
    </div>
  );
};
