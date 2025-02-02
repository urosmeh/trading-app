import { useState } from 'react';
import useDebounce from '../../hooks/useDebounce.ts';
import SearchCoins from '../../components/SearchCoins/SearchCoins.tsx';
import AssetList from '../../components/AssetList/AssetList.tsx';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  return (
    <div>
      <p>Search for a coin to trade (i.e ethereum)</p>
      <SearchCoins search={search} setSearch={setSearch} />
      <AssetList search={debouncedSearch} />
    </div>
  );
};

export default HomePage;
