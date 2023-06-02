import { curry } from '@fxts/core';

export const executeOrThrowError = curry(
  async (func: Function, ErrMsg: string, input: any, ...args: any) => {
    const result = await func(input, ...args);
    if (input && result) {
      return result;
    } else {
      throw new Error(ErrMsg);
    }
  },
);

export const executeAndThrowError = curry(
  async (func: Function, ErrMsg: string, input: any, ...args: any) => {
    const result = !(await func(input, ...args));
    if (input && result) {
      return result;
    } else {
      throw new Error(ErrMsg);
    }
  },
);
