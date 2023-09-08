import {
  resolveValue,
  throwError,
  MyAwesomeError,
  throwCustomError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const data = await resolveValue('test');
    const data2 = await resolveValue('test2');
    const data3 = await resolveValue(3);

    expect(data).toBeDefined();
    expect(data2).toBeDefined();
    expect(data3).toBeDefined();

    expect(data).toEqual('test');
    expect(data2).toEqual('test2');
    expect(data3).toEqual(3);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    try {
      throwError('invalid url');
    } catch (err) {
      expect(err).toEqual(new Error('invalid url'));
    }
  });

  test('should throw error with default message if message is not provided', () => {
    try {
      throwError();
    } catch (err) {
      expect(err).toEqual(new Error('Oops!'));
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(() => rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
