// Uncomment the code below and write your tests
import {
  getBankAccount,
  TransferFailedError,
  SynchronizationFailedError,
  InsufficientFundsError,
} from '.';

describe('BankAccount', () => {
  const user1 = getBankAccount(500);
  const user2 = getBankAccount(2500);

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('should create account with initial balance', () => {
    expect(user1.getBalance()).toBe(500);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => user1.withdraw(1000)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => user1.transfer(1000, user2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => user1.transfer(1000, user1)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    user1.deposit(500);
    expect(user1.getBalance()).toBe(1000);
  });

  test('should withdraw money', () => {
    user1.withdraw(350);
    expect(user1.getBalance()).toBe(650);
  });

  test('should transfer money', () => {
    user2.transfer(300, user1);
    expect(user1.getBalance()).toBe(950);
    expect(user2.getBalance()).toBe(2200);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const randomNumber = Math.floor(Math.random() * 100);
    jest.spyOn(user1, 'fetchBalance').mockResolvedValue(randomNumber);

    const result = await user1.fetchBalance();
    const typeResult = typeof result;

    expect(typeResult).toMatch(/number/);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const oldBalance = user1.getBalance();
    const randomNumber = Math.floor(Math.random() * 100);
    jest.spyOn(user1, 'fetchBalance').mockResolvedValue(randomNumber);

    await user1.synchronizeBalance();

    const newBalance = user1.getBalance();
    const isDifferentBalance = oldBalance === newBalance;

    expect(newBalance).toBe(randomNumber);
    expect(isDifferentBalance).toBe(false);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(user1, 'fetchBalance').mockResolvedValue(null);

    await expect(user1.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
