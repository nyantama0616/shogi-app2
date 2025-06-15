export type PieceType = 
  | 'K' | 'R' | 'B' | 'G' | 'S' | 'N' | 'L' | 'P'
  | 'k' | 'r' | 'b' | 'g' | 's' | 'n' | 'l' | 'p'
  | '+R' | '+B' | '+S' | '+N' | '+L' | '+P'
  | '+r' | '+b' | '+s' | '+n' | '+l' | '+p';

export type Piece = PieceType | null;

export type Board = Piece[][];