import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timeoutSpy = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    const timeout = 5000;
    doStuffByTimeout(callback, timeout);
    expect(timeoutSpy).toHaveBeenLastCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 5000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);

    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const intervalSpy = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    const interval = 5000;

    doStuffByInterval(callback, interval);
    expect(intervalSpy).toHaveBeenLastCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const timeout = 5000;

    doStuffByInterval(callback, timeout);

    jest.advanceTimersByTime(timeout * 2);

    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'testFile.txt';
    const spyJoin = jest.spyOn(path, 'join');

    await readFileAsynchronously(pathToFile);

    expect(spyJoin).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'path/toNonExistfile.txt';
    const expected = null;

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toEqual(expected);
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'file.txt';
    const expected = 'hello, world!';

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toEqual(expected);
  });
});
