import { Board, Piece, PieceType, Hand, HandPieceType } from '../types';

export const parseSFENBoard = (sfen: string): Board => {
  // SFEN文字列から各部分を抽出
  // 形式: "盤面 手番 持ち駒 手数" または "盤面のみ"
  const parts = sfen.trim().split(' ');
  const boardPart = parts[0];
  const turn = parts[1] || 'b';
  const handPart = parts[2] || '-';
  
  // 盤面を解析
  const ranks = boardPart.split('/');
  const boardPieces: Piece[][] = [];
  
  for (const rank of ranks) {
    const row: Piece[] = [];
    let i = 0;
    
    while (i < rank.length) {
      const char = rank[i];
      
      if (char >= '1' && char <= '9') {
        const emptyCount = parseInt(char);
        for (let j = 0; j < emptyCount; j++) {
          row.push(null);
        }
        i++;
      } else if (char === '+') {
        const nextChar = rank[i + 1];
        row.push(`+${nextChar}` as PieceType);
        i += 2;
      } else {
        row.push(char as PieceType);
        i++;
      }
    }
    
    boardPieces.push(row);
  }
  
  // 持ち駒を解析
  const { blackHand, whiteHand } = parseHandPart(handPart);
  
  return {
    boardPieces,
    blackHand,
    whiteHand,
    currentTurn: turn === 'b' ? 'black' : 'white'
  };
};

/**
 * SFEN持ち駒部分を解析する
 * @param handPart - 持ち駒部分の文字列 (例: "2P3p" または "-")
 * @returns 先手・後手の持ち駒
 */
const parseHandPart = (handPart: string): { blackHand: Hand; whiteHand: Hand } => {
  const blackHand: Hand = {};
  const whiteHand: Hand = {};
  
  if (handPart === '-') {
    return { blackHand, whiteHand };
  }
  
  let i = 0;
  while (i < handPart.length) {
    let count = 1;
    
    // 数字があるかチェック
    if (handPart[i] >= '1' && handPart[i] <= '9') {
      count = parseInt(handPart[i]);
      i++;
    }
    
    // 駒の種類を取得
    if (i < handPart.length) {
      const piece = handPart[i];
      const handPieceType = piece.toUpperCase() as HandPieceType;
      
      // 大文字は先手、小文字は後手
      if (piece === piece.toUpperCase()) {
        blackHand[handPieceType] = (blackHand[handPieceType] || 0) + count;
      } else {
        whiteHand[handPieceType] = (whiteHand[handPieceType] || 0) + count;
      }
      i++;
    }
  }
  
  return { blackHand, whiteHand };
};
