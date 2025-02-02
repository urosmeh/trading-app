import { NavLink, useParams } from 'react-router';
import { AppRoutes } from '../../constants/appRoutes.ts';
import AssetDetails from '../../components/AssetDetails/AssetDetails.tsx';
import PageContainer from '../../components/PageContainer/PageContainer.tsx';

const AssetPage = () => {
  const { assetId } = useParams();

  if (!assetId)
    return (
      <PageContainer>
        No asset id provided. <NavLink to={AppRoutes.HOME}>Back home</NavLink>
      </PageContainer>
    );

  return (
    <PageContainer>
      <AssetDetails assetId={assetId} />
    </PageContainer>
  );
};

export default AssetPage;
