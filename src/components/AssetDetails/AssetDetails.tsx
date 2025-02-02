import { useGetAssetChartData } from '../../api/hooks';
import classes from './AssetDetails.module.css';
import AssetChart from '../AssetChart/AssetChart.tsx';
import { useRef } from 'react';
import CloseIcon from '../../assets/closeIcon.svg';
import AssetRate from '../AssetRate/AssetRate.tsx';

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
      <button
        className={classes.button}
        onClick={() => dialogRef?.current?.showModal()}
      >
        Trade
      </button>

      {/*  todo: refactor !*/}
      <dialog className={classes.modal} ref={dialogRef}>
        <span onClick={() => dialogRef.current?.close()}>
          <img src={CloseIcon} alt={'close icon'} />
        </span>
        <form method="dialog">
          <button onClick={() => dialogRef?.current?.close()}>OK</button>
          <button className={classes.button}>Buy</button>
          <button className={classes.button}>Sell</button>
        </form>
      </dialog>
    </div>
  );
};

export default AssetDetails;
