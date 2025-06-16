import { useState } from 'react';

export type EvaluationData = {
  move: number;
  evaluation: number;
};

export const useEvaluationChart = () => {
  const [evaluationData, setEvaluationData] = useState<EvaluationData[]>([]);

  return {
    evaluationData,
    setEvaluationData,
  };
};
