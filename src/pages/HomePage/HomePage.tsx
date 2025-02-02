import { useState } from 'react';
import useDebounce from '../../hooks/useDebounce.ts';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  return (
    <div>
      <p>Search for a coin to trade (i.e ethereum)</p>
      <p>{debouncedSearch}</p>
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default HomePage;
