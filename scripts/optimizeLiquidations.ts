import { Account } from "../graphql/generated";

export const optimizeLiquidations = (accounts: Account[]) => {
  const currentTarget = accounts.reduce((prev, current) => {
    return prev.totalBorrowValueInUSD > current.totalBorrowValueInUSD ? prev : current;
  });

  let nextTarget: Account;
  if (accounts.filter((account) => account.id !== currentTarget.id).length > 0) {
    nextTarget = optimizeLiquidations(accounts.filter((account) => account !== currentTarget));
  } else {
    return currentTarget;
  }

  if (liquidationValueOfAccount(currentTarget) > liquidationValueOfAccount(nextTarget)) {
    return currentTarget;
  } else {
    return nextTarget;
  }
};

const liquidationValueOfAccount = (account: Account) => {
  const collateraltoken = account.tokens.reduce((prev, current) => {
    return prev.supplyBalanceUnderlying > current.supplyBalanceUnderlying && prev.enteredMarket ? prev : current;
  });

  const liquidatedtoken = account.tokens.reduce((prev, current) => {
    return prev.borrowBalanceUnderlying > current.borrowBalanceUnderlying ? prev : current;
  });

  return Math.min(liquidatedtoken.borrowBalanceUnderlying / 2, collateraltoken.supplyBalanceUnderlying);
};
