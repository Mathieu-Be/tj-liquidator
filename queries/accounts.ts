import { GraphQLClient, gql } from "graphql-request";
import { Account } from "../graphql/generated";

const client = new GraphQLClient(
  "https://api.thegraph.com/subgraphs/name/traderjoe-xyz/lending",
  { headers: {} }
);

const getAccountsQueryDocument = gql`
  query Accounts {
    accounts(
      where: { health_gt: 0, health_lt: 1, totalBorrowValueInUSD_gt: 0 }
    ) {
      id
      health
      totalBorrowValueInUSD
      totalCollateralValueInUSD
      tokens {
        symbol
        supplyBalanceUnderlying
        borrowBalanceUnderlying
        enteredMarket
      }
    }
  }
`;

export const Accounts = async (): Promise<Account[]> => {
  return client.request(getAccountsQueryDocument);
};
