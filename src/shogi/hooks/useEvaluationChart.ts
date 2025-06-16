import { useState } from 'react';

export type EvaluationData = {
  move: number;
  evaluation: number;
};

export const useEvaluationChart = () => {
  const [evaluationData, setEvaluationData] = useState<EvaluationData[]>([
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
  ]);

  return {
    evaluationData,
    setEvaluationData,
  };
};