import { useState } from 'react';
import useDebounce from '@/hooks/useDebounce.ts';
import SearchCoins from '@/components/SearchCoins/SearchCoins.tsx';
import AssetList from '@/components/AssetList/AssetList.tsx';
import PageContainer from '@/components/PageContainer/PageContainer.tsx';
import classes from './HomePage.module.css';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  return (
    <PageContainer className={classes.homePage}>
      <SearchCoins search={search} setSearch={setSearch} />
      <AssetList search={debouncedSearch} />
    </PageContainer>
  );
};

export default HomePage;
