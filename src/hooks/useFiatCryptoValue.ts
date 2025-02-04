import { useCallback, useState } from 'react';

const useFiatCryptoValue = (rate: number) => {
  const [fiatValue, setFiatValue] = useState('');
  const [cryptoValue, setCryptoValue] = useState('');

  const calculateRate = useCallback(
    (type: 'fiat' | 'crypto', value: string) => {
      switch (type) {
        case 'fiat': {
          setFiatValue(value);
          if (isNaN(parseFloat(value))) {
            setCryptoValue('');
            break;
          }
          setCryptoValue((parseFloat(value) / rate).toFixed(6).toString());
          break;
        }

        case 'crypto': {
          setCryptoValue(value);
          if (isNaN(parseFloat(value))) {
            setFiatValue('');
            break;
          }
          setFiatValue((parseFloat(value) * rate).toFixed(6).toString());
          break;
        }
      }
    },
    [rate]
  );

  const reset = useCallback(() => {
    setCryptoValue('');
    setFiatValue('');
  }, []);

  return {
    cryptoValue,
    fiatValue,
    calculateRate,
    reset,
  };
};

export default useFiatCryptoValue;
