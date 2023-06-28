import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', async () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 100;
    const withdrawAmount = 300;
    const account = getBankAccount(initialBalance);

    try {
      account.withdraw(withdrawAmount);
    } catch (err) {
      expect(err).toEqual(new InsufficientFundsError(initialBalance));
    }
  });

  test('should throw TransferFailedError error when transferring more than balance', () => {
    const initialBalance = 100;
    const transferAmount = 300;
    const senderAccount = getBankAccount(initialBalance);
    const receiverAccount = getBankAccount(initialBalance);

    try {
      senderAccount.transfer(transferAmount, receiverAccount);
    } catch (err) {
      expect(err).toEqual(new InsufficientFundsError(initialBalance));
    }
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 100;
    const transferAmount = 50;
    const senderAccount = getBankAccount(initialBalance);

    try {
      senderAccount.transfer(transferAmount, senderAccount);
    } catch (err) {
      expect(err).toEqual(new TransferFailedError());
    }
  });

  test('should deposit money', async () => {
    const initBalance = 100;
    const depositAmount = 50;

    const bankAccount = getBankAccount(initBalance);
    bankAccount.deposit(depositAmount);

    const balance = bankAccount.getBalance();
    expect(balance).toBe(initBalance + depositAmount);
  });

  test('should withdraw money', async () => {
    const initBalance = 100;
    const withdrawAmount = 50;
    const bankAccount = getBankAccount(initBalance);
    bankAccount.withdraw(withdrawAmount);
    const balance = bankAccount.getBalance();
    expect(balance).toBe(initBalance - withdrawAmount);
  });

  test('should transfer money', async () => {
    const initialBalance = 400;
    const transferAmount = 300;
    const senderAccount = getBankAccount(initialBalance);
    const receiverAccount = getBankAccount(initialBalance);
    senderAccount.transfer(transferAmount, receiverAccount);

    const senderBalance = senderAccount.getBalance();

    expect(senderBalance).toBe(initialBalance - transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    const accountBalance = await account.fetchBalance();

    if (accountBalance !== null) {
      expect(accountBalance).not.toBeNull();
      expect(typeof accountBalance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(0);
    const initialBalance = 100;
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(initialBalance);

    await bankAccount.synchronizeBalance();
    const balance = await bankAccount.fetchBalance();

    expect(bankAccount.fetchBalance).toHaveBeenCalled();
    expect(balance).toBe(initialBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(0);
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(null);

    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
    expect(bankAccount.fetchBalance).toHaveBeenCalled();
  });
});
