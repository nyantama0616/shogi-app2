import { parseSFENBoard, getPositionSfen } from '@/shogi/utils/';

/**
 * 指し手SFENと手数から盤面データを生成する
 * @param movesSfen - 指し手SFEN文字列
 * @param currentMove - 現在の手数
 * @returns 盤面データ
 */
export const getBoardFromMoves = (movesSfen: string, currentMove: number) => {
  // 指定手数での局面SFEN文字列を取得
  const positionSfen = getPositionSfen(movesSfen, currentMove);
  
  // 局面SFENから盤面データを生成
  return parseSFENBoard(positionSfen);
};
