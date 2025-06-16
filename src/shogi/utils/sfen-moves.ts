/**
 * 指し手を列挙したSFEN文字列から指定手数での局面SFEN文字列を生成する
 * @param movesSfen - "position startpos moves 7g7f 3c3d ..." 形式のSFEN文字列
 * @param moveNumber - 手数（0は初期局面、1は1手目後の局面）
 * @returns 局面のSFEN文字列
 */

import { HandPieceType } from "../types";

// ゲーム状態の型定義
type GameState = {
  pieces: string[][];
  blackHand: Record<string, number>;
  whiteHand: Record<string, number>;
};

export const getPositionSfen = (movesSfen: string, moveNumber: number): string => {
  const parts = movesSfen.split(' ');
  
  // "position startpos" または "startpos" の両方に対応
  if (!(parts[0] === 'position' && parts[1] === 'startpos') && parts[0] !== 'startpos') {
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
  // 初期局面の盤面状態を作成
  let gameState = {
    pieces: [
      ['l', 'n', 's', 'g', 'k', 'g', 's', 'n', 'l'], // 1段目
      ['', 'r', '', '', '', '', '', 'b', ''],          // 2段目
      ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'], // 3段目
      ['', '', '', '', '', '', '', '', ''],            // 4段目
      ['', '', '', '', '', '', '', '', ''],            // 5段目
      ['', '', '', '', '', '', '', '', ''],            // 6段目
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'], // 7段目
      ['', 'B', '', '', '', '', '', 'R', ''],          // 8段目
      ['L', 'N', 'S', 'G', 'K', 'G', 'S', 'N', 'L'], // 9段目
    ],
    blackHand: {},
    whiteHand: {},
  };

  // 各指し手を順番に適用
  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];
    const isBlackTurn = i % 2 === 0; // 偶数番目は先手（黒）
    gameState = applyMove(gameState, move, isBlackTurn);
  }

  // 盤面を SFEN 文字列に変換
  const boardSfen = convertBoardToSfen(gameState.pieces);
  const handSfen = convertHandsToSfen(gameState.blackHand, gameState.whiteHand);
  const turn = moves.length % 2 === 0 ? 'b' : 'w';
  const moveCount = Math.floor(moves.length / 2) + 1;
  
  // 局面のSFEN文字列を返す（盤面 手番 持ち駒 手数）
  return `${boardSfen} ${turn} ${handSfen} ${moveCount}`;
};

/**
 * 1つの指し手をゲーム状態に適用する
 * @param gameState - 現在のゲーム状態
 * @param move - 指し手 (例: '7g7f')
 * @param isBlackTurn - 先手の番かどうか
 * @returns 指し手適用後のゲーム状態
 */
