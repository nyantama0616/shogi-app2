export type PieceType = 
  | 'K' | 'R' | 'B' | 'G' | 'S' | 'N' | 'L' | 'P'
  | 'k' | 'r' | 'b' | 'g' | 's' | 'n' | 'l' | 'p'
  | '+R' | '+B' | '+S' | '+N' | '+L' | '+P'
  | '+r' | '+b' | '+s' | '+n' | '+l' | '+p';

export type Piece = PieceType | null;

// 持ち駒の基本駒種（成駒は持ち駒にならない）
export type HandPieceType = 'R' | 'B' | 'G' | 'S' | 'N' | 'L' | 'P';

// 持ち駒（各駒種の枚数をマップで管理）
export type Hand = Partial<Record<HandPieceType, number>>;

// 盤面全体の状態
export type Board = {
  boardPieces: Piece[][]; // 盤上の駒配置
  blackHand: Hand; // 先手の持ち駒
  whiteHand: Hand; // 後手の持ち駒
  currentTurn: 'black' | 'white'; // 現在の手番
};
