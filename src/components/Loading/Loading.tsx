import { ThreeDots } from 'react-loader-spinner';
import { memo } from 'react';

const Loading = () => {
  return <ThreeDots color="#0099cc" />;
};

export default memo(Loading);
