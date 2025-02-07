import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import ErrorRetry from '@/components/ErrorRetry/ErrorRetry.tsx';

afterEach(() => {
  cleanup();
});

describe('ErrorRetry component tests', () => {
  it('should render correctly', () => {
    render(<ErrorRetry refetch={vi.fn()} />);
    expect(screen.queryByTestId('error-retry')).toBeInTheDocument();
  });

  it('should call refetch on click', () => {
    const refetchMock = vi.fn();
    render(<ErrorRetry refetch={refetchMock} />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(refetchMock).toHaveBeenCalled();
  });

  it('should render text if passed', () => {
    const refetchMock = vi.fn();
    render(<ErrorRetry refetch={refetchMock} text={'test text'} />);
    const text = screen.getByText('test text');

    expect(text).toBeInTheDocument();
  });
});
