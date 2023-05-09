export const throwableToError = (e: unknown): Error => {
  if (e instanceof Error) {
    return e;
  }

  const error = new Error(typeof e === 'object' ? `${JSON.stringify(e)}` : `${String(e)}`);
  // eslint-disable-next-line functional/immutable-data
  error.name = typeof e;
  // eslint-disable-next-line functional/immutable-data
  error.stack = undefined;

  return error;
};
