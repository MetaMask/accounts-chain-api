import type { CaipChainId } from '@metamask/utils';

import type { CaipAssetTypeOrId } from './caip-types';
import type { BalancesResult } from './types';

export type Chain = {
  getBalances(
    scope: CaipChainId,
    accounts: string[],
    assets: CaipAssetTypeOrId[],
  ): Promise<BalancesResult>;
};
