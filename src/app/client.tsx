'use client';

import { getBoardFromMoves } from '@/shogi/utils/board';
import { useKifuController } from '@/shogi/hooks/use-kifu-controller';
import { ShogiBoard, EvaluationChart, KifuController, HandPieces } from '@/shogi/components';
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
        <div className="flex flex-col items-center gap-4">
          {/* 後手の持ち駒 */}
          <HandPieces hand={board.whiteHand} isBlack={false} />
          
          {/* 将棋盤 */}
          <ShogiBoard boardPieces={board.boardPieces} />
          
          {/* 先手の持ち駒 */}
          <HandPieces hand={board.blackHand} isBlack={true} />
        </div>
        
        <div className="flex justify-center">
          <EvaluationChart data={evaluations} currentMove={currentMove} />
        </div>
      </div>
      
      <div className="flex justify-center">
        <KifuController
          onPrevious={handlePrevious}
          onNext={handleNext}
          canGoPrevious={canGoPrevious}
          canGoNext={canGoNext}
          currentMove={currentMove}
          totalMoves={totalMoves}
        />
      </div>
    </div>
  );
};
