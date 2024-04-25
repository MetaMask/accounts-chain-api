import type { CaipChainId } from '@metamask/utils';

import type { CaipAssetType } from './caip-types';
import type { BalancesResult } from './types';

export type Chain = {
  getBalances(
    scope: CaipChainId,
    accounts: string[],
    assets: CaipAssetType[],
  ): Promise<BalancesResult>;
};
