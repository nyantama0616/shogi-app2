import { PieceType } from './types';

export const INITIAL_SFEN = "lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL";

export const PIECE_NAMES: Record<PieceType, string> = {
  'K': '王', 'R': '飛', 'B': '角', 'G': '金', 'S': '銀', 'N': '桂', 'L': '香', 'P': '歩',
  'k': '王', 'r': '飛', 'b': '角', 'g': '金', 's': '銀', 'n': '桂', 'l': '香', 'p': '歩',
  '+R': '龍', '+B': '馬', '+S': '成銀', '+N': '成桂', '+L': '成香', '+P': 'と',
  '+r': '龍', '+b': '馬', '+s': '成銀', '+n': '成桂', '+l': '成香', '+p': 'と',
};