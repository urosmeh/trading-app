import { NavLink, useParams } from 'react-router';
import { AppRoutes } from '../../constants/appRoutes.ts';
import AssetDetails from '../../components/AssetDetails/AssetDetails.tsx';

const AssetPage = () => {
  const { assetId } = useParams();

  if (!assetId)
    return (
      <div>
        No asset id provided. <NavLink to={AppRoutes.HOME}>Back home</NavLink>
      </div>
    );

  return (
    <div>
      <AssetDetails assetId={assetId} />
    </div>
  );
};

export default AssetPage;
