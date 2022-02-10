export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

/**
 * Account is an AVAX C-chain address, with a list of all jToken markets the account has
 * participated in, along with liquidation information.
 */
export type Account = {
  __typename?: 'Account';
  countLiquidated: Scalars['Int'];
  countLiquidator: Scalars['Int'];
  hasBorrowed: Scalars['Boolean'];
  health: Scalars['BigDecimal'];
  id: Scalars['ID'];
  tokens: Array<AccountJToken>;
  totalBorrowValueInUSD: Scalars['BigDecimal'];
  totalCollateralValueInUSD: Scalars['BigDecimal'];
};


/**
 * Account is an AVAX C-chain address, with a list of all jToken markets the account has
 * participated in, along with liquidation information.
 */
export type AccountTokensArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AccountJToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AccountJToken_Filter>;
};

/**
 * AccountJToken is a single account within a single jToken market, with data such
 * as interest earned or paid
 */
export type AccountJToken = {
  __typename?: 'AccountJToken';
  account: Account;
  accountBorrowIndex: Scalars['BigDecimal'];
  accrualBlockTimestamp: Scalars['BigInt'];
  borrowBalanceUnderlying: Scalars['BigDecimal'];
  enteredMarket: Scalars['Boolean'];
  /** Concatenation of JToken address and user address */
  id: Scalars['ID'];
  jTokenBalance: Scalars['BigDecimal'];
  lifetimeBorrowInterestAccrued: Scalars['BigDecimal'];
  lifetimeSupplyInterestAccrued: Scalars['BigDecimal'];
  market: Market;
  storedBorrowBalance: Scalars['BigDecimal'];
  supplyBalanceUnderlying: Scalars['BigDecimal'];
  symbol: Scalars['String'];
  totalUnderlyingBorrowed: Scalars['BigDecimal'];
  totalUnderlyingRedeemed: Scalars['BigDecimal'];
  totalUnderlyingRepaid: Scalars['BigDecimal'];
  totalUnderlyingSupplied: Scalars['BigDecimal'];
  transactions: Array<AccountJTokenTransaction>;
};


/**
 * AccountJToken is a single account within a single jToken market, with data such
 * as interest earned or paid
 */
export type AccountJTokenTransactionsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AccountJTokenTransaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AccountJTokenTransaction_Filter>;
};

/** Auxiliary entity for AccountJToken */
export type AccountJTokenTransaction = {
  __typename?: 'AccountJTokenTransaction';
  account: AccountJToken;
  block: Scalars['BigInt'];
  id: Scalars['ID'];
  logIndex: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  tx_hash: Scalars['Bytes'];
};

