import { Dispatch, SetStateAction } from 'react';

type SearchCoinsProps = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

const SearchCoins = ({ search, setSearch }: SearchCoinsProps) => {
  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchCoins;
