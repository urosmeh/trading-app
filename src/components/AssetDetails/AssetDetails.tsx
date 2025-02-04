import { useGetAssetChartData } from '../../api/hooks';
import classes from './AssetDetails.module.css';
import AssetChart from '../AssetChart/AssetChart.tsx';
import { useCallback, useState } from 'react';
import AssetRate from '../AssetRate/AssetRate.tsx';
import BSDButton from '../BSDButton/BSDButton.tsx';
import BSDInput from '../BSDInput/BSDInput.tsx';
import Modal from '../Modal/Modal.tsx';
import useFiatCryptoValue from '../../hooks/useFiatCryptoValue.ts';
import useStore from '../../stores/useStore.ts';
import TradeHistory from '../TradeHistory/TradeHistory.tsx';

type AssetDetailsProps = {
  assetId: string;
};

const AssetDetails = ({ assetId }: AssetDetailsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { data, isLoading, error } = useGetAssetChartData(assetId);

  const rate = parseFloat('100993.6797');
  const { fiatValue, cryptoValue, calculateRate, reset } =
    useFiatCryptoValue(rate);
  const { addTradeHistory } = useStore();

  const handleTrade = useCallback(
    (type: 'buy' | 'sell') => {
      //based on design i am assuming that if user clicks Buy, it will buy 220,23 worth of btc -> asset sold = EUR
      //if user clicks Sell, it will sell the asset and "buy" eur

      //todo: instead of asset id pass in asset abbr (bitcoin -> BTC)
      const assetSold = type === 'buy' ? 'EUR' : assetId;
      const assetBought = type === 'buy' ? assetId : 'EUR';
      const sellAmount =
        type === 'buy' ? parseFloat(fiatValue) : parseFloat(cryptoValue);
      const buyAmount =
        type === 'buy' ? parseFloat(cryptoValue) : parseFloat(fiatValue);

      addTradeHistory({
        type,
        rate,
        assetBought,
        assetSold,
        timestamp: new Date().getTime(),
        sellAmount,
        buyAmount,
      });

      reset();
      setModalOpen(false);
    },
    [cryptoValue, fiatValue, assetId, addTradeHistory, rate, reset]
  );

  if (isLoading) return <div>Loading...</div>;

  //todo: refactor
  //todo: Add retries!!!
  //todo: fix tooltip label
  //todo: trade history
  if (error) return <div>There's been an error</div>;

  return (
    <div className={classes.details}>
      <AssetRate assetId={assetId} />
      <AssetChart data={data} />
      <BSDButton title={'Trade'} onClick={() => setModalOpen(true)} fullWidth />
      <TradeHistory />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <form method="dialog" className={classes.form}>
          <div className={classes.inputs}>
            <BSDInput
              currency={'EUR'}
              value={fiatValue}
              onChange={(e) => calculateRate('fiat', e.target.value)}
            />
            <BSDInput
              currency={'BTC'}
              value={cryptoValue}
              onChange={(e) => calculateRate('crypto', e.target.value)}
            />
          </div>

          <div className={classes.actions}>
            <BSDButton
              title={'Buy'}
              onClick={() => handleTrade('buy')}
              fullWidth
            />
            <BSDButton
              title={'Sell'}
              onClick={() => handleTrade('sell')}
              fullWidth
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AssetDetails;
