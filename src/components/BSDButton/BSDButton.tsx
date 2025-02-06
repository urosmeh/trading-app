import classes from './BSDButton.module.css';
import classNames from 'classnames';
import { HTMLAttributes, memo } from 'react';

type BSDButtonProps = HTMLAttributes<HTMLButtonElement> & {
  title: string;
  disabled?: boolean;
  className?: string;
};

const BSDButton = ({
  title,
  disabled,
  className = '',
  ...props
}: BSDButtonProps) => {
  return (
    <button
      className={classNames(classes.button, className)}
      {...props}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default memo(BSDButton);
