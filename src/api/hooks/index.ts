import { useQuery } from '@tanstack/react-query';
import { getAssetChartData, getAssetRate, getAssets } from '@/api/coincap';
import { ChartIntervals } from '@/models/coincap.ts';

export const useGetAssets = (search: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['assets', search],
    queryFn: () => getAssets(search),
  });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export const useGetAssetChartData = (
  assetId: string,
  interval: ChartIntervals = ChartIntervals.ONE_HOUR
) => {
  return useQuery({
    queryKey: ['asset', assetId, interval],
    queryFn: () => getAssetChartData(assetId, interval),
  });
};

export const useGetAssetRate = (assetId: string) => {
  return useQuery({
    queryKey: ['assetRate', assetId],
    queryFn: () => getAssetRate(assetId),
    refetchInterval: 1000 * 10,
  });
};
