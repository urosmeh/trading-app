import { ApiRoutes } from '../../constants/apiRoutes.ts';
import {
  AssetList,
  ChartHistoryEventList,
  ChartIntervals,
  CoincapResponse,
  Rate,
} from '../../models/coincap.ts';

const apiUrl =
  import.meta.env.VITE_COINCAP_API_URL || 'https://api.coincap.io/v2';

export const getAssets = async (search: string) => {
  const response = await fetch(
    `${apiUrl}${ApiRoutes.ASSETS}?` + new URLSearchParams({ search }).toString()
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const result = (await response.json()) as CoincapResponse<AssetList>;
  return result.data;
};

export const getAssetChartData = async (
  assetId: string,
  interval: ChartIntervals = ChartIntervals.ONE_HOUR
) => {
  //this would need a map for more complex or charts if interval is set to ONE_DAY, then it would need to be previousWeek in example....
  const now = new Date().getTime();
  const previousDay = now - 24 * 60 * 60 * 1000;

  const response = await fetch(
    `${apiUrl}${ApiRoutes.ASSETS}/${assetId}${ApiRoutes.HISTORY}?` +
      new URLSearchParams({
        interval,
        start: previousDay.toString(),
        end: now.toString(),
      }).toString()
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const result =
    (await response.json()) as CoincapResponse<ChartHistoryEventList>;

  return result.data;
};

export const getAssetRate = async (assetId: string) => {
  const response = await fetch(`${apiUrl}${ApiRoutes.RATES}/${assetId}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const result = (await response.json()) as CoincapResponse<Rate>;

  return result.data;
};
