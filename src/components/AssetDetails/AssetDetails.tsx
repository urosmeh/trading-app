import { useGetAssetChartData, useGetAssetRate } from '@/api/hooks';
import classes from './AssetDetails.module.css';
import AssetChart from '@/components/AssetChart/AssetChart.tsx';
import { useState } from 'react';
import AssetRate from '@/components/AssetRate/AssetRate.tsx';
import BSDButton from '@/components/BSDButton/BSDButton.tsx';
import TradeHistory from '@/components/TradeHistory/TradeHistory.tsx';
import Loading from '@/components/Loading/Loading.tsx';
import ErrorRetry from '@/components/ErrorRetry/ErrorRetry.tsx';
import TradeModal from '@/components/TradeModal/TradeModal.tsx';

type AssetDetailsProps = {
  assetId: string;
};

const AssetDetails = ({ assetId }: AssetDetailsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { data, isLoading, error, refetch } = useGetAssetChartData(assetId);
  const { data: rateData } = useGetAssetRate(assetId);

  const rate = parseFloat(rateData?.rateUsd || '0');
  const assetAbbr = rateData?.symbol || assetId;

  if (isLoading) return <Loading />;
  if (error) return <ErrorRetry refetch={refetch} />;

  return (
    <div className={classes.details}>
      <AssetRate assetId={assetId} />
      <AssetChart data={data} />
      <BSDButton
        title={'Trade'}
        onClick={() => {
          setModalOpen(true);
        }}
        className={classes.tradeBtn}
      />
      <TradeHistory assetId={assetId} />
      <TradeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        assetId={assetId}
        assetAbbr={assetAbbr}
        rate={rate}
      />
    </div>
  );
};

export default AssetDetails;
