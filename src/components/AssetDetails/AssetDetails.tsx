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

type AssetDetailsProps = {
  assetId: string;
};

const defaultValues = {
  cryptoValue: '0',
  fiatValue: '0',
};

type TradeForm = typeof defaultValues;

const AssetDetails = ({ assetId }: AssetDetailsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { data, isLoading, error, refetch } = useGetAssetChartData(assetId);
  const { data: rateData } = useGetAssetRate(assetId);

  const rate = parseFloat(rateData?.rateUsd || '0');
  const assetAbbr = rateData?.symbol || assetId;

  const { fiatValue, cryptoValue, calculateRate, reset } =
    useFiatCryptoValue(rate);
  const { addTradeHistory } = useStore();

  const {
    handleSubmit,
    register,
    reset: resetForm,
    formState,
    clearErrors,
  } = useForm<TradeForm>({
    defaultValues,
    mode: 'onBlur',
  });

  const handleTrade = useCallback(
    (type: 'buy' | 'sell') => {
      const assetSold = type === 'buy' ? 'EUR' : assetAbbr;
      const assetBought = type === 'buy' ? assetAbbr : 'EUR';
      const sellAmount =
        type === 'buy' ? parseFloat(fiatValue) : parseFloat(cryptoValue);
      const buyAmount =
        type === 'buy' ? parseFloat(cryptoValue) : parseFloat(fiatValue);

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

      reset();
      setModalOpen(false);
    },
    [cryptoValue, fiatValue, assetId, addTradeHistory, rate, reset, assetAbbr]
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
    if (formState.isValid) {
      handleTrade(formData.type);
      resetForm();
    }
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
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <form method="dialog" className={classes.form}>
          <div className={classes.inputs}>
            <BSDInput
              {...register('fiatValue', {
                onChange: async (event: ChangeEvent<HTMLInputElement>) => {
                  calculateRate('fiat', event.target.value);
                  clearErrors('cryptoValue');
                },
                pattern: {
                  value: /^[0-9]*\.?[0-9]*$/, // numbers and decimals
                  message: 'Only numbers are allowed',
                },
                required: true,
                min: {
                  value: 0.0,
                  message: 'Value must be greater ',
                },
                max: {
                  value: 10000,
                  message: 'Value must not exceed 10,000',
                },
              })}
              currency={'EUR'}
              value={fiatValue}
              error={formState.errors.fiatValue?.message}
            />

            <BSDInput
              {...register('cryptoValue', {
                onChange: async (event: ChangeEvent<HTMLInputElement>) => {
                  calculateRate('crypto', event.target.value);
                  clearErrors('fiatValue');
                },
                pattern: {
                  value: /^[0-9]*\.?[0-9]*$/, // numbers and decimals
                  message: 'Only numbers are allowed',
                },
                required: true,
                min: {
                  value: 0.0,
                  message: 'Value must be at least 1',
                },
                max: {
                  value: 10000,
                  message: 'Value must not exceed 10,000',
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
          <div className={classes.actions}>
            <BSDButton
              title={'Buy'}
              onClick={handleSubmit((data) =>
                submitTrade({ ...data, type: 'buy' })
              )}
              fullWidth
            />
            <BSDButton
              title={'Sell'}
              onClick={handleSubmit((data) =>
                submitTrade({ ...data, type: 'sell' })
              )}
              fullWidth
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AssetDetails;
