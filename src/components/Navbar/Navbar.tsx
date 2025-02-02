import classes from './Navbar.module.css';
import { memo } from 'react';

const Navbar = () => {
  return (
    <nav className={classes.navbar}>
      <div>
        <img src={'/logo.png'} alt={'logo'} width={52} height={52} />
      </div>
      <div className={classes.funds}>
        <p>Available</p>
        <p>100 BTC</p>
        <p>224,01 €</p>
      </div>
    </nav>
  );
};

export default memo(Navbar);
