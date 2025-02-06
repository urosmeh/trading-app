import BSDButton from '../BSDButton/BSDButton.tsx';
import { memo } from 'react';

type ErrorRetryProps = {
  text?: string;
  refetch: () => void;
};

const defaultText = "There's been an error";

const ErrorRetry = ({ text = defaultText, refetch }: ErrorRetryProps) => {
  return (
    <div>
      <p>{text}</p>
      <BSDButton onClick={refetch} title={'Retry'} />
    </div>
  );
};

export default memo(ErrorRetry);
