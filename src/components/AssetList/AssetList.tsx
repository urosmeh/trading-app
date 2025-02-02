import { useGetAssets } from '../../api/hooks';

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

  return <div>{data?.map((asset) => <p key={asset.id}>{asset.name}</p>)}</div>;
};

export default AssetList;
