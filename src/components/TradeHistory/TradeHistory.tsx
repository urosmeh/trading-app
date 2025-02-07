import { formatTime } from '@/utils/timeUtils.ts';
import { useStore } from '@/stores';
import classes from './TradeHistory.module.css';
import { Trade } from '@/stores/useStore.ts';

type TradeHistoryProps = {
  assetId: string;
};

const TradeHistory = ({ assetId }: TradeHistoryProps) => {
  const { getTradeHistory } = useStore();

  const tradeHistory = getTradeHistory(assetId);

  const renderAmount = (trade: Trade) => {
    switch (trade.type) {
      case 'buy': {
        return (
          <p className={classes.amount}>
            +{trade.buyAmount} {trade.assetBought} / -{trade.sellAmount} €
          </p>
        );
      }
      case 'sell': {
        return (
          <p className={classes.amount}>
            -{trade.sellAmount} {trade.assetSold} / +{trade.buyAmount} €
          </p>
        );
      }
    }
  };

  return (
    <div className={classes.container} data-testid={'trade-history'}>
      {tradeHistory.length ? (
        tradeHistory.map((trade) => (
          <div className={classes.trade} key={trade.timestamp}>
            <p className={classes.type}>{trade.type}</p>
            {renderAmount(trade)}
            <p>{formatTime(trade.timestamp)}</p>
          </div>
        ))
      ) : (
        <p>No trades to display</p>
      )}
    </div>
  );
};

export default TradeHistory;
