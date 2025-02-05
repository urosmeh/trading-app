import { useGetAssetRate } from '../../api/hooks';
import useStore from '../../stores/useStore.ts';
import BSDButton from '../BSDButton/BSDButton.tsx';
import classes from './AssetRate.module.css';
import classNames from 'classnames';

type AssetRateProps = {
  assetId: string;
};

const AssetRate = ({ assetId }: AssetRateProps) => {
  const { data, isLoading, error, refetch } = useGetAssetRate(assetId);
  const { getAssetPnL } = useStore();

  if (isLoading) {
    return <div>Loading rates...</div>;
  }

  if (error) {
    //todo: add retry button
    return (
      <div>
        <p>There's been an error fetching rate.</p>
        <BSDButton title={'Retry'} onClick={() => refetch} />
      </div>
    );
  }

  const pnl = getAssetPnL(assetId, parseFloat(data?.rateUsd || '1'));
  const pnlStr = pnl.toFixed(2);

  return (
    <div>
      <p className={classes.text}>{data?.symbol}</p>
      <p className={classes.text}>
        {parseFloat(data?.rateUsd || '1').toFixed(2)} $
      </p>
      {
        <p>
          PnL:
          <span
            className={classNames(
              pnl >= 0 ? classes.pnlProfit : classes.pnlLoss
            )}
          >
            {pnlStr} €
          </span>
        </p>
      }
    </div>
  );
};

export default AssetRate;
