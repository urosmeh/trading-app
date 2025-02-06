import { useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { TradeSchema } from '../schemas/trade.schema.ts';

const useFiatCryptoValue = (
  rate: number,
  setValue: UseFormSetValue<TradeSchema>
) => {
  const [fiatValue, setFiatValue] = useState('');
  const [cryptoValue, setCryptoValue] = useState('');

  const calculateRate = (type: 'fiat' | 'crypto', value: string) => {
    switch (type) {
      case 'fiat': {
        setFiatValue(value);
        setValue('fiatValue', value);
        if (isNaN(parseFloat(value))) {
          setCryptoValue('');
          break;
        }
        const val = (parseFloat(value) / rate).toFixed(6).toString();
        setCryptoValue(val);
        setValue('cryptoValue', val);
        break;
      }

      case 'crypto': {
        setCryptoValue(value);
        setValue('cryptoValue', value);
        if (isNaN(parseFloat(value))) {
          setFiatValue('');
          setValue('fiatValue', '');
          break;
        }
        const val = (parseFloat(value) * rate).toFixed(6).toString();
        setFiatValue(val);
        setValue('fiatValue', val);
        break;
      }
    }
  };

  return {
    cryptoValue,
    fiatValue,
    calculateRate,
    setCryptoValue,
    setFiatValue,
  };
};

export default useFiatCryptoValue;
