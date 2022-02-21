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

export const AccountsToLiquidate = async (
  health_gt: number,
  health_lt: number
) => {
  const params = { health_gt: health_gt, health_lt: health_lt };

  const response: Subscription = await client.request(
    AccountsToLiquidateQueryDocument,
    params
  );

  return response.accounts;
};
