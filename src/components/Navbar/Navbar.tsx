import classes from './Navbar.module.css';
import { memo } from 'react';
import useStore from '../../stores/useStore.ts';
import { NavLink, useLocation } from 'react-router';
import { AppRoutes } from '../../constants/appRoutes.ts';

const Navbar = () => {
  const { pathname } = useLocation();
  const { funds } = useStore();
  const assets = Object.keys(funds).filter((k) => k !== 'fiat');

  return (
    <nav className={classes.navbar}>
      <div className={classes.left}>
        <img src={'/logo.png'} alt={'logo'} width={52} height={52} />
        {pathname !== AppRoutes.HOME && (
          <NavLink to={AppRoutes.HOME}>Back to search</NavLink>
        )}
      </div>
      <div className={classes.funds}>
        <p>Available</p>
        <p>{funds.fiat} €</p>
        {assets.map((assetKey) => (
          <p key={assetKey}>
            {funds[assetKey]} {assetKey}
          </p>
        ))}
      </div>
    </nav>
  );
};

export default memo(Navbar);
