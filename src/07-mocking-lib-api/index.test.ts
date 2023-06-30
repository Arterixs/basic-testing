// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const RANDOM_PATH = 'random_path';
const FALSY_DATA = {
  name: 'user',
  age: 24,
};

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const createSpy = jest.spyOn(axios, 'create');
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue({ data: FALSY_DATA });

    await throttledGetDataFromApi(RANDOM_PATH);
    jest.runAllTimers();
    const baseURL = createSpy.mock.lastCall?.[0];
    expect(createSpy).toHaveBeenCalledWith(baseURL);
  });

  test('should perform request to correct provided url', async () => {
    jest.spyOn(axios, 'create');
    const getSpy = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue({ data: FALSY_DATA });

    await throttledGetDataFromApi(RANDOM_PATH);
    jest.runAllTimers();
    expect(getSpy).toHaveBeenCalledWith(RANDOM_PATH);
  });

  test('should return response data', async () => {
    jest.spyOn(axios, 'create');
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue({ data: FALSY_DATA });

    const responseData = await throttledGetDataFromApi(RANDOM_PATH);
    jest.runAllTimers();
    expect(responseData).toEqual(FALSY_DATA);
  });
});
