import { Board } from '@/shogi/types';
import { ShogiRow } from './shogi-row';

export const ShogiBoard = ({ board }: { board: Board }) => {
  return (
    <div className="border-2 border-black bg-yellow-100">
      {board.map((row, rowIndex) => (
        <ShogiRow key={rowIndex} row={row} />
      ))}
    </div>
  );
};
