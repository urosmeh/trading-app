import TradeHistory from '@/components/TradeHistory/TradeHistory.tsx';
import { render, screen } from '@testing-library/react';
import * as store from '@/stores';

describe('TradeHistory component tests', () => {
  it('should render properly', () => {
    render(<TradeHistory assetId={''} />);
    expect(screen.getByTestId('trade-history')).toBeInTheDocument();
  });

  it('should render properly', () => {
    render(<TradeHistory assetId={''} />);
    expect(screen.getByTestId('trade-history')).toBeInTheDocument();
  });

  it('should render No trades to display if no asset is provided', () => {
    render(<TradeHistory assetId={''} />);
    expect(screen.getByText('No trades to display')).toBeInTheDocument();
  });

  it('should render 3 items from trade history', () => {
    vi.spyOn(store, 'useStore').mockReturnValueOnce({
      getTradeHistory: () => [
        {
          type: 'buy',
          buyAmount: '0.1',
          assetBought: 'BTC',
          sellAmount: '2500',
          assetSold: 'EUR',
          timestamp: 1700000000,
        },
        {
          type: 'sell',
          buyAmount: '0.1',
          assetBought: 'BTC',
          sellAmount: '2500',
          assetSold: 'EUR',
          timestamp: 1700000001,
        },
        {
          type: 'buy',
          buyAmount: '0.1',
          assetBought: 'BTC',
          sellAmount: '2500',
          assetSold: 'EUR',
          timestamp: 1700000002,
        },
      ],
    });

    render(<TradeHistory assetId={'BTC'} />);
    expect(screen.queryByText('No trades to display')).toBeNull();

    const container = screen.getByTestId('trade-history');
    expect(container.children).toHaveLength(3);
  });
});
