import { curry } from '@fxts/core';
import { HttpException, HttpStatus } from '@nestjs/common';

export const executeOrThrowHttpError = curry(
  async (func: Function, ErrMsg: string, key: string, inputs: any) => {
    try {
      const result = await func(key, inputs);
      if (result) {
        return result;
      } else {
        throw new HttpException(ErrMsg, HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw e;
    }
  },
);

export const executeAndThrowHttpError = curry(
  async (func: Function, ErrMsg: string, key: string, inputs: any) => {
    try {
      const result = !(await func(key, inputs));
      if (result) {
        return result;
      } else {
        throw new HttpException(ErrMsg, HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw e;
    }
  },
);
