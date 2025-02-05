import { create } from 'zustand';

type Funds = {
  fiat: number;
  [key: string]: number;
};

export type Trade = {
  type: 'buy' | 'sell';
  rate: number;
  assetId: string;
  assetBought: string;
  assetSold: string;
  timestamp: number;
  sellAmount: number;
  buyAmount: number;
};

type StoreState = {
  funds: Funds;
  updateFunds: (newFunds: Funds) => void;
  tradeHistory: Trade[];
  addTradeHistory: (trade: Trade) => void;
  getTradeHistory: (assetId: string) => Trade[];
  getAssetPnL: (assetId: string, currentRate: number) => number;
};

const useStore = create<StoreState>((set, get) => ({
  funds: {
    fiat: 10000,
  },
  updateFunds: (newFunds: Funds) => set({ funds: newFunds }),
  tradeHistory: [],
  getTradeHistory: (assetId: string) =>
    get().tradeHistory.filter(
      (tradeHistory) => tradeHistory.assetId === assetId
    ),
  addTradeHistory: (trade) =>
    set((state) => ({ tradeHistory: [...state.tradeHistory, trade] })),
  getAssetPnL: (assetId, currentRate) => {
    const assetTrades = get().getTradeHistory(assetId);
    let totalSpent = 0;
    let totalAssetBought = 0;
    let totalAssetSold = 0;
    let totalReceived = 0;

    assetTrades.forEach((t) => {
      switch (t.type) {
        case 'buy': {
          totalSpent += t.sellAmount;
          totalAssetBought += t.buyAmount;
          break;
        }
        case 'sell': {
          totalReceived += t.buyAmount;
          totalAssetSold += t.sellAmount;
          break;
        }
      }
    });

    const diff = totalAssetBought - totalAssetSold;
    const currentValue = diff * currentRate;

    return totalReceived + currentValue - totalSpent;
  },
}));

export default useStore;
