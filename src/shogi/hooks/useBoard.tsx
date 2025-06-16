import { parseSFENBoard, getPositionSfen } from '@/shogi/utils/';

export const useBoard = (movesSfen: string, currentMove: number) => {
  const positionSfen = getPositionSfen(movesSfen, currentMove);
  const board = parseSFENBoard(positionSfen);
  console.log(`positionSfen: ${positionSfen}`);
  

  return {
    board
  };
};
