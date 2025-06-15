import { Board, Piece, PieceType } from './types';

export const parseSFENBoard = (sfen: string): Board => {
  const ranks = sfen.split('/');
  const board: Board = [];
  
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
    
    board.push(row);
  }
  
  return board;
};