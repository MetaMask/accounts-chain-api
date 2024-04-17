import type { Json, JsonRpcRequest } from '@metamask/utils';
import { assert } from 'superstruct';

import type { Chain } from './api';
import type { CaipAssetType, CaipChainId } from './caip-types';
import { JsonRpcRequestStruct } from './JsonRpcRequest';
import { GetBalancesRequestStruct } from './rpc-types';

/**
 * Chain RPC methods.
 */
export enum ChainRpcMethod {
  GetBalances = 'chain_getBalances',
}

/**
 * Error thrown when a keyring JSON-RPC method is not supported.
 */
export declare class MethodNotSupportedError extends Error {
  constructor(method: string);
}

/**
 * Handles a chain JSON-RPC request.
 *
 * @param chain - Chain instance.
 * @param request - Chain JSON-RPC request.
 * @returns A promise that resolves to the chain's method response.
 */
export async function handleChainRequest(
  chain: Chain,
  request: JsonRpcRequest,
): Promise<Json | void> {
  // We first have to make sure that the request is a valid JSON-RPC request so
  // we can check its method name.
  assert(request, JsonRpcRequestStruct);

  switch (request.method) {
    case ChainRpcMethod.GetBalances: {
      assert(request, GetBalancesRequestStruct);

      return chain.getBalances(
        request.params.scope as CaipChainId,
        request.params.accounts,
        request.params.assets as CaipAssetType[],
      );
    }

    default:
      throw new MethodNotSupportedError(
        `Method not supported: ${request.method}`,
      );
  }
}

/**
 * Check if a method is a chain RPC method.
 *
 * @param method - Method to check.
 * @returns Whether the method is a chain RPC method.
 */
export function isChainRpcMethod(method: string): boolean {
  return Object.values(ChainRpcMethod).includes(method as ChainRpcMethod);
}
