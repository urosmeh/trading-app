import { useGetAssetChartData, useGetAssetRate } from '../../api/hooks';
import classes from './AssetDetails.module.css';
import AssetChart from '../AssetChart/AssetChart.tsx';
import { ChangeEvent, useCallback, useState } from 'react';
import AssetRate from '../AssetRate/AssetRate.tsx';
import BSDButton from '../BSDButton/BSDButton.tsx';
import BSDInput from '../BSDInput/BSDInput.tsx';
import Modal from '../Modal/Modal.tsx';
import useFiatCryptoValue from '../../hooks/useFiatCryptoValue.ts';
import useStore from '../../stores/useStore.ts';
import TradeHistory from '../TradeHistory/TradeHistory.tsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TradeSchema, tradeSchema } from '../../schemas/trade.schema.ts';

type AssetDetailsProps = {
  assetId: string;
};

const defaultValues = {
  cryptoValue: '0',
  fiatValue: '0',
};

type TradeForm = typeof defaultValues;

const tradeResolver = zodResolver(tradeSchema);

const AssetDetails = ({ assetId }: AssetDetailsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { data, isLoading, error, refetch } = useGetAssetChartData(assetId);
  const { data: rateData } = useGetAssetRate(assetId);

  const rate = parseFloat(rateData?.rateUsd || '0');
  const assetAbbr = rateData?.symbol || assetId;

  const { handleSubmit, register, reset, setError, formState, setValue } =
    useForm<TradeSchema>({ resolver: tradeResolver, mode: 'onBlur' });

  const {
    fiatValue,
    cryptoValue,
    calculateRate,
    setFiatValue,
    setCryptoValue,
  } = useFiatCryptoValue(rate, setValue);

  const { addTradeHistory, funds, updateFunds } = useStore();

  const resetForm = () => {
    reset();
    setFiatValue(defaultValues.fiatValue);
    setCryptoValue(defaultValues.cryptoValue);
  };

  const handleTrade = useCallback(
    (type: 'buy' | 'sell') => {
      const assetSold = type === 'buy' ? 'EUR' : assetAbbr;
      const assetBought = type === 'buy' ? assetAbbr : 'EUR';
      const sellAmount =
        type === 'buy' ? parseFloat(fiatValue) : parseFloat(cryptoValue);
      const buyAmount =
        type === 'buy' ? parseFloat(cryptoValue) : parseFloat(fiatValue);

      if (type === 'buy' && funds.fiat < sellAmount) {
        setError('root', {
          message: 'Insufficient funds (€)',
        });
        return;
      }

      const assetFunds = funds[assetAbbr] || 0;

      if (type === 'sell' && sellAmount > assetFunds) {
        setError('root', {
          message: `Insufficient funds (${assetAbbr})`,
        });
        return;
      }

      addTradeHistory({
        type,
        rate,
        assetId,
        assetBought,
        assetSold,
        timestamp: new Date().getTime(),
        sellAmount,
        buyAmount,
      });

      if (type === 'buy') {
        if (!Object.keys(funds).includes(assetAbbr)) {
          updateFunds({
            ...funds,
            fiat: funds.fiat - sellAmount,
            [assetAbbr]: buyAmount,
          });
        } else {
          updateFunds({
            ...funds,
            fiat: funds.fiat - sellAmount,
            [assetAbbr]: funds[assetAbbr] + buyAmount,
          });
        }
      } else {
        updateFunds({
          ...funds,
          fiat: funds.fiat + buyAmount,
          [assetAbbr]: funds[assetAbbr] - sellAmount,
        });
      }

      resetForm();
      setModalOpen(false);
    },
    [cryptoValue, fiatValue, assetId, addTradeHistory, rate, assetAbbr]
  );

  if (isLoading) return <div>Loading...</div>;

  //todo: refactor
  //todo: fix tooltip label

  if (error)
    return (
      <div>
        <p>There's been an error</p>
        <BSDButton onClick={() => refetch} title={'Retry'} />
      </div>
    );

  const submitTrade: SubmitHandler<TradeForm & { type: 'buy' | 'sell' }> = (
    formData,
    event
  ) => {
    event?.preventDefault();
    handleTrade(formData.type);
  };

  const isFiatInvalid =
    formState.isDirty && !!formState.errors.fiatValue?.message;

  const isCryptoInvalid =
    formState.isDirty && !!formState.errors.cryptoValue?.message;

  return (
    <div className={classes.details}>
      <AssetRate assetId={assetId} />
      <AssetChart data={data} />
      <BSDButton
        title={'Trade'}
        onClick={() => {
          setModalOpen(true);
        }}
        fullWidth
      />
      <TradeHistory assetId={assetId} />
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          resetForm();
          setModalOpen(false);
        }}
      >
        <form method="dialog" className={classes.form}>
          <div className={classes.inputs}>
            <BSDInput
              key={'fiatValue'}
              {...register('fiatValue', {
                onChange: (event: ChangeEvent<HTMLInputElement>) => {
                  calculateRate('fiat', event.target.value);
                },
              })}
              currency={'EUR'}
              value={fiatValue}
              error={formState.errors.fiatValue?.message}
            />

            <BSDInput
              key={'cryptoValue'}
              {...register('cryptoValue', {
                onChange: (event: ChangeEvent<HTMLInputElement>) => {
                  calculateRate('crypto', event.target.value);
                },
              })}
              currency={assetAbbr}
              value={cryptoValue}
              error={formState.errors.cryptoValue?.message}
            />
          </div>
          {isFiatInvalid && (
            <p className={classes.errors}>
              EUR: {formState.errors.fiatValue?.message}
            </p>
          )}
          {isCryptoInvalid && (
            <p className={classes.errors}>
              {assetAbbr}: {formState.errors.cryptoValue?.message}
            </p>
          )}
          {formState.errors.root?.message && (
            <p className={classes.errors}>{formState.errors.root?.message}</p>
          )}
          <div className={classes.actions}>
            <BSDButton
              title={'Buy'}
              onClick={handleSubmit((data) => {
                submitTrade({ ...data, type: 'buy' });
              })}
              fullWidth
            />
            <BSDButton
              title={'Sell'}
              onClick={handleSubmit((data) => {
                submitTrade({ ...data, type: 'sell' });
              })}
              fullWidth
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AssetDetails;