export type AccountJTokenTransaction_Filter = {
  account?: InputMaybe<Scalars['String']>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_ends_with?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_not?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_ends_with?: InputMaybe<Scalars['String']>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_starts_with?: InputMaybe<Scalars['String']>;
  account_starts_with?: InputMaybe<Scalars['String']>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  logIndex?: InputMaybe<Scalars['BigInt']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tx_hash?: InputMaybe<Scalars['Bytes']>;
  tx_hash_contains?: InputMaybe<Scalars['Bytes']>;
  tx_hash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tx_hash_not?: InputMaybe<Scalars['Bytes']>;
  tx_hash_not_contains?: InputMaybe<Scalars['Bytes']>;
  tx_hash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum AccountJTokenTransaction_OrderBy {
  Account = 'account',
  Block = 'block',
  Id = 'id',
  LogIndex = 'logIndex',
  Timestamp = 'timestamp',
  TxHash = 'tx_hash'
}

export type AccountJToken_Filter = {
  account?: InputMaybe<Scalars['String']>;
  accountBorrowIndex?: InputMaybe<Scalars['BigDecimal']>;
  accountBorrowIndex_gt?: InputMaybe<Scalars['BigDecimal']>;
  accountBorrowIndex_gte?: InputMaybe<Scalars['BigDecimal']>;
  accountBorrowIndex_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  accountBorrowIndex_lt?: InputMaybe<Scalars['BigDecimal']>;
  accountBorrowIndex_lte?: InputMaybe<Scalars['BigDecimal']>;
  accountBorrowIndex_not?: InputMaybe<Scalars['BigDecimal']>;
  accountBorrowIndex_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_ends_with?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_not?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_ends_with?: InputMaybe<Scalars['String']>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_starts_with?: InputMaybe<Scalars['String']>;
  account_starts_with?: InputMaybe<Scalars['String']>;
  accrualBlockTimestamp?: InputMaybe<Scalars['BigInt']>;
  accrualBlockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  accrualBlockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  accrualBlockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  accrualBlockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  accrualBlockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  accrualBlockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  accrualBlockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  borrowBalanceUnderlying?: InputMaybe<Scalars['BigDecimal']>;
  borrowBalanceUnderlying_gt?: InputMaybe<Scalars['BigDecimal']>;
  borrowBalanceUnderlying_gte?: InputMaybe<Scalars['BigDecimal']>;
  borrowBalanceUnderlying_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  borrowBalanceUnderlying_lt?: InputMaybe<Scalars['BigDecimal']>;
  borrowBalanceUnderlying_lte?: InputMaybe<Scalars['BigDecimal']>;
  borrowBalanceUnderlying_not?: InputMaybe<Scalars['BigDecimal']>;
  borrowBalanceUnderlying_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  enteredMarket?: InputMaybe<Scalars['Boolean']>;
  enteredMarket_in?: InputMaybe<Array<Scalars['Boolean']>>;
  enteredMarket_not?: InputMaybe<Scalars['Boolean']>;
  enteredMarket_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  jTokenBalance?: InputMaybe<Scalars['BigDecimal']>;
  jTokenBalance_gt?: InputMaybe<Scalars['BigDecimal']>;
  jTokenBalance_gte?: InputMaybe<Scalars['BigDecimal']>;
  jTokenBalance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  jTokenBalance_lt?: InputMaybe<Scalars['BigDecimal']>;
  jTokenBalance_lte?: InputMaybe<Scalars['BigDecimal']>;
  jTokenBalance_not?: InputMaybe<Scalars['BigDecimal']>;
  jTokenBalance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  lifetimeBorrowInterestAccrued?: InputMaybe<Scalars['BigDecimal']>;
  lifetimeBorrowInterestAccrued_gt?: InputMaybe<Scalars['BigDecimal']>;
  lifetimeBorrowInterestAccrued_gte?: InputMaybe<Scalars['BigDecimal']>;
  lifetimeBorrowInterestAccrued_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  lifetimeBorrowInterestAccrued_lt?: InputMaybe<Scalars['BigDecimal']>;
  lifetimeBorrowInterestAccrued_lte?: InputMaybe<Scalars['BigDecimal']>;
  lifetimeBorrowInterestAccrued_not?: InputMaybe<Scalars['BigDecimal']>;
  lifetimeBorrowInterestAccrued_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  lifetimeSupplyInterestAccrued?: InputMaybe<Scalars['BigDecimal']>;
  lifetimeSupplyInterestAccrued_gt?: InputMaybe<Scalars['BigDecimal']>;
  lifetimeSupplyInterestAccrued_gte?: InputMaybe<Scalars['BigDecimal']>;
  lifetimeSupplyInterestAccrued_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  lifetimeSupplyInterestAccrued_lt?: InputMaybe<Scalars['BigDecimal']>;
  lifetimeSupplyInterestAccrued_lte?: InputMaybe<Scalars['BigDecimal']>;
  lifetimeSupplyInterestAccrued_not?: InputMaybe<Scalars['BigDecimal']>;
  lifetimeSupplyInterestAccrued_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  market?: InputMaybe<Scalars['String']>;
  market_contains?: InputMaybe<Scalars['String']>;
  market_ends_with?: InputMaybe<Scalars['String']>;
  market_gt?: InputMaybe<Scalars['String']>;
  market_gte?: InputMaybe<Scalars['String']>;
  market_in?: InputMaybe<Array<Scalars['String']>>;
  market_lt?: InputMaybe<Scalars['String']>;
  market_lte?: InputMaybe<Scalars['String']>;
  market_not?: InputMaybe<Scalars['String']>;
  market_not_contains?: InputMaybe<Scalars['String']>;
  market_not_ends_with?: InputMaybe<Scalars['String']>;
  market_not_in?: InputMaybe<Array<Scalars['String']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']>;
  market_starts_with?: InputMaybe<Scalars['String']>;
  storedBorrowBalance?: InputMaybe<Scalars['BigDecimal']>;
  storedBorrowBalance_gt?: InputMaybe<Scalars['BigDecimal']>;
  storedBorrowBalance_gte?: InputMaybe<Scalars['BigDecimal']>;
  storedBorrowBalance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  storedBorrowBalance_lt?: InputMaybe<Scalars['BigDecimal']>;
  storedBorrowBalance_lte?: InputMaybe<Scalars['BigDecimal']>;
  storedBorrowBalance_not?: InputMaybe<Scalars['BigDecimal']>;
  storedBorrowBalance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  supplyBalanceUnderlying?: InputMaybe<Scalars['BigDecimal']>;
  supplyBalanceUnderlying_gt?: InputMaybe<Scalars['BigDecimal']>;
  supplyBalanceUnderlying_gte?: InputMaybe<Scalars['BigDecimal']>;
  supplyBalanceUnderlying_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  supplyBalanceUnderlying_lt?: InputMaybe<Scalars['BigDecimal']>;
  supplyBalanceUnderlying_lte?: InputMaybe<Scalars['BigDecimal']>;
  supplyBalanceUnderlying_not?: InputMaybe<Scalars['BigDecimal']>;
  supplyBalanceUnderlying_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  totalUnderlyingBorrowed?: InputMaybe<Scalars['BigDecimal']>;
  totalUnderlyingBorrowed_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalUnderlyingBorrowed_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalUnderlyingBorrowed_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalUnderlyingBorrowed_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalUnderlyingBorrowed_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalUnderlyingBorrowed_not?: InputMaybe<Scalars['BigDecimal']>;
  totalUnderlyingBorrowed_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalUnderlyingRedeemed?: InputMaybe<Scalars['BigDecimal']>;
  totalUnderlyingRedeemed_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalUnderlyingRedeemed_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalUnderlyingRedeemed_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalUnderlyingRedeemed_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalUnderlyingRedeemed_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalUnderlyingRedeemed_not?: InputMaybe<Scalars['BigDecimal']>;
  totalUnderlyingRedeemed_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalUnderlyingRepaid?: InputMaybe<Scalars['BigDecimal']>;
  totalUnderlyingRepaid_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalUnderlyingRepaid_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalUnderlyingRepaid_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalUnderlyingRepaid_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalUnderlyingRepaid_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalUnderlyingRepaid_not?: InputMaybe<Scalars['BigDecimal']>;
  totalUnderlyingRepaid_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalUnderlyingSupplied?: InputMaybe<Scalars['BigDecimal']>;
  totalUnderlyingSupplied_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalUnderlyingSupplied_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalUnderlyingSupplied_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalUnderlyingSupplied_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalUnderlyingSupplied_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalUnderlyingSupplied_not?: InputMaybe<Scalars['BigDecimal']>;
  totalUnderlyingSupplied_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum AccountJToken_OrderBy {
  Account = 'account',
  AccountBorrowIndex = 'accountBorrowIndex',
  AccrualBlockTimestamp = 'accrualBlockTimestamp',
  BorrowBalanceUnderlying = 'borrowBalanceUnderlying',
  EnteredMarket = 'enteredMarket',
  Id = 'id',
  JTokenBalance = 'jTokenBalance',
  LifetimeBorrowInterestAccrued = 'lifetimeBorrowInterestAccrued',
  LifetimeSupplyInterestAccrued = 'lifetimeSupplyInterestAccrued',
  Market = 'market',
  StoredBorrowBalance = 'storedBorrowBalance',
  SupplyBalanceUnderlying = 'supplyBalanceUnderlying',
  Symbol = 'symbol',
  TotalUnderlyingBorrowed = 'totalUnderlyingBorrowed',
  TotalUnderlyingRedeemed = 'totalUnderlyingRedeemed',
  TotalUnderlyingRepaid = 'totalUnderlyingRepaid',
  TotalUnderlyingSupplied = 'totalUnderlyingSupplied',
  Transactions = 'transactions'
}

export type Account_Filter = {
  countLiquidated?: InputMaybe<Scalars['Int']>;
  countLiquidated_gt?: InputMaybe<Scalars['Int']>;
  countLiquidated_gte?: InputMaybe<Scalars['Int']>;
  countLiquidated_in?: InputMaybe<Array<Scalars['Int']>>;
  countLiquidated_lt?: InputMaybe<Scalars['Int']>;
  countLiquidated_lte?: InputMaybe<Scalars['Int']>;
  countLiquidated_not?: InputMaybe<Scalars['Int']>;
  countLiquidated_not_in?: InputMaybe<Array<Scalars['Int']>>;
  countLiquidator?: InputMaybe<Scalars['Int']>;
  countLiquidator_gt?: InputMaybe<Scalars['Int']>;
  countLiquidator_gte?: InputMaybe<Scalars['Int']>;
  countLiquidator_in?: InputMaybe<Array<Scalars['Int']>>;
  countLiquidator_lt?: InputMaybe<Scalars['Int']>;
  countLiquidator_lte?: InputMaybe<Scalars['Int']>;
  countLiquidator_not?: InputMaybe<Scalars['Int']>;
  countLiquidator_not_in?: InputMaybe<Array<Scalars['Int']>>;
  hasBorrowed?: InputMaybe<Scalars['Boolean']>;
  hasBorrowed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  hasBorrowed_not?: InputMaybe<Scalars['Boolean']>;
  hasBorrowed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  health?: InputMaybe<Scalars['BigDecimal']>;
  health_gt?: InputMaybe<Scalars['BigDecimal']>;
  health_gte?: InputMaybe<Scalars['BigDecimal']>;
  health_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  health_lt?: InputMaybe<Scalars['BigDecimal']>;
  health_lte?: InputMaybe<Scalars['BigDecimal']>;
  health_not?: InputMaybe<Scalars['BigDecimal']>;
  health_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  totalBorrowValueInUSD?: InputMaybe<Scalars['BigDecimal']>;
  totalBorrowValueInUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalBorrowValueInUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalBorrowValueInUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalBorrowValueInUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalBorrowValueInUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalBorrowValueInUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  totalBorrowValueInUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalCollateralValueInUSD?: InputMaybe<Scalars['BigDecimal']>;
  totalCollateralValueInUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalCollateralValueInUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalCollateralValueInUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalCollateralValueInUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalCollateralValueInUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalCollateralValueInUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  totalCollateralValueInUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum Account_OrderBy {
  CountLiquidated = 'countLiquidated',
  CountLiquidator = 'countLiquidator',
  HasBorrowed = 'hasBorrowed',
  Health = 'health',
  Id = 'id',
  Tokens = 'tokens',
  TotalBorrowValueInUsd = 'totalBorrowValueInUSD',
  TotalCollateralValueInUsd = 'totalCollateralValueInUSD'
}

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** BorrowEvent stores information for borrows */
export type BorrowEvent = UnderlyingTransfer & {
  __typename?: 'BorrowEvent';
  accountBorrows: Scalars['BigDecimal'];
  amount: Scalars['BigDecimal'];
  blockNumber: Scalars['Int'];
  blockTime: Scalars['Int'];
  borrower: Scalars['Bytes'];
  id: Scalars['ID'];
  underlyingSymbol: Scalars['String'];
};

export type BorrowEvent_Filter = {
  accountBorrows?: InputMaybe<Scalars['BigDecimal']>;
  accountBorrows_gt?: InputMaybe<Scalars['BigDecimal']>;
  accountBorrows_gte?: InputMaybe<Scalars['BigDecimal']>;
  accountBorrows_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  accountBorrows_lt?: InputMaybe<Scalars['BigDecimal']>;
  accountBorrows_lte?: InputMaybe<Scalars['BigDecimal']>;
  accountBorrows_not?: InputMaybe<Scalars['BigDecimal']>;
  accountBorrows_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  blockTime?: InputMaybe<Scalars['Int']>;
  blockTime_gt?: InputMaybe<Scalars['Int']>;
  blockTime_gte?: InputMaybe<Scalars['Int']>;
  blockTime_in?: InputMaybe<Array<Scalars['Int']>>;
  blockTime_lt?: InputMaybe<Scalars['Int']>;
  blockTime_lte?: InputMaybe<Scalars['Int']>;
  blockTime_not?: InputMaybe<Scalars['Int']>;
  blockTime_not_in?: InputMaybe<Array<Scalars['Int']>>;
  borrower?: InputMaybe<Scalars['Bytes']>;
  borrower_contains?: InputMaybe<Scalars['Bytes']>;
  borrower_in?: InputMaybe<Array<Scalars['Bytes']>>;
  borrower_not?: InputMaybe<Scalars['Bytes']>;
  borrower_not_contains?: InputMaybe<Scalars['Bytes']>;
  borrower_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  underlyingSymbol?: InputMaybe<Scalars['String']>;
  underlyingSymbol_contains?: InputMaybe<Scalars['String']>;
  underlyingSymbol_ends_with?: InputMaybe<Scalars['String']>;
  underlyingSymbol_gt?: InputMaybe<Scalars['String']>;
  underlyingSymbol_gte?: InputMaybe<Scalars['String']>;
  underlyingSymbol_in?: InputMaybe<Array<Scalars['String']>>;
  underlyingSymbol_lt?: InputMaybe<Scalars['String']>;
  underlyingSymbol_lte?: InputMaybe<Scalars['String']>;
  underlyingSymbol_not?: InputMaybe<Scalars['String']>;
  underlyingSymbol_not_contains?: InputMaybe<Scalars['String']>;
  underlyingSymbol_not_ends_with?: InputMaybe<Scalars['String']>;
  underlyingSymbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  underlyingSymbol_not_starts_with?: InputMaybe<Scalars['String']>;
  underlyingSymbol_starts_with?: InputMaybe<Scalars['String']>;
};

export enum BorrowEvent_OrderBy {
  AccountBorrows = 'accountBorrows',
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  BlockTime = 'blockTime',
  Borrower = 'borrower',
  Id = 'id',
  UnderlyingSymbol = 'underlyingSymbol'
}

/** FlashloanEvent stores information for flash loans. */
export type FlashloanEvent = {
  __typename?: 'FlashloanEvent';
  amount: Scalars['BigDecimal'];
  blockNumber: Scalars['Int'];
  blockTime: Scalars['Int'];
  id: Scalars['ID'];
  receiver: Scalars['Bytes'];
  reservesFee: Scalars['BigDecimal'];
  totalFee: Scalars['BigDecimal'];
  underlyingSymbol: Scalars['String'];
};

export type FlashloanEvent_Filter = {
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  blockTime?: InputMaybe<Scalars['Int']>;
  blockTime_gt?: InputMaybe<Scalars['Int']>;
  blockTime_gte?: InputMaybe<Scalars['Int']>;
  blockTime_in?: InputMaybe<Array<Scalars['Int']>>;
  blockTime_lt?: InputMaybe<Scalars['Int']>;
  blockTime_lte?: InputMaybe<Scalars['Int']>;
  blockTime_not?: InputMaybe<Scalars['Int']>;
  blockTime_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  receiver?: InputMaybe<Scalars['Bytes']>;
  receiver_contains?: InputMaybe<Scalars['Bytes']>;
  receiver_in?: InputMaybe<Array<Scalars['Bytes']>>;
  receiver_not?: InputMaybe<Scalars['Bytes']>;
  receiver_not_contains?: InputMaybe<Scalars['Bytes']>;
  receiver_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  reservesFee?: InputMaybe<Scalars['BigDecimal']>;
  reservesFee_gt?: InputMaybe<Scalars['BigDecimal']>;
  reservesFee_gte?: InputMaybe<Scalars['BigDecimal']>;
  reservesFee_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reservesFee_lt?: InputMaybe<Scalars['BigDecimal']>;
  reservesFee_lte?: InputMaybe<Scalars['BigDecimal']>;
  reservesFee_not?: InputMaybe<Scalars['BigDecimal']>;
  reservesFee_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalFee?: InputMaybe<Scalars['BigDecimal']>;
  totalFee_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalFee_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalFee_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalFee_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalFee_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalFee_not?: InputMaybe<Scalars['BigDecimal']>;
  totalFee_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  underlyingSymbol?: InputMaybe<Scalars['String']>;
  underlyingSymbol_contains?: InputMaybe<Scalars['String']>;
  underlyingSymbol_ends_with?: InputMaybe<Scalars['String']>;
  underlyingSymbol_gt?: InputMaybe<Scalars['String']>;
  underlyingSymbol_gte?: InputMaybe<Scalars['String']>;
  underlyingSymbol_in?: InputMaybe<Array<Scalars['String']>>;
  underlyingSymbol_lt?: InputMaybe<Scalars['String']>;
  underlyingSymbol_lte?: InputMaybe<Scalars['String']>;
  underlyingSymbol_not?: InputMaybe<Scalars['String']>;
  underlyingSymbol_not_contains?: InputMaybe<Scalars['String']>;
  underlyingSymbol_not_ends_with?: InputMaybe<Scalars['String']>;
  underlyingSymbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  underlyingSymbol_not_starts_with?: InputMaybe<Scalars['String']>;
  underlyingSymbol_starts_with?: InputMaybe<Scalars['String']>;
};

export enum FlashloanEvent_OrderBy {
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  BlockTime = 'blockTime',
  Id = 'id',
  Receiver = 'receiver',
  ReservesFee = 'reservesFee',
  TotalFee = 'totalFee',
  UnderlyingSymbol = 'underlyingSymbol'
}

/**
 * An interface for a transfer of any jToken. TransferEvent, MintEvent,
 * RedeemEvent, and LiquidationEvent all use this interface
 */
export type JTokenTransfer = {
  amount: Scalars['BigDecimal'];
  blockNumber: Scalars['Int'];
  blockTime: Scalars['Int'];
  from: Scalars['Bytes'];
  id: Scalars['ID'];
  jTokenSymbol: Scalars['String'];
  to: Scalars['Bytes'];
};

export type JTokenTransfer_Filter = {
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  blockTime?: InputMaybe<Scalars['Int']>;
  blockTime_gt?: InputMaybe<Scalars['Int']>;
  blockTime_gte?: InputMaybe<Scalars['Int']>;
  blockTime_in?: InputMaybe<Array<Scalars['Int']>>;
  blockTime_lt?: InputMaybe<Scalars['Int']>;
  blockTime_lte?: InputMaybe<Scalars['Int']>;
  blockTime_not?: InputMaybe<Scalars['Int']>;
  blockTime_not_in?: InputMaybe<Array<Scalars['Int']>>;
  from?: InputMaybe<Scalars['Bytes']>;
  from_contains?: InputMaybe<Scalars['Bytes']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']>>;
  from_not?: InputMaybe<Scalars['Bytes']>;
  from_not_contains?: InputMaybe<Scalars['Bytes']>;
  from_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  jTokenSymbol?: InputMaybe<Scalars['String']>;
  jTokenSymbol_contains?: InputMaybe<Scalars['String']>;
  jTokenSymbol_ends_with?: InputMaybe<Scalars['String']>;
  jTokenSymbol_gt?: InputMaybe<Scalars['String']>;
  jTokenSymbol_gte?: InputMaybe<Scalars['String']>;
  jTokenSymbol_in?: InputMaybe<Array<Scalars['String']>>;
  jTokenSymbol_lt?: InputMaybe<Scalars['String']>;
  jTokenSymbol_lte?: InputMaybe<Scalars['String']>;
  jTokenSymbol_not?: InputMaybe<Scalars['String']>;
  jTokenSymbol_not_contains?: InputMaybe<Scalars['String']>;
  jTokenSymbol_not_ends_with?: InputMaybe<Scalars['String']>;
  jTokenSymbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  jTokenSymbol_not_starts_with?: InputMaybe<Scalars['String']>;
  jTokenSymbol_starts_with?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['Bytes']>;
  to_contains?: InputMaybe<Scalars['Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_not?: InputMaybe<Scalars['Bytes']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum JTokenTransfer_OrderBy {
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  BlockTime = 'blockTime',
  From = 'from',
  Id = 'id',
  JTokenSymbol = 'jTokenSymbol',
  To = 'to'
}

/** The Joetroller type has protocol level variables stored */
export type Joetroller = {
  __typename?: 'Joetroller';
  closeFactor?: Maybe<Scalars['BigInt']>;
  /** ID is set to 1 */
  id: Scalars['ID'];
  liquidationIncentive?: Maybe<Scalars['BigInt']>;
  maxAssets?: Maybe<Scalars['BigInt']>;
  priceOracle?: Maybe<Scalars['Bytes']>;
};

export type Joetroller_Filter = {
  closeFactor?: InputMaybe<Scalars['BigInt']>;
  closeFactor_gt?: InputMaybe<Scalars['BigInt']>;
  closeFactor_gte?: InputMaybe<Scalars['BigInt']>;
  closeFactor_in?: InputMaybe<Array<Scalars['BigInt']>>;
  closeFactor_lt?: InputMaybe<Scalars['BigInt']>;
  closeFactor_lte?: InputMaybe<Scalars['BigInt']>;
  closeFactor_not?: InputMaybe<Scalars['BigInt']>;
  closeFactor_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  liquidationIncentive?: InputMaybe<Scalars['BigInt']>;
  liquidationIncentive_gt?: InputMaybe<Scalars['BigInt']>;
  liquidationIncentive_gte?: InputMaybe<Scalars['BigInt']>;
  liquidationIncentive_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidationIncentive_lt?: InputMaybe<Scalars['BigInt']>;
  liquidationIncentive_lte?: InputMaybe<Scalars['BigInt']>;
  liquidationIncentive_not?: InputMaybe<Scalars['BigInt']>;
  liquidationIncentive_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  maxAssets?: InputMaybe<Scalars['BigInt']>;
  maxAssets_gt?: InputMaybe<Scalars['BigInt']>;
  maxAssets_gte?: InputMaybe<Scalars['BigInt']>;
  maxAssets_in?: InputMaybe<Array<Scalars['BigInt']>>;
  maxAssets_lt?: InputMaybe<Scalars['BigInt']>;
  maxAssets_lte?: InputMaybe<Scalars['BigInt']>;
  maxAssets_not?: InputMaybe<Scalars['BigInt']>;
  maxAssets_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  priceOracle?: InputMaybe<Scalars['Bytes']>;
  priceOracle_contains?: InputMaybe<Scalars['Bytes']>;
  priceOracle_in?: InputMaybe<Array<Scalars['Bytes']>>;
  priceOracle_not?: InputMaybe<Scalars['Bytes']>;
  priceOracle_not_contains?: InputMaybe<Scalars['Bytes']>;
  priceOracle_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum Joetroller_OrderBy {
  CloseFactor = 'closeFactor',
  Id = 'id',
  LiquidationIncentive = 'liquidationIncentive',
  MaxAssets = 'maxAssets',
  PriceOracle = 'priceOracle'
}

/** LiquidationDayData stores information for liquidations by day */
export type LiquidationDayData = {
  __typename?: 'LiquidationDayData';
  date: Scalars['Int'];
  id: Scalars['ID'];
  liquidationEvents?: Maybe<Array<LiquidationEvent>>;
  txCount: Scalars['Int'];
  underlyingCollateralSeizedAddress: Scalars['String'];
  underlyingCollateralSeizedAmount: Scalars['BigDecimal'];
  underlyingCollateralSeizedAmountUSD: Scalars['BigDecimal'];
  underlyingCollateralSeizedSymbol: Scalars['String'];
  underlyingRepayAddress: Scalars['String'];
  underlyingRepayAmount: Scalars['BigDecimal'];
  underlyingRepayAmountUSD: Scalars['BigDecimal'];
  underlyingRepaySymbol: Scalars['String'];
};


/** LiquidationDayData stores information for liquidations by day */
export type LiquidationDayDataLiquidationEventsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LiquidationEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<LiquidationEvent_Filter>;
};

export type LiquidationDayData_Filter = {
  date?: InputMaybe<Scalars['Int']>;
  date_gt?: InputMaybe<Scalars['Int']>;
  date_gte?: InputMaybe<Scalars['Int']>;
  date_in?: InputMaybe<Array<Scalars['Int']>>;
  date_lt?: InputMaybe<Scalars['Int']>;
  date_lte?: InputMaybe<Scalars['Int']>;
  date_not?: InputMaybe<Scalars['Int']>;
  date_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  txCount?: InputMaybe<Scalars['Int']>;
  txCount_gt?: InputMaybe<Scalars['Int']>;
  txCount_gte?: InputMaybe<Scalars['Int']>;
  txCount_in?: InputMaybe<Array<Scalars['Int']>>;
  txCount_lt?: InputMaybe<Scalars['Int']>;
  txCount_lte?: InputMaybe<Scalars['Int']>;
  txCount_not?: InputMaybe<Scalars['Int']>;
  txCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
  underlyingCollateralSeizedAddress?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedAddress_contains?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedAddress_ends_with?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedAddress_gt?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedAddress_gte?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedAddress_in?: InputMaybe<Array<Scalars['String']>>;
  underlyingCollateralSeizedAddress_lt?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedAddress_lte?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedAddress_not?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedAddress_not_contains?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  underlyingCollateralSeizedAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedAddress_starts_with?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedAmount?: InputMaybe<Scalars['BigDecimal']>;
  underlyingCollateralSeizedAmountUSD?: InputMaybe<Scalars['BigDecimal']>;
  underlyingCollateralSeizedAmountUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  underlyingCollateralSeizedAmountUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  underlyingCollateralSeizedAmountUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  underlyingCollateralSeizedAmountUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  underlyingCollateralSeizedAmountUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  underlyingCollateralSeizedAmountUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  underlyingCollateralSeizedAmountUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  underlyingCollateralSeizedAmount_gt?: InputMaybe<Scalars['BigDecimal']>;
  underlyingCollateralSeizedAmount_gte?: InputMaybe<Scalars['BigDecimal']>;
  underlyingCollateralSeizedAmount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  underlyingCollateralSeizedAmount_lt?: InputMaybe<Scalars['BigDecimal']>;
  underlyingCollateralSeizedAmount_lte?: InputMaybe<Scalars['BigDecimal']>;
  underlyingCollateralSeizedAmount_not?: InputMaybe<Scalars['BigDecimal']>;
  underlyingCollateralSeizedAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  underlyingCollateralSeizedSymbol?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedSymbol_contains?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedSymbol_ends_with?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedSymbol_gt?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedSymbol_gte?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedSymbol_in?: InputMaybe<Array<Scalars['String']>>;
  underlyingCollateralSeizedSymbol_lt?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedSymbol_lte?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedSymbol_not?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedSymbol_not_contains?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedSymbol_not_ends_with?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedSymbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  underlyingCollateralSeizedSymbol_not_starts_with?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedSymbol_starts_with?: InputMaybe<Scalars['String']>;
  underlyingRepayAddress?: InputMaybe<Scalars['String']>;
  underlyingRepayAddress_contains?: InputMaybe<Scalars['String']>;
  underlyingRepayAddress_ends_with?: InputMaybe<Scalars['String']>;
  underlyingRepayAddress_gt?: InputMaybe<Scalars['String']>;
  underlyingRepayAddress_gte?: InputMaybe<Scalars['String']>;
  underlyingRepayAddress_in?: InputMaybe<Array<Scalars['String']>>;
  underlyingRepayAddress_lt?: InputMaybe<Scalars['String']>;
  underlyingRepayAddress_lte?: InputMaybe<Scalars['String']>;
  underlyingRepayAddress_not?: InputMaybe<Scalars['String']>;
  underlyingRepayAddress_not_contains?: InputMaybe<Scalars['String']>;
  underlyingRepayAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  underlyingRepayAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  underlyingRepayAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  underlyingRepayAddress_starts_with?: InputMaybe<Scalars['String']>;
  underlyingRepayAmount?: InputMaybe<Scalars['BigDecimal']>;
  underlyingRepayAmountUSD?: InputMaybe<Scalars['BigDecimal']>;
  underlyingRepayAmountUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  underlyingRepayAmountUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  underlyingRepayAmountUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  underlyingRepayAmountUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  underlyingRepayAmountUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  underlyingRepayAmountUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  underlyingRepayAmountUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  underlyingRepayAmount_gt?: InputMaybe<Scalars['BigDecimal']>;
  underlyingRepayAmount_gte?: InputMaybe<Scalars['BigDecimal']>;
  underlyingRepayAmount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  underlyingRepayAmount_lt?: InputMaybe<Scalars['BigDecimal']>;
  underlyingRepayAmount_lte?: InputMaybe<Scalars['BigDecimal']>;
  underlyingRepayAmount_not?: InputMaybe<Scalars['BigDecimal']>;
  underlyingRepayAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  underlyingRepaySymbol?: InputMaybe<Scalars['String']>;
  underlyingRepaySymbol_contains?: InputMaybe<Scalars['String']>;
  underlyingRepaySymbol_ends_with?: InputMaybe<Scalars['String']>;
  underlyingRepaySymbol_gt?: InputMaybe<Scalars['String']>;
  underlyingRepaySymbol_gte?: InputMaybe<Scalars['String']>;
  underlyingRepaySymbol_in?: InputMaybe<Array<Scalars['String']>>;
  underlyingRepaySymbol_lt?: InputMaybe<Scalars['String']>;
  underlyingRepaySymbol_lte?: InputMaybe<Scalars['String']>;
  underlyingRepaySymbol_not?: InputMaybe<Scalars['String']>;
  underlyingRepaySymbol_not_contains?: InputMaybe<Scalars['String']>;
  underlyingRepaySymbol_not_ends_with?: InputMaybe<Scalars['String']>;
  underlyingRepaySymbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  underlyingRepaySymbol_not_starts_with?: InputMaybe<Scalars['String']>;
  underlyingRepaySymbol_starts_with?: InputMaybe<Scalars['String']>;
};

export enum LiquidationDayData_OrderBy {
  Date = 'date',
  Id = 'id',
  LiquidationEvents = 'liquidationEvents',
  TxCount = 'txCount',
  UnderlyingCollateralSeizedAddress = 'underlyingCollateralSeizedAddress',
  UnderlyingCollateralSeizedAmount = 'underlyingCollateralSeizedAmount',
  UnderlyingCollateralSeizedAmountUsd = 'underlyingCollateralSeizedAmountUSD',
  UnderlyingCollateralSeizedSymbol = 'underlyingCollateralSeizedSymbol',
  UnderlyingRepayAddress = 'underlyingRepayAddress',
  UnderlyingRepayAmount = 'underlyingRepayAmount',
  UnderlyingRepayAmountUsd = 'underlyingRepayAmountUSD',
  UnderlyingRepaySymbol = 'underlyingRepaySymbol'
}

/**
 * LiquidationEvent stores information for liquidations. The event is emitted from
 * the jToken market address.
 */
export type LiquidationEvent = {
  __typename?: 'LiquidationEvent';
  blockNumber: Scalars['Int'];
  blockTime: Scalars['Int'];
  borrower: Scalars['Bytes'];
  dayData?: Maybe<LiquidationDayData>;
  id: Scalars['ID'];
  liquidator: Scalars['Bytes'];
  underlyingCollateralSeizedAmount: Scalars['BigDecimal'];
  underlyingCollateralSeizedSymbol: Scalars['String'];
  underlyingRepayAmount: Scalars['BigDecimal'];
  underlyingRepaySymbol: Scalars['String'];
};

export type LiquidationEvent_Filter = {
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  blockTime?: InputMaybe<Scalars['Int']>;
  blockTime_gt?: InputMaybe<Scalars['Int']>;
  blockTime_gte?: InputMaybe<Scalars['Int']>;
  blockTime_in?: InputMaybe<Array<Scalars['Int']>>;
  blockTime_lt?: InputMaybe<Scalars['Int']>;
  blockTime_lte?: InputMaybe<Scalars['Int']>;
  blockTime_not?: InputMaybe<Scalars['Int']>;
  blockTime_not_in?: InputMaybe<Array<Scalars['Int']>>;
  borrower?: InputMaybe<Scalars['Bytes']>;
  borrower_contains?: InputMaybe<Scalars['Bytes']>;
  borrower_in?: InputMaybe<Array<Scalars['Bytes']>>;
  borrower_not?: InputMaybe<Scalars['Bytes']>;
  borrower_not_contains?: InputMaybe<Scalars['Bytes']>;
  borrower_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  dayData?: InputMaybe<Scalars['String']>;
  dayData_contains?: InputMaybe<Scalars['String']>;
  dayData_ends_with?: InputMaybe<Scalars['String']>;
  dayData_gt?: InputMaybe<Scalars['String']>;
  dayData_gte?: InputMaybe<Scalars['String']>;
  dayData_in?: InputMaybe<Array<Scalars['String']>>;
  dayData_lt?: InputMaybe<Scalars['String']>;
  dayData_lte?: InputMaybe<Scalars['String']>;
  dayData_not?: InputMaybe<Scalars['String']>;
  dayData_not_contains?: InputMaybe<Scalars['String']>;
  dayData_not_ends_with?: InputMaybe<Scalars['String']>;
  dayData_not_in?: InputMaybe<Array<Scalars['String']>>;
  dayData_not_starts_with?: InputMaybe<Scalars['String']>;
  dayData_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  liquidator?: InputMaybe<Scalars['Bytes']>;
  liquidator_contains?: InputMaybe<Scalars['Bytes']>;
  liquidator_in?: InputMaybe<Array<Scalars['Bytes']>>;
  liquidator_not?: InputMaybe<Scalars['Bytes']>;
  liquidator_not_contains?: InputMaybe<Scalars['Bytes']>;
  liquidator_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  underlyingCollateralSeizedAmount?: InputMaybe<Scalars['BigDecimal']>;
  underlyingCollateralSeizedAmount_gt?: InputMaybe<Scalars['BigDecimal']>;
  underlyingCollateralSeizedAmount_gte?: InputMaybe<Scalars['BigDecimal']>;
  underlyingCollateralSeizedAmount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  underlyingCollateralSeizedAmount_lt?: InputMaybe<Scalars['BigDecimal']>;
  underlyingCollateralSeizedAmount_lte?: InputMaybe<Scalars['BigDecimal']>;
  underlyingCollateralSeizedAmount_not?: InputMaybe<Scalars['BigDecimal']>;
  underlyingCollateralSeizedAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  underlyingCollateralSeizedSymbol?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedSymbol_contains?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedSymbol_ends_with?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedSymbol_gt?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedSymbol_gte?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedSymbol_in?: InputMaybe<Array<Scalars['String']>>;
  underlyingCollateralSeizedSymbol_lt?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedSymbol_lte?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedSymbol_not?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedSymbol_not_contains?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedSymbol_not_ends_with?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedSymbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  underlyingCollateralSeizedSymbol_not_starts_with?: InputMaybe<Scalars['String']>;
  underlyingCollateralSeizedSymbol_starts_with?: InputMaybe<Scalars['String']>;
  underlyingRepayAmount?: InputMaybe<Scalars['BigDecimal']>;
  underlyingRepayAmount_gt?: InputMaybe<Scalars['BigDecimal']>;
  underlyingRepayAmount_gte?: InputMaybe<Scalars['BigDecimal']>;
  underlyingRepayAmount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  underlyingRepayAmount_lt?: InputMaybe<Scalars['BigDecimal']>;
  underlyingRepayAmount_lte?: InputMaybe<Scalars['BigDecimal']>;
  underlyingRepayAmount_not?: InputMaybe<Scalars['BigDecimal']>;
  underlyingRepayAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  underlyingRepaySymbol?: InputMaybe<Scalars['String']>;
  underlyingRepaySymbol_contains?: InputMaybe<Scalars['String']>;
  underlyingRepaySymbol_ends_with?: InputMaybe<Scalars['String']>;
  underlyingRepaySymbol_gt?: InputMaybe<Scalars['String']>;
  underlyingRepaySymbol_gte?: InputMaybe<Scalars['String']>;
  underlyingRepaySymbol_in?: InputMaybe<Array<Scalars['String']>>;
  underlyingRepaySymbol_lt?: InputMaybe<Scalars['String']>;
  underlyingRepaySymbol_lte?: InputMaybe<Scalars['String']>;
  underlyingRepaySymbol_not?: InputMaybe<Scalars['String']>;
  underlyingRepaySymbol_not_contains?: InputMaybe<Scalars['String']>;
  underlyingRepaySymbol_not_ends_with?: InputMaybe<Scalars['String']>;
  underlyingRepaySymbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  underlyingRepaySymbol_not_starts_with?: InputMaybe<Scalars['String']>;
  underlyingRepaySymbol_starts_with?: InputMaybe<Scalars['String']>;
};

export enum LiquidationEvent_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTime = 'blockTime',
  Borrower = 'borrower',
  DayData = 'dayData',
  Id = 'id',
  Liquidator = 'liquidator',
  UnderlyingCollateralSeizedAmount = 'underlyingCollateralSeizedAmount',
  UnderlyingCollateralSeizedSymbol = 'underlyingCollateralSeizedSymbol',
  UnderlyingRepayAmount = 'underlyingRepayAmount',
  UnderlyingRepaySymbol = 'underlyingRepaySymbol'
}

/** Market stores all high level variables for a jToken market */
export type Market = {
  __typename?: 'Market';
  accrualBlockTimestamp: Scalars['Int'];
  blockTimestamp: Scalars['Int'];
  borrowIndex: Scalars['BigDecimal'];
  /** Yearly borrow rate. With 31,536,000 secs per year */
  borrowRate: Scalars['BigDecimal'];
  cash: Scalars['BigDecimal'];
  collateralFactor: Scalars['BigDecimal'];
  exchangeRate: Scalars['BigDecimal'];
  /** JToken address */
  id: Scalars['ID'];
  interestRateModelAddress: Scalars['Bytes'];
  marketDayData: Array<MarketDayData>;
  name: Scalars['String'];
  reserveFactor: Scalars['BigInt'];
  reserves: Scalars['BigDecimal'];
  /** Yearly supply rate. With 31,536, 000 secs per year */
  supplyRate: Scalars['BigDecimal'];
  symbol: Scalars['String'];
  totalBorrows: Scalars['BigDecimal'];
  totalInterestAccumulated: Scalars['BigDecimal'];
  totalInterestAccumulatedExact: Scalars['BigInt'];
  /** JToken supply. JTokens have 8 decimals */
  totalSupply: Scalars['BigDecimal'];
  underlyingAddress: Scalars['Bytes'];
  underlyingDecimals: Scalars['Int'];
  underlyingName: Scalars['String'];
  underlyingPriceUSD: Scalars['BigDecimal'];
  underlyingSymbol: Scalars['String'];
};


/** Market stores all high level variables for a jToken market */
export type MarketMarketDayDataArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarketDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MarketDayData_Filter>;
};

/** MarketDayData stores all high level variables for a jToken market per day */
export type MarketDayData = {
  __typename?: 'MarketDayData';
  date: Scalars['Int'];
  /** JTokenAddress-date */
  id: Scalars['ID'];
  market: Market;
  totalBorrows: Scalars['BigDecimal'];
  totalBorrowsUSD: Scalars['BigDecimal'];
  totalReservesUSD: Scalars['BigDecimal'];
  /** JToken supply. JTokens have 8 decimals */
  totalSupply: Scalars['BigDecimal'];
  totalSupplyUSD: Scalars['BigDecimal'];
  txCount: Scalars['Int'];
};

export type MarketDayData_Filter = {
  date?: InputMaybe<Scalars['Int']>;
  date_gt?: InputMaybe<Scalars['Int']>;
  date_gte?: InputMaybe<Scalars['Int']>;
  date_in?: InputMaybe<Array<Scalars['Int']>>;
  date_lt?: InputMaybe<Scalars['Int']>;
  date_lte?: InputMaybe<Scalars['Int']>;
  date_not?: InputMaybe<Scalars['Int']>;
  date_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  market?: InputMaybe<Scalars['String']>;
  market_contains?: InputMaybe<Scalars['String']>;
  market_ends_with?: InputMaybe<Scalars['String']>;
  market_gt?: InputMaybe<Scalars['String']>;
  market_gte?: InputMaybe<Scalars['String']>;
  market_in?: InputMaybe<Array<Scalars['String']>>;
  market_lt?: InputMaybe<Scalars['String']>;
  market_lte?: InputMaybe<Scalars['String']>;
  market_not?: InputMaybe<Scalars['String']>;
  market_not_contains?: InputMaybe<Scalars['String']>;
  market_not_ends_with?: InputMaybe<Scalars['String']>;
  market_not_in?: InputMaybe<Array<Scalars['String']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']>;
  market_starts_with?: InputMaybe<Scalars['String']>;
  totalBorrows?: InputMaybe<Scalars['BigDecimal']>;
  totalBorrowsUSD?: InputMaybe<Scalars['BigDecimal']>;
  totalBorrowsUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalBorrowsUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalBorrowsUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalBorrowsUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalBorrowsUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalBorrowsUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  totalBorrowsUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalBorrows_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalBorrows_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalBorrows_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalBorrows_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalBorrows_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalBorrows_not?: InputMaybe<Scalars['BigDecimal']>;
  totalBorrows_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalReservesUSD?: InputMaybe<Scalars['BigDecimal']>;
  totalReservesUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalReservesUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalReservesUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalReservesUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalReservesUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalReservesUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  totalReservesUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSupply?: InputMaybe<Scalars['BigDecimal']>;
  totalSupplyUSD?: InputMaybe<Scalars['BigDecimal']>;
  totalSupplyUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalSupplyUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalSupplyUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSupplyUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalSupplyUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalSupplyUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  totalSupplyUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSupply_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSupply_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_not?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  txCount?: InputMaybe<Scalars['Int']>;
  txCount_gt?: InputMaybe<Scalars['Int']>;
  txCount_gte?: InputMaybe<Scalars['Int']>;
  txCount_in?: InputMaybe<Array<Scalars['Int']>>;
  txCount_lt?: InputMaybe<Scalars['Int']>;
  txCount_lte?: InputMaybe<Scalars['Int']>;
  txCount_not?: InputMaybe<Scalars['Int']>;
  txCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
};

export enum MarketDayData_OrderBy {
  Date = 'date',
  Id = 'id',
  Market = 'market',
  TotalBorrows = 'totalBorrows',
  TotalBorrowsUsd = 'totalBorrowsUSD',
  TotalReservesUsd = 'totalReservesUSD',
  TotalSupply = 'totalSupply',
  TotalSupplyUsd = 'totalSupplyUSD',
  TxCount = 'txCount'
}

export type Market_Filter = {
  accrualBlockTimestamp?: InputMaybe<Scalars['Int']>;
  accrualBlockTimestamp_gt?: InputMaybe<Scalars['Int']>;
  accrualBlockTimestamp_gte?: InputMaybe<Scalars['Int']>;
  accrualBlockTimestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  accrualBlockTimestamp_lt?: InputMaybe<Scalars['Int']>;
  accrualBlockTimestamp_lte?: InputMaybe<Scalars['Int']>;
  accrualBlockTimestamp_not?: InputMaybe<Scalars['Int']>;
  accrualBlockTimestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  blockTimestamp?: InputMaybe<Scalars['Int']>;
  blockTimestamp_gt?: InputMaybe<Scalars['Int']>;
  blockTimestamp_gte?: InputMaybe<Scalars['Int']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['Int']>;
  blockTimestamp_lte?: InputMaybe<Scalars['Int']>;
  blockTimestamp_not?: InputMaybe<Scalars['Int']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  borrowIndex?: InputMaybe<Scalars['BigDecimal']>;
  borrowIndex_gt?: InputMaybe<Scalars['BigDecimal']>;
  borrowIndex_gte?: InputMaybe<Scalars['BigDecimal']>;
  borrowIndex_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  borrowIndex_lt?: InputMaybe<Scalars['BigDecimal']>;
  borrowIndex_lte?: InputMaybe<Scalars['BigDecimal']>;
  borrowIndex_not?: InputMaybe<Scalars['BigDecimal']>;
  borrowIndex_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  borrowRate?: InputMaybe<Scalars['BigDecimal']>;
  borrowRate_gt?: InputMaybe<Scalars['BigDecimal']>;
  borrowRate_gte?: InputMaybe<Scalars['BigDecimal']>;
  borrowRate_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  borrowRate_lt?: InputMaybe<Scalars['BigDecimal']>;
  borrowRate_lte?: InputMaybe<Scalars['BigDecimal']>;
  borrowRate_not?: InputMaybe<Scalars['BigDecimal']>;
  borrowRate_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  cash?: InputMaybe<Scalars['BigDecimal']>;
  cash_gt?: InputMaybe<Scalars['BigDecimal']>;
  cash_gte?: InputMaybe<Scalars['BigDecimal']>;
  cash_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  cash_lt?: InputMaybe<Scalars['BigDecimal']>;
  cash_lte?: InputMaybe<Scalars['BigDecimal']>;
  cash_not?: InputMaybe<Scalars['BigDecimal']>;
  cash_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  collateralFactor?: InputMaybe<Scalars['BigDecimal']>;
  collateralFactor_gt?: InputMaybe<Scalars['BigDecimal']>;
  collateralFactor_gte?: InputMaybe<Scalars['BigDecimal']>;
  collateralFactor_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  collateralFactor_lt?: InputMaybe<Scalars['BigDecimal']>;
  collateralFactor_lte?: InputMaybe<Scalars['BigDecimal']>;
  collateralFactor_not?: InputMaybe<Scalars['BigDecimal']>;
  collateralFactor_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  exchangeRate?: InputMaybe<Scalars['BigDecimal']>;
  exchangeRate_gt?: InputMaybe<Scalars['BigDecimal']>;
  exchangeRate_gte?: InputMaybe<Scalars['BigDecimal']>;
  exchangeRate_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  exchangeRate_lt?: InputMaybe<Scalars['BigDecimal']>;
  exchangeRate_lte?: InputMaybe<Scalars['BigDecimal']>;
  exchangeRate_not?: InputMaybe<Scalars['BigDecimal']>;
  exchangeRate_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  interestRateModelAddress?: InputMaybe<Scalars['Bytes']>;
  interestRateModelAddress_contains?: InputMaybe<Scalars['Bytes']>;
  interestRateModelAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  interestRateModelAddress_not?: InputMaybe<Scalars['Bytes']>;
  interestRateModelAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  interestRateModelAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  reserveFactor?: InputMaybe<Scalars['BigInt']>;
  reserveFactor_gt?: InputMaybe<Scalars['BigInt']>;
  reserveFactor_gte?: InputMaybe<Scalars['BigInt']>;
  reserveFactor_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reserveFactor_lt?: InputMaybe<Scalars['BigInt']>;
  reserveFactor_lte?: InputMaybe<Scalars['BigInt']>;
  reserveFactor_not?: InputMaybe<Scalars['BigInt']>;
  reserveFactor_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reserves?: InputMaybe<Scalars['BigDecimal']>;
  reserves_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserves_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserves_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserves_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserves_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserves_not?: InputMaybe<Scalars['BigDecimal']>;
  reserves_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  supplyRate?: InputMaybe<Scalars['BigDecimal']>;
  supplyRate_gt?: InputMaybe<Scalars['BigDecimal']>;
  supplyRate_gte?: InputMaybe<Scalars['BigDecimal']>;
  supplyRate_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  supplyRate_lt?: InputMaybe<Scalars['BigDecimal']>;
  supplyRate_lte?: InputMaybe<Scalars['BigDecimal']>;
  supplyRate_not?: InputMaybe<Scalars['BigDecimal']>;
  supplyRate_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  totalBorrows?: InputMaybe<Scalars['BigDecimal']>;
  totalBorrows_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalBorrows_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalBorrows_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalBorrows_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalBorrows_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalBorrows_not?: InputMaybe<Scalars['BigDecimal']>;
  totalBorrows_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalInterestAccumulated?: InputMaybe<Scalars['BigDecimal']>;
  totalInterestAccumulatedExact?: InputMaybe<Scalars['BigInt']>;
  totalInterestAccumulatedExact_gt?: InputMaybe<Scalars['BigInt']>;
  totalInterestAccumulatedExact_gte?: InputMaybe<Scalars['BigInt']>;
  totalInterestAccumulatedExact_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalInterestAccumulatedExact_lt?: InputMaybe<Scalars['BigInt']>;
  totalInterestAccumulatedExact_lte?: InputMaybe<Scalars['BigInt']>;
  totalInterestAccumulatedExact_not?: InputMaybe<Scalars['BigInt']>;
  totalInterestAccumulatedExact_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalInterestAccumulated_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalInterestAccumulated_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalInterestAccumulated_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalInterestAccumulated_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalInterestAccumulated_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalInterestAccumulated_not?: InputMaybe<Scalars['BigDecimal']>;
  totalInterestAccumulated_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSupply?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSupply_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_not?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  underlyingAddress?: InputMaybe<Scalars['Bytes']>;
  underlyingAddress_contains?: InputMaybe<Scalars['Bytes']>;
  underlyingAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  underlyingAddress_not?: InputMaybe<Scalars['Bytes']>;
  underlyingAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  underlyingAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  underlyingDecimals?: InputMaybe<Scalars['Int']>;
  underlyingDecimals_gt?: InputMaybe<Scalars['Int']>;
  underlyingDecimals_gte?: InputMaybe<Scalars['Int']>;
  underlyingDecimals_in?: InputMaybe<Array<Scalars['Int']>>;
  underlyingDecimals_lt?: InputMaybe<Scalars['Int']>;
  underlyingDecimals_lte?: InputMaybe<Scalars['Int']>;
  underlyingDecimals_not?: InputMaybe<Scalars['Int']>;
  underlyingDecimals_not_in?: InputMaybe<Array<Scalars['Int']>>;
  underlyingName?: InputMaybe<Scalars['String']>;
  underlyingName_contains?: InputMaybe<Scalars['String']>;
  underlyingName_ends_with?: InputMaybe<Scalars['String']>;
  underlyingName_gt?: InputMaybe<Scalars['String']>;
  underlyingName_gte?: InputMaybe<Scalars['String']>;
  underlyingName_in?: InputMaybe<Array<Scalars['String']>>;
  underlyingName_lt?: InputMaybe<Scalars['String']>;
  underlyingName_lte?: InputMaybe<Scalars['String']>;
  underlyingName_not?: InputMaybe<Scalars['String']>;
  underlyingName_not_contains?: InputMaybe<Scalars['String']>;
  underlyingName_not_ends_with?: InputMaybe<Scalars['String']>;
  underlyingName_not_in?: InputMaybe<Array<Scalars['String']>>;
  underlyingName_not_starts_with?: InputMaybe<Scalars['String']>;
  underlyingName_starts_with?: InputMaybe<Scalars['String']>;
  underlyingPriceUSD?: InputMaybe<Scalars['BigDecimal']>;
  underlyingPriceUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  underlyingPriceUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  underlyingPriceUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  underlyingPriceUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  underlyingPriceUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  underlyingPriceUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  underlyingPriceUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  underlyingSymbol?: InputMaybe<Scalars['String']>;
  underlyingSymbol_contains?: InputMaybe<Scalars['String']>;
  underlyingSymbol_ends_with?: InputMaybe<Scalars['String']>;
  underlyingSymbol_gt?: InputMaybe<Scalars['String']>;
  underlyingSymbol_gte?: InputMaybe<Scalars['String']>;
  underlyingSymbol_in?: InputMaybe<Array<Scalars['String']>>;
  underlyingSymbol_lt?: InputMaybe<Scalars['String']>;
  underlyingSymbol_lte?: InputMaybe<Scalars['String']>;
  underlyingSymbol_not?: InputMaybe<Scalars['String']>;
  underlyingSymbol_not_contains?: InputMaybe<Scalars['String']>;
  underlyingSymbol_not_ends_with?: InputMaybe<Scalars['String']>;
  underlyingSymbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  underlyingSymbol_not_starts_with?: InputMaybe<Scalars['String']>;
  underlyingSymbol_starts_with?: InputMaybe<Scalars['String']>;
};

export enum Market_OrderBy {
  AccrualBlockTimestamp = 'accrualBlockTimestamp',
  BlockTimestamp = 'blockTimestamp',
  BorrowIndex = 'borrowIndex',
  BorrowRate = 'borrowRate',
  Cash = 'cash',
  CollateralFactor = 'collateralFactor',
  ExchangeRate = 'exchangeRate',
  Id = 'id',
  InterestRateModelAddress = 'interestRateModelAddress',
  MarketDayData = 'marketDayData',
  Name = 'name',
  ReserveFactor = 'reserveFactor',
  Reserves = 'reserves',
  SupplyRate = 'supplyRate',
  Symbol = 'symbol',
  TotalBorrows = 'totalBorrows',
  TotalInterestAccumulated = 'totalInterestAccumulated',
  TotalInterestAccumulatedExact = 'totalInterestAccumulatedExact',
  TotalSupply = 'totalSupply',
  UnderlyingAddress = 'underlyingAddress',
  UnderlyingDecimals = 'underlyingDecimals',
  UnderlyingName = 'underlyingName',
  UnderlyingPriceUsd = 'underlyingPriceUSD',
  UnderlyingSymbol = 'underlyingSymbol'
}

/**
 * MintEvent stores information for mints. From address will always be a jToken
 * market address
 */
export type MintEvent = JTokenTransfer & {
  __typename?: 'MintEvent';
  amount: Scalars['BigDecimal'];
  blockNumber: Scalars['Int'];
  blockTime: Scalars['Int'];
  from: Scalars['Bytes'];
  id: Scalars['ID'];
  jTokenSymbol: Scalars['String'];
  to: Scalars['Bytes'];
  underlyingAmount?: Maybe<Scalars['BigDecimal']>;
};

export type MintEvent_Filter = {
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  blockTime?: InputMaybe<Scalars['Int']>;
  blockTime_gt?: InputMaybe<Scalars['Int']>;
  blockTime_gte?: InputMaybe<Scalars['Int']>;
  blockTime_in?: InputMaybe<Array<Scalars['Int']>>;
  blockTime_lt?: InputMaybe<Scalars['Int']>;
  blockTime_lte?: InputMaybe<Scalars['Int']>;
  blockTime_not?: InputMaybe<Scalars['Int']>;
  blockTime_not_in?: InputMaybe<Array<Scalars['Int']>>;
  from?: InputMaybe<Scalars['Bytes']>;
  from_contains?: InputMaybe<Scalars['Bytes']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']>>;
  from_not?: InputMaybe<Scalars['Bytes']>;
  from_not_contains?: InputMaybe<Scalars['Bytes']>;
  from_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  jTokenSymbol?: InputMaybe<Scalars['String']>;
  jTokenSymbol_contains?: InputMaybe<Scalars['String']>;
  jTokenSymbol_ends_with?: InputMaybe<Scalars['String']>;
  jTokenSymbol_gt?: InputMaybe<Scalars['String']>;
  jTokenSymbol_gte?: InputMaybe<Scalars['String']>;
  jTokenSymbol_in?: InputMaybe<Array<Scalars['String']>>;
  jTokenSymbol_lt?: InputMaybe<Scalars['String']>;
  jTokenSymbol_lte?: InputMaybe<Scalars['String']>;
  jTokenSymbol_not?: InputMaybe<Scalars['String']>;
  jTokenSymbol_not_contains?: InputMaybe<Scalars['String']>;
  jTokenSymbol_not_ends_with?: InputMaybe<Scalars['String']>;
  jTokenSymbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  jTokenSymbol_not_starts_with?: InputMaybe<Scalars['String']>;
  jTokenSymbol_starts_with?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['Bytes']>;
  to_contains?: InputMaybe<Scalars['Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_not?: InputMaybe<Scalars['Bytes']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  underlyingAmount?: InputMaybe<Scalars['BigDecimal']>;
  underlyingAmount_gt?: InputMaybe<Scalars['BigDecimal']>;
  underlyingAmount_gte?: InputMaybe<Scalars['BigDecimal']>;
  underlyingAmount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  underlyingAmount_lt?: InputMaybe<Scalars['BigDecimal']>;
  underlyingAmount_lte?: InputMaybe<Scalars['BigDecimal']>;
  underlyingAmount_not?: InputMaybe<Scalars['BigDecimal']>;
  underlyingAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum MintEvent_OrderBy {
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  BlockTime = 'blockTime',
  From = 'from',
  Id = 'id',
  JTokenSymbol = 'jTokenSymbol',
  To = 'to',
  UnderlyingAmount = 'underlyingAmount'
}

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accountJToken?: Maybe<AccountJToken>;
  accountJTokenTransaction?: Maybe<AccountJTokenTransaction>;
  accountJTokenTransactions: Array<AccountJTokenTransaction>;
  accountJTokens: Array<AccountJToken>;
  accounts: Array<Account>;
  borrowEvent?: Maybe<BorrowEvent>;
  borrowEvents: Array<BorrowEvent>;
  flashloanEvent?: Maybe<FlashloanEvent>;
  flashloanEvents: Array<FlashloanEvent>;
  joetroller?: Maybe<Joetroller>;
  joetrollers: Array<Joetroller>;
  jtokenTransfer?: Maybe<JTokenTransfer>;
  jtokenTransfers: Array<JTokenTransfer>;
  liquidationDayData?: Maybe<LiquidationDayData>;
  liquidationDayDatas: Array<LiquidationDayData>;
  liquidationEvent?: Maybe<LiquidationEvent>;
  liquidationEvents: Array<LiquidationEvent>;
  market?: Maybe<Market>;
  marketDayData?: Maybe<MarketDayData>;
  marketDayDatas: Array<MarketDayData>;
  markets: Array<Market>;
  mintEvent?: Maybe<MintEvent>;
  mintEvents: Array<MintEvent>;
  redeemEvent?: Maybe<RedeemEvent>;
  redeemEvents: Array<RedeemEvent>;
  repayEvent?: Maybe<RepayEvent>;
  repayEvents: Array<RepayEvent>;
  transferEvent?: Maybe<TransferEvent>;
  transferEvents: Array<TransferEvent>;
  underlyingTransfer?: Maybe<UnderlyingTransfer>;
  underlyingTransfers: Array<UnderlyingTransfer>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAccountJTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAccountJTokenTransactionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAccountJTokenTransactionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AccountJTokenTransaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AccountJTokenTransaction_Filter>;
};


export type QueryAccountJTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AccountJToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AccountJToken_Filter>;
};


export type QueryAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
};


export type QueryBorrowEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBorrowEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BorrowEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BorrowEvent_Filter>;
};


