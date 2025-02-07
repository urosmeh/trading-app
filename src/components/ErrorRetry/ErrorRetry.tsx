import BSDButton from '@/components/BSDButton/BSDButton.tsx';
import { memo } from 'react';

type ErrorRetryProps = {
  text?: string;
  refetch: () => void;
};

const defaultText = "There's been an error";

const ErrorRetry = ({ text = defaultText, refetch }: ErrorRetryProps) => {
  return (
    <div data-testid={'error-retry'}>
      <p>{text}</p>
      <BSDButton onClick={refetch} title={'Retry'} />
    </div>
  );
};

export default memo(ErrorRetry);
