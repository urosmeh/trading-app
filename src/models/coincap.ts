export type CoincapResponse<T> = {
  data: T;
};

export type Asset = {
  id: string;
  symbol: string;
  name: string;
  price: string;
};

export type AssetList = Asset[];

export enum ChartIntervals {
  ONE_DAY = 'd1',
  ONE_HOUR = 'h1',
}

export type ChartHistoryEvent = {
  priceUsd: string;
  time: string;
};

export type ChartHistoryEventList = ChartHistoryEvent[];
