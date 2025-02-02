import { useGetAssets } from '../../api/hooks';
import { NavLink } from 'react-router';
import { AppRoutes } from '../../constants/appRoutes.ts';
import { Fragment } from 'react';

type AssetListProps = {
  search: string;
};

const AssetList = ({ search }: AssetListProps) => {
  const { data, isLoading, error } = useGetAssets(search);

  if (!search) return null;

  if (isLoading) {
    return <div>loading..</div>;
  }

  if (error) {
    return <div>Theres been an error</div>;
  }

  return (
    <div>
      {data?.map((asset) => (
        <Fragment key={asset.id}>
          <NavLink key={asset.id} to={`${AppRoutes.ASSETS}/${asset.id}`}>
            {asset.name}
          </NavLink>{' '}
          <br />
        </Fragment>
      ))}
    </div>
  );
};

export default AssetList;
