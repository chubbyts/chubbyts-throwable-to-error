import { describe, expect, test } from 'vitest';
import { throwableToError } from '../src/throwable-to-error';

describe('throwableToError', () => {
  test('do not convert', () => {
    const error = new Error('example');
    expect(throwableToError(error)).toBe(error);
  });

  test.each([
    { e: undefined, error: { name: 'undefined', message: 'undefined' } },
    { e: null, error: { name: 'null', message: 'null' } },
    { e: true, error: { name: 'boolean', message: 'true' } },
    { e: false, error: { name: 'boolean', message: 'false' } },
    { e: 42, error: { name: 'number', message: '42' } },
    { e: Math.PI, error: { name: 'number', message: Math.PI.toString() } },
    { e: 'example', error: { name: 'string', message: 'example' } },
    {
      e: Symbol('example'),
      error: { name: 'symbol', message: 'Symbol(example)' },
    },
    { e: () => null, error: { name: 'function', message: '() => null' } },
    {
      e: { key: 'value' },
      error: { name: 'object', message: '{"key":"value"}' },
    },
    {
      e: ['example'],
      error: { name: 'object', message: '["example"]' },
    },
  ])('converts $e to error', ({ e, error }) => {
    expect(throwableToError(e)).toMatchObject(error);
  });

  test('converts an object with circular reference to error', () => {
    const e: { self?: unknown } = {};
    // oxlint-disable-next-line functional/immutable-data
    e.self = e;

    expect(throwableToError(e)).toMatchObject({ name: 'object', message: '[unserializable]' });
  });

  test('converts an object with throwing toJSON to error', () => {
    const e = {
      toJSON: () => {
        throw new Error('toJSON failed');
      },
    };

    expect(throwableToError(e)).toMatchObject({ name: 'object', message: '[unserializable]' });
  });

  test('converts an object with throwing getter to error', () => {
    const e = {
      get key(): string {
        throw new Error('getter failed');
      },
    };

    expect(throwableToError(e)).toMatchObject({ name: 'object', message: '[unserializable]' });
  });

  test('converts a value with throwing toString to error', () => {
    // oxlint-disable-next-line unicorn/consistent-function-scoping
    const e = () => null;
    // oxlint-disable-next-line functional/immutable-data
    e.toString = () => {
      throw new Error('toString failed');
    };

    expect(throwableToError(e)).toMatchObject({ name: 'function', message: '[unserializable]' });
  });

  test('converts an object whose toJSON returns undefined to error', () => {
    const e = { toJSON: () => undefined };

    expect(throwableToError(e)).toMatchObject({ name: 'object', message: '[unserializable]' });
  });

  test('does not truncate a message with exactly the max length', () => {
    const e = 'A'.repeat(2048);

    expect(throwableToError(e).message).toBe(e);
  });

  test('truncates an oversized message', () => {
    const e = { key: 'A'.repeat(10000) };

    const error = throwableToError(e);

    expect(error.message).toHaveLength(2048 + 3);
    expect(error.message.endsWith('...')).toBe(true);
  });
});
