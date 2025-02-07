import { cleanup, render, screen } from '@testing-library/react';
import AssetList from '@/components/AssetList/AssetList.tsx';
import * as apiHooks from '@/api/hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router';

const queryClient = new QueryClient();

afterEach(() => {
  cleanup();
});

describe('AssetList component tests', () => {
  it('should not render if search is empty', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AssetList search={''} />
      </QueryClientProvider>
    );

    expect(screen.queryByTestId('asset-list')).not.toBeInTheDocument();
  });

  it('should render Loading if hook is loading data', () => {
    vi.spyOn(apiHooks, 'useGetAssets').mockReturnValueOnce({
      data: undefined,
      isLoading: true,
      error: null,
      refetch: vi.fn(),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <AssetList search={'test'} />
      </QueryClientProvider>
    );

    expect(screen.getByTestId('three-dots-loading')).toBeInTheDocument();
  });

  it('should render ErrorRetry if hook returns an error', () => {
    vi.spyOn(apiHooks, 'useGetAssets').mockReturnValueOnce({
      data: undefined,
      isLoading: false,
      error: { name: 'test', message: 'test error' },
      refetch: vi.fn(),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <AssetList search={'test'} />
      </QueryClientProvider>
    );

    expect(screen.getByTestId('error-retry')).toBeInTheDocument();
  });

  it('should render links if data is not empty', () => {
    vi.spyOn(apiHooks, 'useGetAssets').mockReturnValueOnce({
      data: [
        {
          id: '1',
          symbol: 'btc',
          name: 'bitcoin',
          price: '100000',
        },
        {
          id: '2',
          symbol: 'btc',
          name: 'bitcoin',
          price: '100000',
        },
        {
          id: '3',
          symbol: 'btc',
          name: 'bitcoin',
          price: '100000',
        },
      ],
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path={'*'} element={<AssetList search={'btc'} />}></Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    );

    const assetList = screen.getByTestId('asset-list');
    expect(assetList).toBeInTheDocument();
    expect(assetList.children).toHaveLength(3);
  });
});
