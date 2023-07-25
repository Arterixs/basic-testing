// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

const DEFAULT_ELEMENT = [1, 2, 3];
const DEFAULT_RESULT = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: null,
        next: null,
      },
    },
  },
};
const SNAPSHOT_EQUAL = {
  value: expect.any(Number),
  next: expect.any(Object),
};

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const result = generateLinkedList(DEFAULT_ELEMENT);
    expect(result).toStrictEqual(DEFAULT_RESULT);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const result = generateLinkedList(DEFAULT_ELEMENT);
    expect(result).toMatchSnapshot(SNAPSHOT_EQUAL);
  });
});
