import { fetchKifuData } from '@/shogi/api';
import { TopPageClient } from './client';

export default async function TopPage() {
  const { sfen, evaluations } = await fetchKifuData('sample1');
  
  return (
    <TopPageClient sfen={sfen} evaluations={evaluations} />
  );
}
