import { parseSFENBoard } from '@/shogi/utils';

export const useBoard = (sfen: string) => {
  const board = parseSFENBoard(sfen);

  return {
    board
  };
};
