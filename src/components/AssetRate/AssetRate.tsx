import { useGetAssetRate } from '@/api/hooks';
import useStore from '@/stores/useStore.ts';
import classes from './AssetRate.module.css';
import classNames from 'classnames';
import Loading from '@/components/Loading/Loading.tsx';
import ErrorRetry from '@/components/ErrorRetry/ErrorRetry.tsx';
import { formatNumber } from '@/utils/stringUtils.ts';

type AssetRateProps = {
  assetId: string;
};

const AssetRate = ({ assetId }: AssetRateProps) => {
  const { data, isLoading, error, refetch } = useGetAssetRate(assetId);
  const { getAssetPnL } = useStore();

  if (isLoading) {
    return <Loading />;
  }

  if (error)
    return <ErrorRetry text={'Cannot retrieve rates'} refetch={refetch} />;

  const pnl = getAssetPnL(assetId, parseFloat(data?.rateUsd || '1'));
  const pnlStr = formatNumber(pnl);

  return (
    <div>
      <p className={classes.text}>{data?.symbol}</p>
      <p className={classes.text}>{formatNumber(data?.rateUsd || '1')} $</p>
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
