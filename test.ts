import { find, pipe, toAsync } from '@fxts/core';

const numbers = function* () {
  yield 1;
  yield 2;
  yield 3;
};

const asyncNumbers = async function* () {
  yield 1;
  yield 2;
  yield 3;
};

find((num) => num === 2, numbers()); // 2
find((num) => num === 2, asyncNumbers()); // Promise<2>

const promiseNumbers = function* () {
  yield Promise.resolve(1);
  yield Promise.resolve(2);
  yield Promise.resolve(3);
};

// find((num) => Promise.resolve(num === 2), numbers()); // not work
// find((num) => num === 2, promiseNumbers()); // not work

async function test() {
  await pipe(
    numbers(), // Iterable<number>
    toAsync, // AsyncIterable<number>
    find((num) => Promise.resolve(num === 2)),
    console.log,
  );

  await pipe(
    promiseNumbers(), // Iterable<Promise<number>>
    toAsync, // AsyncIterable<number>
    find((num) => num === 2),
    console.log,
  );
}

test();
