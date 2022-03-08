import { Account } from "../graphql/generated";

// Returns the most profitable account
// Collateral and borrowed targets needs to be recalculated afterwards
export const optimizeLiquidations = (accounts: Account[]) => {
  // I start with the biggest account in the set
  const currentTarget = accounts.reduce((prev, current) => {
    return prev.totalBorrowValueInUSD > current.totalBorrowValueInUSD ? prev : current;
  });

  // Recursive call from the subset of account
  let nextTarget: Account;
  const accountsubset = accounts.filter((account) => account.id !== currentTarget.id);
  if (accountsubset.length > 0) {
    nextTarget = optimizeLiquidations(accountsubset);
  } else {
    return currentTarget;
  }

  // Separate function to calculate the "value" of an account
  if (liquidationValueOfAccount(currentTarget) > liquidationValueOfAccount(nextTarget)) {
    return currentTarget;
  } else {
    return nextTarget;
  }
};

const liquidationValueOfAccount = (account: Account) => {
  // Biggest collateral position
  const collateraltoken = account.tokens.reduce((prev, current) => {
    return prev.supplyBalanceUnderlying > current.supplyBalanceUnderlying && prev.enteredMarket ? prev : current;
  });
  // Biggest borrowing position
  const liquidatedtoken = account.tokens.reduce((prev, current) => {
    return prev.borrowBalanceUnderlying > current.borrowBalanceUnderlying ? prev : current;
  });

  // If there is enough collateral we repay 50% of the borrowed amount, if not it will be the collateral value
  return Math.min(liquidatedtoken.borrowBalanceUnderlying / 2, collateraltoken.supplyBalanceUnderlying);
};