export type QueryFlashloanEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFlashloanEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FlashloanEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FlashloanEvent_Filter>;
};


export type QueryJoetrollerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryJoetrollersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Joetroller_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Joetroller_Filter>;
};


export type QueryJtokenTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryJtokenTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<JTokenTransfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<JTokenTransfer_Filter>;
};


export type QueryLiquidationDayDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryLiquidationDayDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LiquidationDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LiquidationDayData_Filter>;
};


export type QueryLiquidationEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryLiquidationEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LiquidationEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LiquidationEvent_Filter>;
};


export type QueryMarketArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryMarketDayDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryMarketDayDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarketDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MarketDayData_Filter>;
};


export type QueryMarketsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Market_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Market_Filter>;
};


export type QueryMintEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryMintEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MintEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MintEvent_Filter>;
};


export type QueryRedeemEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRedeemEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RedeemEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RedeemEvent_Filter>;
};


export type QueryRepayEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRepayEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RepayEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RepayEvent_Filter>;
};


export type QueryTransferEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTransferEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TransferEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TransferEvent_Filter>;
};


export type QueryUnderlyingTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUnderlyingTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UnderlyingTransfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UnderlyingTransfer_Filter>;
};

/**
 * RedeemEvent stores information for redeems. To address will always be a
 * jToken market address
 */
