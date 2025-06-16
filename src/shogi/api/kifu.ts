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
      sfen: "startpos",
      evaluations: [],
      totalMoves: 0,
    },
    'sample1': {
      sfen: "startpos moves 7g7f 3c3d 2g2f 4c4d 2f2e 2b3c 6i7h 8c8d 2e2d 2c2d 2h2d 3c2d 3i2h",
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
      sfen: "startpos moves 2g2f 8c8d 2f2e 8d8e 7g7f 4c4d 3i4h 3c3d",
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
    }
  };

  const data = mockData[kifuId];
  if (!data) {
    throw new Error(`Kifu with ID ${kifuId} not found`);
  }

  return data;
};
