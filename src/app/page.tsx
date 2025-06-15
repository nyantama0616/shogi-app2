'use client';

import { useBoard } from '@/shogi/hooks/useBoard';
import { ShogiBoard } from '@/shogi/components';

export default function TopPage() {
  const { board } = useBoard();
  
  return (
    <div className="flex justify-center p-8">
      <ShogiBoard board={board} />
    </div>
  );
}
