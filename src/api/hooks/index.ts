import { useQuery } from '@tanstack/react-query';
import { getAssetChartData, getAssets } from '../coincap';
import { ChartIntervals } from '../../models/coincap.ts';

export const useGetAssets = (search: string) => {
  return useQuery({
    queryKey: ['assets', search],
    queryFn: () => getAssets(search),
  });
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
