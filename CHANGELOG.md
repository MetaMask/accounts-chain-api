# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0]

### Changed

- Bump `@metamask/utils` from `^8.4.0` to `^9.0.0`. ([#5](https://github.com/MetaMask/accounts-chain-api/pull/5))

### Fixed

- Replace `superstruct` with ESM-compatible `@metamask/superstruct` `^3.1.0`. ([#5](https://github.com/MetaMask/accounts-chain-api/pull/5))
  - This fixes the issue of this package being unusable by any TypeScript project that uses `Node16` or `NodeNext` as its `moduleResolution` option.

## [0.0.1]

### Added

- Add `chain_getBalances` method ([#1](https://github.com/MetaMask/chain-api/pull/1))

[Unreleased]: https://github.com/MetaMask/chain-api/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/MetaMask/chain-api/compare/v0.0.1...v0.1.0
[0.0.1]: https://github.com/MetaMask/chain-api/releases/tag/v0.0.1
