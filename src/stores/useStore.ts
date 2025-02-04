import { create } from 'zustand';

type Funds = {
  fiat: number;
  btc: number;
};

type Trade = {
  type: 'buy' | 'sell';
  rate: number;
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
};

const useStore = create<StoreState>((set) => ({
  funds: {
    fiat: 100,
    btc: 1,
  },
  updateFunds: (newFunds: Funds) => set({ funds: newFunds }),
  tradeHistory: [],
  addTradeHistory: (trade) =>
    set((state) => ({ tradeHistory: [...state.tradeHistory, trade] })),
}));

export default useStore;
