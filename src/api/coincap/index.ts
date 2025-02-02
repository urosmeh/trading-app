import { ApiRoutes } from '../../constants/apiRoutes.ts';
import { AssetList, CoincapResponse } from '../../models/coincap.ts';

const apiUrl =
  import.meta.env.VITE_COINCAP_API_URL || 'https://api.coincap.io/v2';

export const getAssets = async (search: string) => {
  const response = await fetch(
    `${apiUrl}${ApiRoutes.ASSETS}?` + new URLSearchParams({ search }).toString()
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const result = (await response.json()) as CoincapResponse<AssetList>;

  return result.data;
};
