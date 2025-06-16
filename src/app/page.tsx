import { fetchKifuData } from '@/shogi/api';
import { TopPageClient } from './client';

export default async function TopPage() {
  const { sfen, evaluations, totalMoves } = await fetchKifuData('piyo0');
  
  return (
    <TopPageClient sfen={sfen} evaluations={evaluations} totalMoves={totalMoves} />
  );
}
