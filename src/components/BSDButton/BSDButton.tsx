import classes from './BSDButton.module.css';
import classNames from 'classnames';
import { HTMLAttributes, memo } from 'react';

type BSDButtonProps = HTMLAttributes<HTMLButtonElement> & {
  title: string;
  fullWidth?: boolean;
};

const BSDButton = ({ title, fullWidth, ...props }: BSDButtonProps) => {
  return (
    <button
      className={classNames(
        classes.button,
        fullWidth ? classes.fullWidth : undefined
      )}
      {...props}
    >
      {title}
    </button>
  );
};

export default memo(BSDButton);
