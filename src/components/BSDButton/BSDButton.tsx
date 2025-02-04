import classes from './BSDButton.module.css';
import classNames from 'classnames';
import { HTMLAttributes, memo } from 'react';

type BSDButtonProps = HTMLAttributes<HTMLButtonElement> & {
  title: string;
  fullWidth?: boolean;
  disabled?: boolean;
};

const BSDButton = ({ title, fullWidth, disabled }: BSDButtonProps) => {
  return (
    <button
      className={classNames(
        classes.button,
        fullWidth ? classes.fullWidth : undefined
      )}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default memo(BSDButton);
