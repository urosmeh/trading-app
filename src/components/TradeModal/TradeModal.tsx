import Modal from '@/components/Modal/Modal.tsx';
import classes from './TradeModal.module.css';
import BSDInput from '@/components/BSDInput/BSDInput.tsx';
import { ChangeEvent, memo } from 'react';
import BSDButton from '@/components/BSDButton/BSDButton.tsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { tradeSchema, TradeSchema } from '@/schemas/trade.schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
// import useStore from '@/stores/useStore.ts';
import { ModalProps } from '@/types';
import useHandleTrade from '@/hooks/useHandleTrade.ts';

const defaultValues = {
  cryptoValue: '',
  fiatValue: '',
};

type TradeForm = typeof defaultValues;

const tradeResolver = zodResolver(tradeSchema);

type TradeModalProps = {
  rate: number;
  assetAbbr: string;
  assetId: string;
  onClose: () => void;
} & Omit<ModalProps, 'children'>;

const TradeModal = ({
  rate,
  assetAbbr,
  assetId,
  isOpen,
  onClose,
}: TradeModalProps) => {
  const {
    handleSubmit,
    register,
    reset,
    setError,
    formState,
    setValue,
    watch,
  } = useForm<TradeSchema>({
    resolver: tradeResolver,
    mode: 'onChange',
    defaultValues,
  });

  // const { addTradeHistory, funds, updateFunds } = useStore();
  const { handleTrade } = useHandleTrade();

  const cryptoValue = watch('cryptoValue');
  const fiatValue = watch('fiatValue');

  // const handleTrade = useCallback(
  //   (type: 'buy' | 'sell') => {
  //     const assetSold = type === 'buy' ? 'EUR' : assetAbbr;
  //     const assetBought = type === 'buy' ? assetAbbr : 'EUR';
  //     const sellAmount =
  //       type === 'buy' ? parseFloat(fiatValue) : parseFloat(cryptoValue);
  //     const buyAmount =
  //       type === 'buy' ? parseFloat(cryptoValue) : parseFloat(fiatValue);
  //
  //     if (type === 'buy' && funds.fiat < sellAmount) {
  //       setError('root', {
  //         message: 'Insufficient funds (€)',
  //       });
  //       return;
  //     }
  //
  //     const assetFunds = funds[assetAbbr] || 0;
  //
  //     if (type === 'sell' && sellAmount > assetFunds) {
  //       setError('root', {
  //         message: `Insufficient funds (${assetAbbr})`,
  //       });
  //       return;
  //     }
  //
  //     addTradeHistory({
  //       type,
  //       rate,
  //       assetId,
  //       assetBought,
  //       assetSold,
  //       timestamp: new Date().getTime(),
  //       sellAmount,
  //       buyAmount,
  //     });
  //
  //     if (type === 'buy') {
  //       if (!Object.keys(funds).includes(assetAbbr)) {
  //         updateFunds({
  //           ...funds,
  //           fiat: funds.fiat - sellAmount,
  //           [assetAbbr]: buyAmount,
  //         });
  //       } else {
  //         updateFunds({
  //           ...funds,
  //           fiat: funds.fiat - sellAmount,
  //           [assetAbbr]: funds[assetAbbr] + buyAmount,
  //         });
  //       }
  //     } else {
  //       updateFunds({
  //         ...funds,
  //         fiat: funds.fiat + buyAmount,
  //         [assetAbbr]: funds[assetAbbr] - sellAmount,
  //       });
  //     }
  //
  //     reset();
  //     onClose();
  //   },
  //   [
  //     cryptoValue,
  //     fiatValue,
  //     assetId,
  //     addTradeHistory,
  //     rate,
  //     assetAbbr,
  //     funds,
  //     reset,
  //     setError,
  //     updateFunds,
  //     onClose,
  //   ]
  // );

  const submitTrade: SubmitHandler<TradeForm & { type: 'buy' | 'sell' }> = (
    formData,
    event
  ) => {
    event?.preventDefault();
    // handleTrade(formData.type);
    const res = handleTrade({
      type: formData.type,
      fiatValue,
      cryptoValue,
      assetId,
      assetAbbr,
      rate,
      setError,
    });

    if (res) {
      reset();
      onClose();
    }
  };

  const isFiatInvalid =
    formState.isDirty && !!formState.errors.fiatValue?.message;

  const isCryptoInvalid =
    formState.isDirty && !!formState.errors.cryptoValue?.message;

  const calculateRate = (type: 'fiat' | 'crypto', value: string) => {
    switch (type) {
      case 'fiat': {
        if (isNaN(parseFloat(value))) {
          setValue('cryptoValue', value);
          break;
        }
        const val = (parseFloat(value) / rate).toFixed(6).toString();
        setValue('cryptoValue', val);
        break;
      }
      case 'crypto': {
        setValue('cryptoValue', value);
        if (isNaN(parseFloat(value))) {
          setValue('fiatValue', '');
          break;
        }
        const val = (parseFloat(value) * rate).toFixed(6).toString();
        setValue('fiatValue', val);
        break;
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
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
          />
          <BSDButton
            title={'Sell'}
            onClick={handleSubmit((data) => {
              submitTrade({ ...data, type: 'sell' });
            })}
          />
        </div>
      </form>
    </Modal>
  );
};

export default memo(TradeModal);
