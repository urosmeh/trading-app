import { useQuery } from '@tanstack/react-query';
import { getAssets } from '../coincap';

export const useGetAssets = (search: string) => {
  return useQuery({
    queryKey: ['assets', search],
    queryFn: () => getAssets(search),
  });
};
