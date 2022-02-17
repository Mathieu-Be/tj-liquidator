import { GraphQLClient, gql } from "graphql-request";
import { Account, Subscription } from "./generated";

const client = new GraphQLClient(
  "https://api.thegraph.com/subgraphs/name/traderjoe-xyz/lending",
  { headers: {} }
);

const AccountsToLiquidateQueryDocument = gql`
  query AccountsToLiquidate(
    $health_gt: BigDecimal = 0
    $health_lt: BigDecimal = 1
  ) {
    accounts(
      where: {
        health_gt: $health_gt
        health_lt: $health_lt
        totalBorrowValueInUSD_gt: 0
      }
    ) {
      id
      health
      totalBorrowValueInUSD
      totalCollateralValueInUSD
      tokens {
        symbol
        id
        supplyBalanceUnderlying
        borrowBalanceUnderlying
        enteredMarket
      }
    }
  }
`;

let params = { health_gt: 0, health_lt: 1 };

export const AccountsToLiquidate = async (
  health_gt: number,
  health_lt: number
) => {
  let response: Subscription = await client.request(
    AccountsToLiquidateQueryDocument,
    params
  );

  return response.accounts;
};
