import { useGetAssets } from '@/api/hooks';
import { NavLink } from 'react-router';
import { AppRoutes } from '@/constants/appRoutes.ts';
import { Fragment } from 'react';
import classes from './AssetList.module.css';
import Loading from '@/components/Loading/Loading.tsx';
import ErrorRetry from '@/components/ErrorRetry/ErrorRetry.tsx';

type AssetListProps = {
  search: string;
};

const AssetList = ({ search }: AssetListProps) => {
  const { data, isLoading, error, refetch } = useGetAssets(search);

  if (!search) return null;

  if (isLoading) {
    return <Loading />;
  }

  if (error) return <ErrorRetry refetch={refetch} />;

  if (!data?.length) {
    return <div>No assets found!</div>;
  }

  return (
    <div className={classes.container}>
      {data?.map((asset) => (
        <Fragment key={asset.id}>
          <NavLink key={asset.id} to={`${AppRoutes.ASSETS}/${asset.id}`}>
            {asset.name}
          </NavLink>{' '}
        </Fragment>
      ))}
    </div>
  );
};

export default AssetList;
