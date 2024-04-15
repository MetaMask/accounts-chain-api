import type { CaipChainId, CaipAssetType } from './caip-types';
import type { BalancesResult } from './types';

export type Chain = {
  getBalances(
    scope: CaipChainId,
    accounts: string[],
    assets: CaipAssetType[],
  ): Promise<BalancesResult>;
};
