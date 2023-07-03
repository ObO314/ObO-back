import { curry } from '@fxts/core';
import { HttpException, HttpStatus } from '@nestjs/common';
import { isPromise } from 'util/types';

export const Ok = <T>(value: T) => {
  return { ok: true, value: value };
};

export const Err = <E>(error: E) => {
  return { ok: false, error: error };
};

// filter 처럼 확인 후, 받은 값을 그대로 넘기는 함수
export const check = curry(
  async (func: Function, errorMessage: string, params) => {
    let result = await func(params);
    return !result
      ? Ok(params)
      : Err(new HttpException(errorMessage, HttpStatus.BAD_REQUEST));
  },
);

// 확인 후 결과값을 반환하는 함수
export const ensure = curry(
  async (func: Function, errorMessage: string, params) => {
    let result = await func(params);
    return result
      ? Ok(result)
      : Err(new HttpException(errorMessage, HttpStatus.BAD_REQUEST));
  },
);

export const handleResult = curry(async (func, resultOrError) => {
  if (!resultOrError.ok) {
    return resultOrError;
  } else {
    return await func(resultOrError.value);
  }
});

export const finalResult = curry(async (resultOrError) => {
  if (!resultOrError.ok) {
    return resultOrError.error;
  } else {
    return resultOrError.value;
  }
});
