import classes from './Navbar.module.css';
import { memo } from 'react';
import useStore from '../../stores/useStore.ts';

const Navbar = () => {
  const { funds } = useStore();

  return (
    <nav className={classes.navbar}>
      <div>
        <img src={'/logo.png'} alt={'logo'} width={52} height={52} />
      </div>
      <div className={classes.funds}>
        <p>Available</p>
        <p>{funds.btc} BTC</p>
        <p>{funds.fiat}</p>
      </div>
    </nav>
  );
};

export default memo(Navbar);
