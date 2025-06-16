'use client';

import { useBoard } from '@/shogi/hooks/useBoard';
import { useEvaluationChart } from '@/shogi/hooks/useEvaluationChart';
import { ShogiBoard, EvaluationChart } from '@/shogi/components';

export default function TopPage() {
  const { board } = useBoard();
  const { evaluationData } = useEvaluationChart();
  
  return (
    <div className="flex flex-col lg:flex-row gap-8 p-8">
      <div className="flex justify-center">
        <ShogiBoard board={board} />
      </div>
      <div className="flex justify-center">
        <EvaluationChart data={evaluationData} />
      </div>
    </div>
  );
}
