import SearchCoins from '@/components/SearchCoins/SearchCoins.tsx';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

describe('SearchCoins component tests', () => {
  it('should render input paragraph and input', () => {
    const setSearchMock = vi.fn();
    render(<SearchCoins search={''} setSearch={setSearchMock} />);
    expect(screen.getByTestId('search-coins')).toBeInTheDocument();
  });

  it('should correctly show input', () => {
    const search = 'bitcoin';
    const setSearchMock = vi.fn();

    render(<SearchCoins search={search} setSearch={setSearchMock} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('bitcoin');
  });

  it('should call setSearch on input change', () => {
    const setSearchMock = vi.fn();
    render(<SearchCoins search={''} setSearch={setSearchMock} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'ethereum' } });
    expect(setSearchMock).toHaveBeenCalledTimes(1);
    expect(setSearchMock).toHaveBeenCalledWith('ethereum');
  });
});
