# chubbyts-throwable-to-error

[![CI](https://github.com/chubbyts/chubbyts-throwable-to-error/workflows/CI/badge.svg?branch=master)](https://github.com/chubbyts/chubbyts-throwable-to-error/actions?query=workflow%3ACI)
[![Coverage Status](https://coveralls.io/repos/github/chubbyts/chubbyts-throwable-to-error/badge.svg?branch=master)](https://coveralls.io/github/chubbyts/chubbyts-throwable-to-error?branch=master)
[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fchubbyts%2Fchubbyts-throwable-to-error%2Fmaster)](https://dashboard.stryker-mutator.io/reports/github.com/chubbyts/chubbyts-throwable-to-error/master)
[![npm-version](https://img.shields.io/npm/v/@chubbyts/chubbyts-throwable-to-error.svg)](https://www.npmjs.com/package/@chubbyts/chubbyts-throwable-to-error)

[![bugs](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-throwable-to-error&metric=bugs)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-throwable-to-error)
[![code_smells](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-throwable-to-error&metric=code_smells)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-throwable-to-error)
[![coverage](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-throwable-to-error&metric=coverage)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-throwable-to-error)
[![duplicated_lines_density](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-throwable-to-error&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-throwable-to-error)
[![ncloc](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-throwable-to-error&metric=ncloc)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-throwable-to-error)
[![sqale_rating](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-throwable-to-error&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-throwable-to-error)
[![alert_status](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-throwable-to-error&metric=alert_status)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-throwable-to-error)
[![reliability_rating](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-throwable-to-error&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-throwable-to-error)
[![security_rating](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-throwable-to-error&metric=security_rating)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-throwable-to-error)
[![sqale_index](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-throwable-to-error&metric=sqale_index)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-throwable-to-error)
[![vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-throwable-to-error&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-throwable-to-error)

## Description

It converts any throwable into an Error.

## Requirements

 * node: 18

## Installation

Through [NPM](https://www.npmjs.com) as [@chubbyts/chubbyts-throwable-to-error][1].

```ts
npm i @chubbyts/chubbyts-throwable-to-error@^2.0.2
```

## Usage

```ts
import { throwableToError } from '@chubbyts/chubbyts-throwable-to-error/dist/throwable-to-error';

try {
   throw {key: 'value'};
} catch (e) {
  const error = throwableToError(e);
}
```

## Copyright

2025 Dominik Zogg

[1]: https://www.npmjs.com/package/@chubbyts/chubbyts-throwable-to-error
