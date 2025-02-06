import { PropsWithChildren } from 'react';
import TSQueryClientProvider from '@/providers/TSQueryClientProvider/TSQueryClientProvider.tsx';

//here all wrapping providers should be defined
const Providers = ({ children }: PropsWithChildren) => {
  return <TSQueryClientProvider>{children}</TSQueryClientProvider>;
};

export default Providers;
