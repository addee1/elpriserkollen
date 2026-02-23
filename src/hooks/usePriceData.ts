import { useQuery } from '@tanstack/react-query';
import { fetchPrices } from '../utils/priceApi';

export function usePriceData(area: string, day: 'today' | 'tomorrow') {
  return useQuery({
    queryKey: ['prices', area, day],
    queryFn: () => fetchPrices(area, day),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}
