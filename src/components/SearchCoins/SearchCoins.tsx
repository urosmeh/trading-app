import { Dispatch, SetStateAction } from 'react';
import classes from './SearchCoins.module.css';

type SearchCoinsProps = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

const SearchCoins = ({ search, setSearch }: SearchCoinsProps) => {
  return (
    <div className={classes.container} data-testid={'search-coins'}>
      <p>Search for a coin to trade (i.e ethereum)</p>

      <input
        className={classes.input}
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchCoins;
