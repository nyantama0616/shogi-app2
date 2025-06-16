'use client';

import { useBoard } from '@/shogi/hooks/useBoard';
import { ShogiBoard, EvaluationChart } from '@/shogi/components';
import { EvaluationData } from '@/shogi/hooks/useEvaluationChart';

type TopPageClientProps = {
  sfen: string;
  evaluations: EvaluationData[];
};

export const TopPageClient = ({ sfen, evaluations }: TopPageClientProps) => {
  const { board } = useBoard(sfen);
  
  return (
    <div className="flex flex-col lg:flex-row gap-8 p-8">
      <div className="flex justify-center">
        <ShogiBoard board={board} />
      </div>
      <div className="flex justify-center">
        <EvaluationChart data={evaluations} />
      </div>
    </div>
  );
};
