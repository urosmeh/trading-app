import { useGetAssetRate } from '../../api/hooks';

type AssetRateProps = {
  assetId: string;
};

const AssetRate = ({ assetId }: AssetRateProps) => {
  const { data, isLoading, error } = useGetAssetRate(assetId);

  if (isLoading) {
    return <div>Loading rates...</div>;
  }

  if (error) {
    //todo: add retry button
    return <div>There's been an error</div>;
  }

  //count this from user context
  const pnl = '12.3';

  return (
    <div>
      <p>{data?.symbol}</p>
      <p>{data?.rateUsd} $</p>
      <p>PnL: {pnl}</p>
    </div>
  );
};

export default AssetRate;
