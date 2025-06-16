import { EvaluationData } from '@/shogi/hooks/useEvaluationChart';

export type KifuData = {
  sfen: string;
  evaluations: EvaluationData[];
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
    'sample1': {
      sfen: "lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL",
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
      ]
    },
    'sample2': {
      sfen: "lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL",
      evaluations: [
        { move: 1, evaluation: 100 },
        { move: 2, evaluation: 120 },
        { move: 3, evaluation: 80 },
        { move: 4, evaluation: -100 },
        { move: 5, evaluation: -200 },
        { move: 6, evaluation: -150 },
        { move: 7, evaluation: 50 },
        { move: 8, evaluation: 200 },
      ]
    }
  };

  const data = mockData[kifuId];
  if (!data) {
    throw new Error(`Kifu with ID ${kifuId} not found`);
  }

  return data;
};