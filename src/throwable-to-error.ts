const MAX_MESSAGE_LENGTH = 2048;

type NonObject = undefined | boolean | number | bigint | string | symbol | (() => unknown);

const truncate = (message: string): string =>
  message.length > MAX_MESSAGE_LENGTH ? `${message.substring(0, MAX_MESSAGE_LENGTH)}...` : message;

const throwableToMessage = (e: unknown): string => {
  try {
    // JSON.stringify / String may invoke user-defined toJSON/toString/getters, which can throw,
    // and JSON.stringify throws on circular references and returns undefined for some inputs.
    if (typeof e === 'object') {
      return JSON.stringify(e) ?? '[unserializable]';
    }

    // Objects (incl. null) are handled above, so only primitives and functions are left,
    // none of which stringify to '[object Object]'. TypeScript can't narrow `unknown` here.
    return String(e as NonObject);
  } catch {
    return '[unserializable]';
  }
};

export const throwableToError = (e: unknown): Error => {
  if (e instanceof Error) {
    return e;
  }

  const error = new Error(truncate(throwableToMessage(e)));
  // oxlint-disable-next-line functional/immutable-data
  error.name = e === null ? 'null' : typeof e;
  // oxlint-disable-next-line functional/immutable-data
  error.stack = undefined;

  return error;
};
