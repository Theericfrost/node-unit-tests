import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 2, b: 1, action: Action.Subtract, expected: 1 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 2, b: 2, action: 'Action.Exponentiate', expected: null },
  { a: 2, b: 2, action: undefined, expected: null },
  { a: 2, b: null, action: Action.Exponentiate, expected: null },
  { a: undefined, b: null, action: Action.Exponentiate, expected: null },
  { a: undefined, b: 1, action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  testCases.forEach(({ a, b, action, expected }) => {
    test(`return ${expected} when given ${a} and ${b} for ${action} operation`, () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });
  });
});
