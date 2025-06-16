import { Button } from "@/components/shadcn/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type KifuControllerProps = {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  currentMove: number;
  totalMoves: number;
};

export const KifuController = ({
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
  currentMove,
  totalMoves,
}: KifuControllerProps) => {
  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded-lg bg-white">
      <div className="text-sm text-muted-foreground">
        {currentMove} / {totalMoves} 手目
      </div>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          戻る
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={!canGoNext}
          className="flex items-center gap-1"
        >
          進む
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};