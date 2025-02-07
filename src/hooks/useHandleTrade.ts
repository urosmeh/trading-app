import useStore from '@/stores/useStore.ts';
import { useCallback } from 'react';
import { ErrorOption } from 'react-hook-form';

type SetErrorType = (
  name: 'fiatValue' | 'cryptoValue' | 'root' | `root.${string}`,
  error: ErrorOption,
  options?: { shouldFocus: boolean }
) => void;

type HandleTradeProps = {
  type: 'buy' | 'sell';
  assetAbbr: string;
  fiatValue: string;
  cryptoValue: string;
  setError: SetErrorType;
  rate: number;
  assetId: string;
};

const useHandleTrade = () => {
  const { addTradeHistory, funds, updateFunds } = useStore();

  const handleTrade = useCallback(
    ({
      type,
      assetAbbr,
      fiatValue,
      cryptoValue,
      setError,
      rate,
      assetId,
    }: HandleTradeProps) => {
      const assetSold = type === 'buy' ? 'EUR' : assetAbbr;
      const assetBought = type === 'buy' ? assetAbbr : 'EUR';
      const sellAmount =
        type === 'buy' ? parseFloat(fiatValue) : parseFloat(cryptoValue);
      const buyAmount =
        type === 'buy' ? parseFloat(cryptoValue) : parseFloat(fiatValue);

      if (type === 'buy' && funds.fiat < sellAmount) {
        setError('root', {
          message: 'Insufficient funds (€)',
        });
        return false;
      }

      const assetFunds = funds[assetAbbr] || 0;

      if (type === 'sell' && sellAmount > assetFunds) {
        setError('root', {
          message: `Insufficient funds (${assetAbbr})`,
        });
        return false;
      }

      addTradeHistory({
        type,
        rate,
        assetId,
        assetBought,
        assetSold,
        timestamp: new Date().getTime(),
        sellAmount,
        buyAmount,
      });

      if (type === 'buy') {
        if (!Object.keys(funds).includes(assetAbbr)) {
          updateFunds({
            ...funds,
            fiat: funds.fiat - sellAmount,
            [assetAbbr]: buyAmount,
          });
        } else {
          updateFunds({
            ...funds,
            fiat: funds.fiat - sellAmount,
            [assetAbbr]: funds[assetAbbr] + buyAmount,
          });
        }
      } else {
        updateFunds({
          ...funds,
          fiat: funds.fiat + buyAmount,
          [assetAbbr]: funds[assetAbbr] - sellAmount,
        });
      }

      return true;
    },
    [addTradeHistory, funds, updateFunds]
  );

  return {
    handleTrade,
  };
};

export default useHandleTrade;
