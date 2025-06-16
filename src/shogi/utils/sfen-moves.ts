/**
 * 指し手を列挙したSFEN文字列から指定手数での局面SFEN文字列を生成する
 * @param movesSfen - "position startpos moves 7g7f 3c3d ..." 形式のSFEN文字列
 * @param moveNumber - 手数（0は初期局面、1は1手目後の局面）
 * @returns 局面のSFEN文字列
 */
export const getPositionSfen = (movesSfen: string, moveNumber: number): string => {
  const parts = movesSfen.split(' ');
  
  // "position startpos" または "startpos" の両方に対応
  let startIndex = 0;
  if (parts[0] === 'position' && parts[1] === 'startpos') {
    startIndex = 1;
  } else if (parts[0] === 'startpos') {
    startIndex = 0;
  } else {
    throw new Error('Invalid SFEN format: must start with "position startpos" or "startpos"');
  }
  
  if (moveNumber === 0) {
    // 初期局面
    return "lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1";
  }
  
  const movesIndex = parts.findIndex(part => part === 'moves');
  if (movesIndex === -1) {
    // 手がない場合は初期局面
    return "lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1";
  }
  
  const moves = parts.slice(movesIndex + 1);
  if (moveNumber > moves.length) {
    throw new Error(`Move number ${moveNumber} exceeds available moves (${moves.length})`);
  }
  
  // 指定手数までの手を含む指し手配列を取得
  const movesToApply = moves.slice(0, moveNumber);
  
  // 初期局面から指定手数まで局面を進める
  return applyMovesToPosition(movesToApply);
};

/**
 * 初期局面から指定された指し手を適用して局面を生成する
 * @param moves - 指し手の配列 (例: ['7g7f', '3c3d', ...])
 * @returns 局面のSFEN文字列
 */
const applyMovesToPosition = (moves: string[]): string => {
  // 初期局面の盤面を2次元配列で表現
  let board = [
    ['l', 'n', 's', 'g', 'k', 'g', 's', 'n', 'l'], // 1段目
    ['', 'r', '', '', '', '', '', 'b', ''],          // 2段目
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'], // 3段目
    ['', '', '', '', '', '', '', '', ''],            // 4段目
    ['', '', '', '', '', '', '', '', ''],            // 5段目
    ['', '', '', '', '', '', '', '', ''],            // 6段目
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'], // 7段目
    ['', 'B', '', '', '', '', '', 'R', ''],          // 8段目
    ['L', 'N', 'S', 'G', 'K', 'G', 'S', 'N', 'L'], // 9段目
  ];

  // 各指し手を順番に適用
  for (const move of moves) {
    board = applyMove(board, move);
  }

  // 盤面を SFEN 文字列に変換
  const boardSfen = convertBoardToSfen(board);
  const turn = moves.length % 2 === 0 ? 'b' : 'w';
  const moveCount = Math.floor(moves.length / 2) + 1;
  
  // 局面のSFEN文字列を返す（盤面 手番 持ち駒 手数）
  return `${boardSfen} ${turn} - ${moveCount}`;
};

/**
 * 1つの指し手を盤面に適用する
 * @param board - 現在の盤面
 * @param move - 指し手 (例: '7g7f')
 * @returns 指し手適用後の盤面
 */
const applyMove = (board: string[][], move: string): string[][] => {
  const newBoard = board.map(row => [...row]);
  
  if (move.length === 4) {
    // 通常の移動 (例: '7g7f')
    // 将棋の盤面表示: 9筋が左(0)、1筋が右(8)
    const fromFile = 9 - parseInt(move[0]); // 7 -> 2 (9-7=2)
    const fromRank = move[1].charCodeAt(0) - 'a'.charCodeAt(0); // 'g' -> 6
    const toFile = 9 - parseInt(move[2]);   // 7 -> 2 (9-7=2)
    const toRank = move[3].charCodeAt(0) - 'a'.charCodeAt(0);   // 'f' -> 5
    
    // 移動先に駒を配置
    newBoard[toRank][toFile] = board[fromRank][fromFile];
    // 移動元を空にする
    newBoard[fromRank][fromFile] = '';
  }
  
  return newBoard;
};

/**
 * 盤面配列をSFEN文字列に変換する
 * @param board - 盤面の2次元配列
 * @returns SFEN盤面文字列
 */
const convertBoardToSfen = (board: string[][]): string => {
  const ranks: string[] = [];
  
  for (const rank of board) {
    let rankStr = '';
    let emptyCount = 0;
    
    for (const piece of rank) {
      if (piece === '') {
        emptyCount++;
      } else {
        if (emptyCount > 0) {
          rankStr += emptyCount.toString();
          emptyCount = 0;
        }
        rankStr += piece;
      }
    }
    
    if (emptyCount > 0) {
      rankStr += emptyCount.toString();
    }
    
    ranks.push(rankStr);
  }
  
  return ranks.join('/');
};