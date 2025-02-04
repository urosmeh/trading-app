import classes from './BSDInput.module.css';
import { ChangeEvent, memo } from 'react';

type BSDInputProps = {
  currency: string;
  max?: number;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const BSDInput = ({ currency, max, value, onChange }: BSDInputProps) => {
  return (
    <div className={classes.inputWrapper}>
      <input
        className={classes.inputField}
        max={max}
        value={value}
        onChange={onChange}
      />
      <span className={classes.currency}>{currency}</span>
    </div>
  );
};

export default memo(BSDInput);