export type RedeemEvent = JTokenTransfer & {
  __typename?: 'RedeemEvent';
  amount: Scalars['BigDecimal'];
  blockNumber: Scalars['Int'];
  blockTime: Scalars['Int'];
  from: Scalars['Bytes'];
  id: Scalars['ID'];
  jTokenSymbol: Scalars['String'];
  to: Scalars['Bytes'];
  underlyingAmount?: Maybe<Scalars['BigDecimal']>;
};

export type RedeemEvent_Filter = {
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  blockTime?: InputMaybe<Scalars['Int']>;
  blockTime_gt?: InputMaybe<Scalars['Int']>;
  blockTime_gte?: InputMaybe<Scalars['Int']>;
  blockTime_in?: InputMaybe<Array<Scalars['Int']>>;
  blockTime_lt?: InputMaybe<Scalars['Int']>;
  blockTime_lte?: InputMaybe<Scalars['Int']>;
  blockTime_not?: InputMaybe<Scalars['Int']>;
  blockTime_not_in?: InputMaybe<Array<Scalars['Int']>>;
  from?: InputMaybe<Scalars['Bytes']>;
  from_contains?: InputMaybe<Scalars['Bytes']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']>>;
  from_not?: InputMaybe<Scalars['Bytes']>;
  from_not_contains?: InputMaybe<Scalars['Bytes']>;
  from_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  jTokenSymbol?: InputMaybe<Scalars['String']>;
  jTokenSymbol_contains?: InputMaybe<Scalars['String']>;
  jTokenSymbol_ends_with?: InputMaybe<Scalars['String']>;
  jTokenSymbol_gt?: InputMaybe<Scalars['String']>;
  jTokenSymbol_gte?: InputMaybe<Scalars['String']>;
  jTokenSymbol_in?: InputMaybe<Array<Scalars['String']>>;
  jTokenSymbol_lt?: InputMaybe<Scalars['String']>;
  jTokenSymbol_lte?: InputMaybe<Scalars['String']>;
  jTokenSymbol_not?: InputMaybe<Scalars['String']>;
  jTokenSymbol_not_contains?: InputMaybe<Scalars['String']>;
  jTokenSymbol_not_ends_with?: InputMaybe<Scalars['String']>;
  jTokenSymbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  jTokenSymbol_not_starts_with?: InputMaybe<Scalars['String']>;
  jTokenSymbol_starts_with?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['Bytes']>;
  to_contains?: InputMaybe<Scalars['Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_not?: InputMaybe<Scalars['Bytes']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  underlyingAmount?: InputMaybe<Scalars['BigDecimal']>;
  underlyingAmount_gt?: InputMaybe<Scalars['BigDecimal']>;
  underlyingAmount_gte?: InputMaybe<Scalars['BigDecimal']>;
  underlyingAmount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  underlyingAmount_lt?: InputMaybe<Scalars['BigDecimal']>;
  underlyingAmount_lte?: InputMaybe<Scalars['BigDecimal']>;
  underlyingAmount_not?: InputMaybe<Scalars['BigDecimal']>;
  underlyingAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum RedeemEvent_OrderBy {
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  BlockTime = 'blockTime',
  From = 'from',
  Id = 'id',
  JTokenSymbol = 'jTokenSymbol',
  To = 'to',
  UnderlyingAmount = 'underlyingAmount'
}

/**
 * RepayEvent stores information for repays. Payer is not always the same as
 * borrower, such as in the event of a Liquidation
 */
export type RepayEvent = UnderlyingTransfer & {
  __typename?: 'RepayEvent';
  accountBorrows: Scalars['BigDecimal'];
  amount: Scalars['BigDecimal'];
  blockNumber: Scalars['Int'];
  blockTime: Scalars['Int'];
  borrower: Scalars['Bytes'];
  id: Scalars['ID'];
  payer: Scalars['Bytes'];
  underlyingSymbol: Scalars['String'];
};

export type RepayEvent_Filter = {
  accountBorrows?: InputMaybe<Scalars['BigDecimal']>;
  accountBorrows_gt?: InputMaybe<Scalars['BigDecimal']>;
  accountBorrows_gte?: InputMaybe<Scalars['BigDecimal']>;
  accountBorrows_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  accountBorrows_lt?: InputMaybe<Scalars['BigDecimal']>;
  accountBorrows_lte?: InputMaybe<Scalars['BigDecimal']>;
  accountBorrows_not?: InputMaybe<Scalars['BigDecimal']>;
  accountBorrows_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  blockTime?: InputMaybe<Scalars['Int']>;
  blockTime_gt?: InputMaybe<Scalars['Int']>;
  blockTime_gte?: InputMaybe<Scalars['Int']>;
  blockTime_in?: InputMaybe<Array<Scalars['Int']>>;
  blockTime_lt?: InputMaybe<Scalars['Int']>;
  blockTime_lte?: InputMaybe<Scalars['Int']>;
  blockTime_not?: InputMaybe<Scalars['Int']>;
  blockTime_not_in?: InputMaybe<Array<Scalars['Int']>>;
  borrower?: InputMaybe<Scalars['Bytes']>;
  borrower_contains?: InputMaybe<Scalars['Bytes']>;
  borrower_in?: InputMaybe<Array<Scalars['Bytes']>>;
  borrower_not?: InputMaybe<Scalars['Bytes']>;
  borrower_not_contains?: InputMaybe<Scalars['Bytes']>;
  borrower_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  payer?: InputMaybe<Scalars['Bytes']>;
  payer_contains?: InputMaybe<Scalars['Bytes']>;
  payer_in?: InputMaybe<Array<Scalars['Bytes']>>;
  payer_not?: InputMaybe<Scalars['Bytes']>;
  payer_not_contains?: InputMaybe<Scalars['Bytes']>;
  payer_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  underlyingSymbol?: InputMaybe<Scalars['String']>;
  underlyingSymbol_contains?: InputMaybe<Scalars['String']>;
  underlyingSymbol_ends_with?: InputMaybe<Scalars['String']>;
  underlyingSymbol_gt?: InputMaybe<Scalars['String']>;
  underlyingSymbol_gte?: InputMaybe<Scalars['String']>;
  underlyingSymbol_in?: InputMaybe<Array<Scalars['String']>>;
  underlyingSymbol_lt?: InputMaybe<Scalars['String']>;
  underlyingSymbol_lte?: InputMaybe<Scalars['String']>;
  underlyingSymbol_not?: InputMaybe<Scalars['String']>;
  underlyingSymbol_not_contains?: InputMaybe<Scalars['String']>;
  underlyingSymbol_not_ends_with?: InputMaybe<Scalars['String']>;
  underlyingSymbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  underlyingSymbol_not_starts_with?: InputMaybe<Scalars['String']>;
  underlyingSymbol_starts_with?: InputMaybe<Scalars['String']>;
};

export enum RepayEvent_OrderBy {
  AccountBorrows = 'accountBorrows',
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  BlockTime = 'blockTime',
  Borrower = 'borrower',
  Id = 'id',
  Payer = 'payer',
  UnderlyingSymbol = 'underlyingSymbol'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accountJToken?: Maybe<AccountJToken>;
  accountJTokenTransaction?: Maybe<AccountJTokenTransaction>;
  accountJTokenTransactions: Array<AccountJTokenTransaction>;
  accountJTokens: Array<AccountJToken>;
  accounts: Array<Account>;
  borrowEvent?: Maybe<BorrowEvent>;
  borrowEvents: Array<BorrowEvent>;
  flashloanEvent?: Maybe<FlashloanEvent>;
  flashloanEvents: Array<FlashloanEvent>;
  joetroller?: Maybe<Joetroller>;
  joetrollers: Array<Joetroller>;
  jtokenTransfer?: Maybe<JTokenTransfer>;
  jtokenTransfers: Array<JTokenTransfer>;
  liquidationDayData?: Maybe<LiquidationDayData>;
  liquidationDayDatas: Array<LiquidationDayData>;
  liquidationEvent?: Maybe<LiquidationEvent>;
  liquidationEvents: Array<LiquidationEvent>;
  market?: Maybe<Market>;
  marketDayData?: Maybe<MarketDayData>;
  marketDayDatas: Array<MarketDayData>;
  markets: Array<Market>;
  mintEvent?: Maybe<MintEvent>;
  mintEvents: Array<MintEvent>;
  redeemEvent?: Maybe<RedeemEvent>;
  redeemEvents: Array<RedeemEvent>;
  repayEvent?: Maybe<RepayEvent>;
  repayEvents: Array<RepayEvent>;
  transferEvent?: Maybe<TransferEvent>;
  transferEvents: Array<TransferEvent>;
  underlyingTransfer?: Maybe<UnderlyingTransfer>;
  underlyingTransfers: Array<UnderlyingTransfer>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAccountJTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAccountJTokenTransactionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAccountJTokenTransactionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AccountJTokenTransaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AccountJTokenTransaction_Filter>;
};


export type SubscriptionAccountJTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AccountJToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AccountJToken_Filter>;
};


export type SubscriptionAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
};


