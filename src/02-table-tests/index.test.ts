// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  {
    a: 1,
    b: 2,
    action: Action.Add,
    expected: 3,
    name: 'should add two numbers',
  },
  {
    a: 2,
    b: 2,
    action: Action.Add,
    expected: 4,
    name: 'should add two numbers',
  },
  {
    a: 3,
    b: 2,
    action: Action.Add,
    expected: 5,
    name: 'should add two numbers',
  },
  {
    a: 1,
    b: 2,
    action: Action.Subtract,
    expected: -1,
    name: 'should subtract two numbers',
  },
  {
    a: 2,
    b: 2,
    action: Action.Subtract,
    expected: 0,
    name: 'should subtract two numbers',
  },
  {
    a: 3,
    b: 2,
    action: Action.Subtract,
    expected: 1,
    name: 'should subtract two numbers',
  },
  {
    a: 1,
    b: 2,
    action: Action.Multiply,
    expected: 2,
    name: 'should multiply two numbers',
  },
  {
    a: 2,
    b: 2,
    action: Action.Multiply,
    expected: 4,
    name: 'should multiply two numbers',
  },
  {
    a: 3,
    b: 2,
    action: Action.Multiply,
    expected: 6,
    name: 'should multiply two numbers',
  },
  {
    a: 1,
    b: 2,
    action: Action.Divide,
    expected: 0.5,
    name: 'should divide two numbers',
  },
  {
    a: 2,
    b: 2,
    action: Action.Divide,
    expected: 1,
    name: 'should divide two numbers',
  },
  {
    a: 3,
    b: 2,
    action: Action.Divide,
    expected: 1.5,
    name: 'should divide two numbers',
  },
  {
    a: 1,
    b: 2,
    action: Action.Exponentiate,
    expected: 1,
    name: 'should exponentiate two numbers',
  },
  {
    a: 2,
    b: 2,
    action: Action.Exponentiate,
    expected: 4,
    name: 'should exponentiate two numbers',
  },
  {
    a: 3,
    b: 2,
    action: Action.Exponentiate,
    expected: 9,
    name: 'should exponentiate two numbers',
  },
  {
    a: 1,
    b: 2,
    action: 'action',
    expected: null,
    name: 'should return null for invalid action',
  },
  {
    a: 2,
    b: '2',
    action: Action.Exponentiate,
    expected: null,
    name: 'should return null for invalid arguments',
  },
  {
    a: '2',
    b: 2,
    action: Action.Exponentiate,
    expected: null,
    name: 'should return null for invalid arguments',
  },
];

// This test case is just to run this test suite, remove it when you write your own tests
describe.each(testCases)(
  'simpleCalculator',
  ({ a, b, action, expected, name }) => {
    test(`${name}: return ${expected}`, () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });
  },
);
