'use client';

import { getBoardFromMoves } from '@/shogi/utils/board';
import { useKifuController } from '@/shogi/hooks/use-kifu-controller';
import { ShogiBoard, EvaluationChart, KifuController } from '@/shogi/components';
import { EvaluationData } from '@/shogi/hooks/useEvaluationChart';

type TopPageClientProps = {
  sfen: string;
  evaluations: EvaluationData[];
  totalMoves: number;
};

export const TopPageClient = ({ sfen, evaluations, totalMoves }: TopPageClientProps) => {
  const {
    currentMove,
    handlePrevious,
    handleNext,
    canGoPrevious,
    canGoNext,
  } = useKifuController(totalMoves);
  
  const board = getBoardFromMoves(sfen, currentMove);
  
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex justify-center">
          <ShogiBoard board={board} />
        </div>
        <div className="flex justify-center">
          <EvaluationChart data={evaluations} />
        </div>
      </div>
      
      <div className="flex justify-center">
        <KifuController
          onPrevious={handlePrevious}
          onNext={handleNext}
          canGoPrevious={canGoPrevious}
          canGoNext={canGoNext}
          currentMove={currentMove}
          totalMoves={evaluations.length}
        />
      </div>
    </div>
  );
};
