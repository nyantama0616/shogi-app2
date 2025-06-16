import { EvaluationData } from '@/shogi/hooks/useEvaluationChart';

export type KifuData = {
  sfen: string;
  evaluations: EvaluationData[];
  totalMoves: number;
};

export const fetchKifuData = async (kifuId: string): Promise<KifuData> => {
  // TODO: 実際のAPIエンドポイントに置き換える
  // const response = await fetch(`/api/kifu/${kifuId}`);
  // if (!response.ok) {
  //   throw new Error('Failed to fetch kifu data');
  // }
  // return response.json();

  // モックデータを返す（開発用）
  await new Promise(resolve => setTimeout(resolve, 500)); // APIコールのシミュレーション

  const mockData: Record<string, KifuData> = {
    'sample0': {
      sfen: "position startpos",
      evaluations: [],
      totalMoves: 0,
    },
    'sample1': {
      sfen: "position startpos moves 7g7f 3c3d 2g2f 4c4d 2f2e 2b3c 6i7h 8c8d 2e2d 2c2d 2h2d 3c2d 3i2h",
      evaluations: [
        { move: 1, evaluation: 50 },
        { move: 2, evaluation: 30 },
        { move: 3, evaluation: -20 },
        { move: 4, evaluation: -50 },
        { move: 5, evaluation: 0 },
        { move: 6, evaluation: 100 },
        { move: 7, evaluation: 80 },
        { move: 8, evaluation: -30 },
        { move: 9, evaluation: 200 },
        { move: 10, evaluation: 150 },
        { move: 11, evaluation: 120 },
        { move: 12, evaluation: 180 },
        { move: 13, evaluation: 160 },
      ],
      totalMoves: 13,
    },
    'sample2': {
      sfen: "position startpos moves 2g2f 8c8d 2f2e 8d8e 7g7f 4c4d 3i4h 3c3d",
      evaluations: [
        { move: 1, evaluation: 100 },
        { move: 2, evaluation: 120 },
        { move: 3, evaluation: 80 },
        { move: 4, evaluation: -100 },
        { move: 5, evaluation: -200 },
        { move: 6, evaluation: -150 },
        { move: 7, evaluation: 50 },
        { move: 8, evaluation: 200 },
      ],
      totalMoves: 8,
    },
    "piyo0": {
      sfen: "position startpos moves 7g7f 3c3d 8h2b 3a2b B*4e 7a6b 4e3d 6a5b 6g6f 5a4b 7i8h 4a3b 8h7g 2b3c 3d5f 5c5d 8g8f 4c4d 8f8e 5d5e 5f6g 8c8d 2h8h 8d8e 7f7e 8e8f 7g8f B*5d P*8e 5d2g+ 6g7f 6b5c 6i5h 5c6d 8i7g 4b3a 5i4h 5b4b 8e8d 8b8d 8f8e 8d8b 8e8d 5e5f 8d8c 5f5g+ 5h5g 8b5b P*5h 6d7e 7f3b+ 3a3b 8c7b+ P*8g",
      evaluations: [...Array(54)].map((_, i) => ({ move: i + 1, evaluation: 0 })),
      totalMoves: 54,
    }
  };

  const data = mockData[kifuId];
  if (!data) {
    throw new Error(`Kifu with ID ${kifuId} not found`);
  }

  return data;
};
