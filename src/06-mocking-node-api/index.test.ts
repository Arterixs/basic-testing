// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { Buffer } from 'node:buffer';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

const callback = jest.fn();

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 2000);
    expect(setTimeout).toHaveBeenCalledWith(callback, 2000);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, 2000);

    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(2000);
    expect(callback).toBeCalled();
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
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 2000);
    expect(setInterval).toHaveBeenLastCalledWith(callback, 2000);
    jest.clearAllTimers();
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 2000);
    jest.advanceTimersByTime(6000);
    expect(callback).toHaveBeenCalledTimes(3);
    jest.clearAllTimers();
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const join = jest.spyOn(path, 'join');

    await readFileAsynchronously('/abracadabra');
    expect(join).toHaveBeenLastCalledWith(__dirname, '/abracadabra');
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const result = await readFileAsynchronously('/abracadabra');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const contentFile = Buffer.from("I'm is content file");
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue(contentFile);

    const result = await readFileAsynchronously('/abracadabra');
    expect(result).toMatch(/^I'm is content file$/);
  });
});
