import type {
  CaipChainId,
  CaipNamespace,
  CaipReference,
} from '@metamask/utils';
import {
  CaipChainIdStruct,
  CaipNamespaceStruct,
  CaipReferenceStruct,
} from '@metamask/utils';
import type { Infer } from 'superstruct';
import { string, pattern } from 'superstruct';

// TODO: Move this to @metamask/utils
export const CAIP_ASSET_NAMESPACE_REGEX = /^[-a-z0-9]{3,8}$/u;
export const CAIP_ASSET_REFERENCE_REGEX = /^[-.%a-zA-Z0-9]{1,128}$/u;
export const CAIP_ASSET_TYPE_REGEX =
  /^(?<chainId>(?<namespace>[-a-z0-9]{3,8}):(?<reference>[-_a-zA-Z0-9]{1,32}))\/(?<assetNamespace>[-a-z0-9]{3,8}):(?<assetReference>[-.%a-zA-Z0-9]{1,128})$/u;

/**
 * A CAIP-19 asset type identifier, i.e., a human-readable type of asset identifier.
 */
export const CaipAssetTypeStruct = pattern(string(), CAIP_ASSET_TYPE_REGEX);
export type CaipAssetType = Infer<typeof CaipAssetTypeStruct>;

export { CaipChainIdStruct, CaipNamespaceStruct, CaipReferenceStruct };

export type { CaipChainId, CaipNamespace, CaipReference };
