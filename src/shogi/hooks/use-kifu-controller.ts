import { useState } from 'react';

export const useKifuController = (totalMoves: number) => {
  const [currentMove, setCurrentMove] = useState(0);
  
  const handlePrevious = () => {
    setCurrentMove(prev => Math.max(0, prev - 1));
  };
  
  const handleNext = () => {
    setCurrentMove(prev => Math.min(totalMoves, prev + 1));
  };
  
  const goToMove = (move: number) => {
    setCurrentMove(Math.max(0, Math.min(totalMoves, move)));
  };
  
  const canGoPrevious = currentMove > 0;
  const canGoNext = currentMove < totalMoves;
  
  return {
    currentMove,
    handlePrevious,
    handleNext,
    goToMove,
    canGoPrevious,
    canGoNext,
  };
};