export type SubscriptionBorrowEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBorrowEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BorrowEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BorrowEvent_Filter>;
};


export type SubscriptionFlashloanEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFlashloanEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FlashloanEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FlashloanEvent_Filter>;
};


export type SubscriptionJoetrollerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionJoetrollersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Joetroller_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Joetroller_Filter>;
};


export type SubscriptionJtokenTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionJtokenTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<JTokenTransfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<JTokenTransfer_Filter>;
};


export type SubscriptionLiquidationDayDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionLiquidationDayDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LiquidationDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LiquidationDayData_Filter>;
};


export type SubscriptionLiquidationEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionLiquidationEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LiquidationEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LiquidationEvent_Filter>;
};


export type SubscriptionMarketArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionMarketDayDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionMarketDayDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarketDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MarketDayData_Filter>;
};


export type SubscriptionMarketsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Market_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Market_Filter>;
};


export type SubscriptionMintEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionMintEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MintEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MintEvent_Filter>;
};


export type SubscriptionRedeemEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRedeemEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RedeemEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RedeemEvent_Filter>;
};


export type SubscriptionRepayEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRepayEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RepayEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RepayEvent_Filter>;
};


export type SubscriptionTransferEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTransferEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TransferEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TransferEvent_Filter>;
};


export type SubscriptionUnderlyingTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUnderlyingTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UnderlyingTransfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UnderlyingTransfer_Filter>;
};

/**
 * TransferEvent will be stored for every mint, redeem, liquidation, and any normal
 * transfer between two accounts.
 */
export type TransferEvent = JTokenTransfer & {
  __typename?: 'TransferEvent';
  amount: Scalars['BigDecimal'];
  blockNumber: Scalars['Int'];
  blockTime: Scalars['Int'];
  from: Scalars['Bytes'];
  id: Scalars['ID'];
  jTokenSymbol: Scalars['String'];
  to: Scalars['Bytes'];
};

export type TransferEvent_Filter = {
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  blockTime?: InputMaybe<Scalars['Int']>;
  blockTime_gt?: InputMaybe<Scalars['Int']>;
  blockTime_gte?: InputMaybe<Scalars['Int']>;
  blockTime_in?: InputMaybe<Array<Scalars['Int']>>;
  blockTime_lt?: InputMaybe<Scalars['Int']>;
  blockTime_lte?: InputMaybe<Scalars['Int']>;
  blockTime_not?: InputMaybe<Scalars['Int']>;
  blockTime_not_in?: InputMaybe<Array<Scalars['Int']>>;
  from?: InputMaybe<Scalars['Bytes']>;
  from_contains?: InputMaybe<Scalars['Bytes']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']>>;
  from_not?: InputMaybe<Scalars['Bytes']>;
  from_not_contains?: InputMaybe<Scalars['Bytes']>;
  from_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  jTokenSymbol?: InputMaybe<Scalars['String']>;
  jTokenSymbol_contains?: InputMaybe<Scalars['String']>;
  jTokenSymbol_ends_with?: InputMaybe<Scalars['String']>;
  jTokenSymbol_gt?: InputMaybe<Scalars['String']>;
  jTokenSymbol_gte?: InputMaybe<Scalars['String']>;
  jTokenSymbol_in?: InputMaybe<Array<Scalars['String']>>;
  jTokenSymbol_lt?: InputMaybe<Scalars['String']>;
  jTokenSymbol_lte?: InputMaybe<Scalars['String']>;
  jTokenSymbol_not?: InputMaybe<Scalars['String']>;
  jTokenSymbol_not_contains?: InputMaybe<Scalars['String']>;
  jTokenSymbol_not_ends_with?: InputMaybe<Scalars['String']>;
  jTokenSymbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  jTokenSymbol_not_starts_with?: InputMaybe<Scalars['String']>;
  jTokenSymbol_starts_with?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['Bytes']>;
  to_contains?: InputMaybe<Scalars['Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_not?: InputMaybe<Scalars['Bytes']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum TransferEvent_OrderBy {
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  BlockTime = 'blockTime',
  From = 'from',
  Id = 'id',
  JTokenSymbol = 'jTokenSymbol',
  To = 'to'
}

/**
 * Underlying transfers are transfers of underlying collateral for both borrows
 * and repays
 */
export type UnderlyingTransfer = {
  accountBorrows: Scalars['BigDecimal'];
  amount: Scalars['BigDecimal'];
  blockNumber: Scalars['Int'];
  blockTime: Scalars['Int'];
  borrower: Scalars['Bytes'];
  id: Scalars['ID'];
  underlyingSymbol: Scalars['String'];
};

export type UnderlyingTransfer_Filter = {
  accountBorrows?: InputMaybe<Scalars['BigDecimal']>;
  accountBorrows_gt?: InputMaybe<Scalars['BigDecimal']>;
  accountBorrows_gte?: InputMaybe<Scalars['BigDecimal']>;
  accountBorrows_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  accountBorrows_lt?: InputMaybe<Scalars['BigDecimal']>;
  accountBorrows_lte?: InputMaybe<Scalars['BigDecimal']>;
  accountBorrows_not?: InputMaybe<Scalars['BigDecimal']>;
  accountBorrows_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  blockTime?: InputMaybe<Scalars['Int']>;
  blockTime_gt?: InputMaybe<Scalars['Int']>;
  blockTime_gte?: InputMaybe<Scalars['Int']>;
  blockTime_in?: InputMaybe<Array<Scalars['Int']>>;
  blockTime_lt?: InputMaybe<Scalars['Int']>;
  blockTime_lte?: InputMaybe<Scalars['Int']>;
  blockTime_not?: InputMaybe<Scalars['Int']>;
  blockTime_not_in?: InputMaybe<Array<Scalars['Int']>>;
  borrower?: InputMaybe<Scalars['Bytes']>;
  borrower_contains?: InputMaybe<Scalars['Bytes']>;
  borrower_in?: InputMaybe<Array<Scalars['Bytes']>>;
  borrower_not?: InputMaybe<Scalars['Bytes']>;
  borrower_not_contains?: InputMaybe<Scalars['Bytes']>;
  borrower_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  underlyingSymbol?: InputMaybe<Scalars['String']>;
  underlyingSymbol_contains?: InputMaybe<Scalars['String']>;
  underlyingSymbol_ends_with?: InputMaybe<Scalars['String']>;
  underlyingSymbol_gt?: InputMaybe<Scalars['String']>;
  underlyingSymbol_gte?: InputMaybe<Scalars['String']>;
  underlyingSymbol_in?: InputMaybe<Array<Scalars['String']>>;
  underlyingSymbol_lt?: InputMaybe<Scalars['String']>;
  underlyingSymbol_lte?: InputMaybe<Scalars['String']>;
  underlyingSymbol_not?: InputMaybe<Scalars['String']>;
  underlyingSymbol_not_contains?: InputMaybe<Scalars['String']>;
  underlyingSymbol_not_ends_with?: InputMaybe<Scalars['String']>;
  underlyingSymbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  underlyingSymbol_not_starts_with?: InputMaybe<Scalars['String']>;
  underlyingSymbol_starts_with?: InputMaybe<Scalars['String']>;
};

export enum UnderlyingTransfer_OrderBy {
  AccountBorrows = 'accountBorrows',
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  BlockTime = 'blockTime',
  Borrower = 'borrower',
  Id = 'id',
  UnderlyingSymbol = 'underlyingSymbol'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type AccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type AccountsQuery = { __typename?: 'Query', accounts: Array<{ __typename?: 'Account', id: string, health: any, totalBorrowValueInUSD: any, totalCollateralValueInUSD: any }> };
