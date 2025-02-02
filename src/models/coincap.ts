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
