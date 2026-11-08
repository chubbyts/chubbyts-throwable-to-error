# chubbyts-throwable-to-error

[![CI](https://github.com/chubbyts/chubbyts-throwable-to-error/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/chubbyts/chubbyts-throwable-to-error/actions/workflows/ci.yml)
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

Converts any thrown value into an `Error`.

In JavaScript, `throw` accepts anything: strings, numbers, plain objects, `null`, `undefined`, … That is why TypeScript
types a `catch` variable as `unknown`. `throwableToError` normalizes that value into a real `Error`, so the rest of your
code (logging, error responses, `cause` chains) can rely on `message` and `name` being present.

### Why use it

 * **Type safe**: turns `unknown` into `Error` without unsafe `as Error` casts.
 * **Never throws**: circular references, throwing `toJSON` / `toString` / getters and unserializable values are handled
   and reported as `[unserializable]` instead of crashing your error handler.
 * **Bounded output**: messages longer than 2048 characters are truncated (suffix `...`), so a huge thrown object can't
   flood your logs.
 * **Keeps real errors untouched**: an `Error` (or subclass) is returned as is, the same instance with its original stack.
 * **Tiny**: a single function, no dependencies.

## Requirements

 * node: >= 22

## Installation

Through [NPM](https://www.npmjs.com) as [@chubbyts/chubbyts-throwable-to-error][1].

```sh
npm i @chubbyts/chubbyts-throwable-to-error@^2.4.1
```

## Usage

```ts
import { throwableToError } from '@chubbyts/chubbyts-throwable-to-error/throwable-to-error';

try {
  throw { key: 'value' };
} catch (e) {
  const error = throwableToError(e);

  error.name; // 'object'
  error.message; // '{"key":"value"}'
}
```

## Behavior

| Thrown value                   | `name`                    | `message`                 |
| ------------------------------ | ------------------------- | ------------------------- |
| `new Error('example')`         | unchanged (same instance) | unchanged (same instance) |
| `'example'`                    | `'string'`                | `'example'`               |
| `42`                           | `'number'`                | `'42'`                    |
| `true`                         | `'boolean'`               | `'true'`                  |
| `undefined`                    | `'undefined'`             | `'undefined'`             |
| `null`                         | `'null'`                  | `'null'`                  |
| `Symbol('example')`            | `'symbol'`                | `'Symbol(example)'`       |
| `() => null`                   | `'function'`              | `'() => null'`            |
| `{ key: 'value' }`             | `'object'`                | `'{"key":"value"}'`       |
| `['example']`                  | `'object'`                | `'["example"]'`           |
| object with circular reference | `'object'`                | `'[unserializable]'`      |

 * Objects (and arrays) are serialized with `JSON.stringify`, all other values with `String`.
 * The `name` is the `typeof` of the thrown value (`'null'` for `null`).
 * The `stack` of a converted error is `undefined`: it would only point to `throwableToError` itself, not to the place
   where the value was thrown.

## Copyright

2026 Dominik Zogg

[1]: https://www.npmjs.com/package/@chubbyts/chubbyts-throwable-to-error
