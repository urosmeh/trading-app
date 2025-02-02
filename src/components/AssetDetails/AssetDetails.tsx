import { useGetAssetChartData } from '../../api/hooks';
import classes from './AssetDetails.module.css';
import AssetChart from '../AssetChart/AssetChart.tsx';
import { useRef } from 'react';
import CloseIcon from '../../assets/closeIcon.svg';
import AssetRate from '../AssetRate/AssetRate.tsx';
import BSDButton from '../BSDButton/BSDButton.tsx';

type AssetDetailsProps = {
  assetId: string;
};

const AssetDetails = ({ assetId }: AssetDetailsProps) => {
  const { data, isLoading, error } = useGetAssetChartData(assetId);

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  if (isLoading) return <div>Loading...</div>;

  //todo: Add retries!!!
  //todo: fix tooltip label
  if (error) return <div>There's been an error</div>;

  return (
    <div className={classes.details}>
      <AssetRate assetId={assetId} />
      <AssetChart data={data} />
      <BSDButton
        title={'Trade'}
        onClick={() => dialogRef?.current?.showModal()}
      />

      {/*  todo: refactor !*/}
      <dialog className={classes.modal} ref={dialogRef}>
        <span onClick={() => dialogRef.current?.close()}>
          <img src={CloseIcon} alt={'close icon'} />
        </span>
        <form method="dialog">
          <BSDButton title={'Buy'} />
          <BSDButton title={'Sell'} />
        </form>
      </dialog>
    </div>
  );
};

export default AssetDetails;
