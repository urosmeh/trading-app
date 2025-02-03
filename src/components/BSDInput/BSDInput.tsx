import classes from './BSDInput.module.css';
import { HTMLAttributes, memo } from 'react';

type BSDInputProps = HTMLAttributes<HTMLInputElement> & {
  currency?: string;
};

const BSDInput = ({ currency, ...props }: BSDInputProps) => {
  return (
    <div className={classes.inputWrapper}>
      <input
        type="number"
        className={classes.inputField}
        defaultValue="100"
        {...props}
      />
      <span className={classes.currency}>{currency}</span>
    </div>
  );
};

export default memo(BSDInput);
