import { useState } from 'react';
import { Board } from '@/shogi/types';
import { INITIAL_SFEN } from '@/shogi/constants';
import { parseSFENBoard } from '@/shogi/utils';

export const useBoard = () => {
  const [board, setBoard] = useState<Board>(() => parseSFENBoard(INITIAL_SFEN));

  const resetBoard = () => {
    setBoard(parseSFENBoard(INITIAL_SFEN));
  };

  return {
    board,
    setBoard,
    resetBoard,
  };
};