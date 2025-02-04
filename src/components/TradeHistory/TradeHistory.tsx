import { formatTime } from '../../utils/timeUtils.ts';
import useStore from '../../stores/useStore.ts';
import classes from './TradeHistory.module.css';

const TradeHistory = () => {
  //todo: asset id as param and filter history if assetBought/assetSold === assetId
  const { tradeHistory } = useStore();

  return (
    <div className={classes.container}>
      {tradeHistory.length ? (
        tradeHistory.map((trade) => (
          <div className={classes.trade} key={trade.timestamp}>
            <p className={classes.type}>{trade.type}</p>
            <p className={classes.amount}>
              +{trade.buyAmount} {trade.assetBought} / -{trade.sellAmount} €
            </p>
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
