import type { Infer } from 'superstruct';
import {
  record,
  array,
  union,
  string,
  number,
  object,
  literal,
} from 'superstruct';

import { CaipChainIdStruct, CaipAssetTypeStruct } from './caip-types';

export const AmountStruct = object({});

const CommonHeader = {
  jsonrpc: literal('2.0'),
  id: union([string(), number(), literal(null)]),
};

// ----------------------------------------------------------------------------
// Get balances

export const GetBalancesRequestStruct = object({
  ...CommonHeader,
  method: literal('chain_getBalances'),
  params: object({
    scope: CaipChainIdStruct,
    accounts: array(string()),
    assets: array(CaipAssetTypeStruct),
  }),
});

export type GetBalancesRequest = Infer<typeof GetBalancesRequestStruct>;

export const GetBalancesResponseStruct = object({
  balances: record(string(), record(CaipAssetTypeStruct, AmountStruct)),
});

export type GetBalancesResponse = Infer<typeof GetBalancesResponseStruct>;
