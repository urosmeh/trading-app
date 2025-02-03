import { useGetAssetChartData } from '../../api/hooks';
import classes from './AssetDetails.module.css';
import AssetChart from '../AssetChart/AssetChart.tsx';
import { useState } from 'react';
import AssetRate from '../AssetRate/AssetRate.tsx';
import BSDButton from '../BSDButton/BSDButton.tsx';
import BSDInput from '../BSDInput/BSDInput.tsx';
import Modal from '../Modal/Modal.tsx';

type AssetDetailsProps = {
  assetId: string;
};

const AssetDetails = ({ assetId }: AssetDetailsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { data, isLoading, error } = useGetAssetChartData(assetId);

  if (isLoading) return <div>Loading...</div>;

  //todo: Add retries!!!
  //todo: fix tooltip label
  if (error) return <div>There's been an error</div>;

  return (
    <div className={classes.details}>
      <AssetRate assetId={assetId} />
      <AssetChart data={data} />
      <BSDButton title={'Trade'} onClick={() => setModalOpen(true)} />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <form method="dialog" className={classes.form}>
          <div className={classes.inputs}>
            <BSDInput currency={'EUR'} />
            <BSDInput currency={'BTC'} />
          </div>

          <div className={classes.actions}>
            <BSDButton
              title={'Buy'}
              onClick={() => console.log('buy')}
              fullWidth
            />
            <BSDButton
              title={'Sell'}
              onClick={() => console.log('sell')}
              fullWidth
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AssetDetails;
