// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    __esModule: true,
    ...originalModule,
    mockOne: () => 'foo',
    mockTwo: () => 'bar',
    mockThree: () => 'baz',
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const logSpy = jest.spyOn(console, 'log');
    expect(mockOne()).toMatch(/^foo$/);
    expect(logSpy).not.toHaveBeenCalled();
    expect(mockTwo()).toMatch(/^bar$/);
    expect(logSpy).not.toHaveBeenCalled();
    expect(mockThree()).toMatch(/^baz$/);
    expect(logSpy).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const logSpy = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(logSpy).toHaveBeenCalledWith('I am not mocked');
  });
});
