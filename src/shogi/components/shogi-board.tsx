import { Piece } from '../types';
import { ShogiRow } from './shogi-row';

export const ShogiBoard = ({ boardPieces }: { boardPieces: Piece[][] }) => {
  return (
    <div className="border-2 border-black bg-yellow-100">
      {boardPieces.map((row, rowIndex) => (
        <ShogiRow key={rowIndex} row={row} />
      ))}
    </div>
  );
};
