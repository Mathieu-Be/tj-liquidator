# Trader Joe Liquidator

1. Monitor underwater accounts via TraderJoe lending subgraph. I used codegen and the subgraph schema to generates types for the query return.
2. Determine the best target for liquidation and which assets to repay and seize using a recursive function.
3. Trigger the liquidate method from my contract.
4. Keeps profits in wAvax so I can withdraw them from time to time to pay for the fees.

## Installation

```
npm install
npx run codegen
npx hardhat compile
```

## Smart Contract Flow

I send my smart contract the liquidated, collateral and flashloan token, and the amount that I want to liquidate.

I use wAvax as much as I can for the flashloan as it is easier to swap it with the others tokens. When I can't, I use USDC.e ou USDT.e, the two biggest pools on TJ for lower slippage.

I determine how much token I need to borrow, then engage the flashloan. Flashloan token is swapped to repay borrow. I swap the collateral seized in wAvax first, then swap the necessary amount to the repay the flashloan.

## Monitoring

I love Grafana so I have set up a basic Grafana display to monitor all the flashloan attempts. I use my InfluxDB instance to store the data. These are not real profits sadly, I obtained them while running my liquidation-from-contract script with the TimeTravel option set to true.

## Credits

I use the solidity boilerplate from https://github.com/ava-labs/avalanche-smart-contract-quickstart, to which I also added typechain.

https://github.com/Max-3-7/liquidation-bot-monitoring has been helpful to get started.
