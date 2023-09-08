import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(3);
    expect(simpleCalculator({ a: 25, b: 20, action: Action.Add })).toBe(45);
  });

  test('should Subtract two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 1, action: Action.Subtract })).toBe(1);
    expect(simpleCalculator({ a: 10, b: 8, action: Action.Subtract })).toBe(2);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Multiply })).toBe(4);
    expect(simpleCalculator({ a: 4, b: 3, action: Action.Multiply })).toBe(12);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 2, action: Action.Divide })).toBe(2);
    expect(simpleCalculator({ a: 10, b: 5, action: Action.Divide })).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Exponentiate })).toBe(
      4,
    );
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate })).toBe(
      8,
    );
    expect(simpleCalculator({ a: 3, b: 3, action: Action.Exponentiate })).toBe(
      27,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: 'Action.test' })).toBe(null);
    expect(simpleCalculator({ a: 2, b: 2, action: undefined })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 2, b: '2', action: Action.Divide })).toBe(
      null,
    );
    expect(simpleCalculator({ a: null, b: '2', action: Action.Divide })).toBe(
      null,
    );
    expect(simpleCalculator({ a: null, b: 2, action: Action.Divide })).toBe(
      null,
    );
  });
});
