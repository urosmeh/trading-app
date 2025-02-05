import classes from './BSDInput.module.css';
import { ChangeEvent, forwardRef, HTMLProps, memo, Ref } from 'react';
import classNames from 'classnames';

type BSDInputProps = {
  currency: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
} & HTMLProps<HTMLInputElement>;

const BSDInput = forwardRef(
  (
    { currency, value, onChange, error, ...rest }: BSDInputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <>
        <div
          className={classNames(
            classes.inputWrapper,
            error ? classes.error : undefined
          )}
        >
          <input
            className={classes.inputField}
            {...rest}
            value={value}
            onChange={onChange}
            ref={ref}
          />
          <span className={classes.currency}>{currency}</span>
        </div>
      </>
    );
  }
);

export default memo(BSDInput);
