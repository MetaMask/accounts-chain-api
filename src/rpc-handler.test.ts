import type { JsonRpcRequest } from './JsonRpcRequest';
import {
  ChainRpcMethod,
  isChainRpcMethod,
  MethodNotSupportedError,
  handleChainRequest,
} from './rpc-handler';

describe('rpc-handler', () => {
  const chain = {
    getBalances: jest.fn(),
  };

  const params = {
    scope: 'bip122:000000000019d6689c085ae165831e93',
    accounts: [
      'bc1qrp0yzgkf8rawkuvdlhnjfj2fnjwm0m8727kgah',
      'bc1qf5n2h6mgelkls4497pkpemew55xpew90td2qae',
    ],
    assets: [
      'bip122:000000000019d6689c085ae165831e93/asset:0',
      'bip122:000000000019d6689c085ae165831e93/asset:1',
      'bip122:000000000019d6689c085ae165831e93/asset:2',
      'bip122:000000000019d6689c085ae165831e93/asset:3',
      'bip122:000000000019d6689c085ae165831e93/asset:4',
    ],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call chain_getBalances', async () => {
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: '7c507ff0-365f-4de0-8cd5-eb83c30ebda4',
      method: 'chain_getBalances',
      params,
    };

    chain.getBalances.mockResolvedValue('GetBalances result');
    const result = await handleChainRequest(chain, request);

    expect(chain.getBalances).toHaveBeenCalled();
    expect(result).toBe('GetBalances result');
  });

  it('should fail to call chainRpcDispatcher with a non-JSON-RPC request', async () => {
    const request = {
      jsonrpc: '2.0',
      id: '7c507ff0-365f-4de0-8cd5-eb83c30ebda4',
      // Missing method name.
    };

    await expect(
      handleChainRequest(chain, request as unknown as JsonRpcRequest),
    ).rejects.toThrow(
      'At path: method -- Expected a string, but received: undefined',
    );
  });

  it('calls the chain with a number request ID', async () => {
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: 1,
      method: 'chain_getBalances',
      params,
    };

    chain.getBalances.mockResolvedValue([]);
    expect(await handleChainRequest(chain, request)).toStrictEqual([]);
  });

  it('calls the chain with a null request ID', async () => {
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: null,
      method: 'chain_getBalances',
      params,
    };

    chain.getBalances.mockResolvedValue([]);
    expect(await handleChainRequest(chain, request)).toStrictEqual([]);
  });

  it('fails to call the chain with a boolean request ID', async () => {
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: true as any,
      method: 'chain_getBalances',
    };

    chain.getBalances.mockResolvedValue([]);
    await expect(handleChainRequest(chain, request)).rejects.toThrow(
      'At path: id -- Expected the value to satisfy a union of `string | number | literal`, but received: true',
    );
  });

  it('should throw MethodNotSupportedError for an unknown method', async () => {
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: '7c507ff0-365f-4de0-8cd5-eb83c30ebda4',
      method: 'unknown_method',
      params,
    };

    await expect(handleChainRequest(chain, request)).rejects.toThrow(
      MethodNotSupportedError,
    );
  });
});

describe('isChainRequestMethod', () => {
  it.each([
    [`${ChainRpcMethod.GetBalances}`, true],
    [`chain_invalid`, false],
  ])(`%s should be %s`, (method, expected) => {
    expect(isChainRpcMethod(method)).toBe(expected);
  });
});