const applyMove = (gameState: GameState, move: string, isBlackTurn: boolean): GameState => {
  const newGameState = {
    pieces: gameState.pieces.map((row: string[]) => [...row]),
    blackHand: { ...gameState.blackHand },
    whiteHand: { ...gameState.whiteHand },
  };
  
  if (move.includes('*')) {
    // 駒打ち (例: 'B*4e')
    const [piece, position] = move.split('*');
    if (position && position.length === 2) {
      const file = 9 - parseInt(position[0]);
      const rank = position[1].charCodeAt(0) - 'a'.charCodeAt(0);
      
      // 範囲チェック
      if (rank >= 0 && rank < 9 && file >= 0 && file < 9) {
        // 先手は大文字、後手は小文字
        const actualPiece = isBlackTurn ? piece.toUpperCase() : piece.toLowerCase();
        newGameState.pieces[rank][file] = actualPiece;
        
        // 持ち駒から駒を減らす
        const handPiece = piece.toUpperCase() as HandPieceType;
        if (isBlackTurn) {
          newGameState.blackHand[handPiece] = Math.max((newGameState.blackHand[handPiece] || 0) - 1, 0);
          if (newGameState.blackHand[handPiece] === 0) {
            delete newGameState.blackHand[handPiece];
          }
        } else {
          newGameState.whiteHand[handPiece] = Math.max((newGameState.whiteHand[handPiece] || 0) - 1, 0);
          if (newGameState.whiteHand[handPiece] === 0) {
            delete newGameState.whiteHand[handPiece];
          }
        }
      } else {
        console.error(`Invalid drop position: ${position}, rank:${rank}, file:${file}`);
      }
    }
  } else if (move.includes('+')) {
    // 成り (例: '2g2f+')
    const baseMove = move.replace('+', '');
    if (baseMove.length === 4) {
      const fromFile = 9 - parseInt(baseMove[0]);
      const fromRank = baseMove[1].charCodeAt(0) - 'a'.charCodeAt(0);
      const toFile = 9 - parseInt(baseMove[2]);
      const toRank = baseMove[3].charCodeAt(0) - 'a'.charCodeAt(0);
      
      // 範囲チェック
      if (fromRank >= 0 && fromRank < 9 && fromFile >= 0 && fromFile < 9 &&
          toRank >= 0 && toRank < 9 && toFile >= 0 && toFile < 9) {
        const piece = gameState.pieces[fromRank][fromFile];
        const capturedPiece = gameState.pieces[toRank][toFile];
        
        // 駒を取った場合は持ち駒に追加
        if (capturedPiece) {
          addCapturedPieceToHand(newGameState, capturedPiece, isBlackTurn);
        }
        
        // 成り駒に変換（先手/後手の区別を保持）
        const promotedPiece = piece.startsWith('+') ? piece : `+${piece}`;
        newGameState.pieces[toRank][toFile] = promotedPiece;
        newGameState.pieces[fromRank][fromFile] = '';
      }
    }
  } else if (move.length === 4) {
    // 通常の移動 (例: '7g7f')
    const fromFile = 9 - parseInt(move[0]);
    const fromRank = move[1].charCodeAt(0) - 'a'.charCodeAt(0);
    const toFile = 9 - parseInt(move[2]);
    const toRank = move[3].charCodeAt(0) - 'a'.charCodeAt(0);
    
    // 範囲チェック
    if (fromRank < 0 || fromRank >= 9 || fromFile < 0 || fromFile >= 9 ||
        toRank < 0 || toRank >= 9 || toFile < 0 || toFile >= 9) {
      console.error(`Invalid move: ${move}, fromRank:${fromRank}, fromFile:${fromFile}, toRank:${toRank}, toFile:${toFile}`);
      return newGameState;
    }
    
    const capturedPiece = gameState.pieces[toRank][toFile];
    
    // 駒を取った場合は持ち駒に追加
    if (capturedPiece) {
      addCapturedPieceToHand(newGameState, capturedPiece, isBlackTurn);
    }
    
    // 移動先に駒を配置
    newGameState.pieces[toRank][toFile] = gameState.pieces[fromRank][fromFile];
    // 移動元を空にする
    newGameState.pieces[fromRank][fromFile] = '';
  } else {
    console.warn(`Unhandled move format: ${move}`);
  }
  
  return newGameState;
};

/**
 * 持ち駒をSFEN文字列に変換する
 * @param blackHand - 先手の持ち駒
 * @param whiteHand - 後手の持ち駒
 * @returns SFEN持ち駒文字列
 */
const convertHandsToSfen = (blackHand: Record<string, number>, whiteHand: Record<string, number>): string => {
  const pieces = ['R', 'B', 'G', 'S', 'N', 'L', 'P']; // 駒の優先順位
  let handStr = '';
  
  // 先手の持ち駒
  for (const piece of pieces) {
    const count = blackHand[piece] || 0;
    if (count > 0) {
      if (count === 1) {
        handStr += piece;
      } else {
        handStr += count + piece;
      }
    }
  }
  
  // 後手の持ち駒
  for (const piece of pieces) {
    const count = whiteHand[piece] || 0;
    if (count > 0) {
      if (count === 1) {
        handStr += piece.toLowerCase();
      } else {
        handStr += count + piece.toLowerCase();
      }
    }
  }
  
  return handStr || '-';
};

/**
 * 取った駒を持ち駒に追加する
 * @param gameState - ゲーム状態
 * @param capturedPiece - 取った駒
 * @param isBlackTurn - 先手の番かどうか
 */
const addCapturedPieceToHand = (gameState: GameState, capturedPiece: string, isBlackTurn: boolean): void => {
  // 成り駒の場合は元の駒に戻す
  let basePiece = capturedPiece.replace('+', '');
  
  // 大文字に統一（持ち駒は大文字で管理）
  basePiece = basePiece.toUpperCase();
  
  if (isBlackTurn) {
    gameState.blackHand[basePiece] = (gameState.blackHand[basePiece] || 0) + 1;
  } else {
    gameState.whiteHand[basePiece] = (gameState.whiteHand[basePiece] || 0) + 1;
  }
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
