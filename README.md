Social protocol where interactions are monetized 💰 allowing users to earn through engaging with their community 🫂.

❓ To know what this project aims to be, [read the about page](https://punksociety.xyz/about).

📥 Pending development tasks [on this Trello board](https://trello.com/b/HLBnvKSu/punksociety)

# 🤘 Development

## 🛠️ Technical details

⚙️ Currently built using [Scaffold-ETH 2](https://scaffoldeth.io/), [Foundry](https://book.getfoundry.sh/), [Pinata](https://pinata.cloud/), [Vercel](https://vercel.com/), [NextJS](https://nextjs.org/), [RainbowKit](https://rainbowkit.com/), [Wagmi](https://wagmi.sh/), [Viem](https://viem.sh/), and [Typescript](https://www.typescriptlang.org/).

🏦 Considering using protocols: [Circle USDC](https://www.circle.com/), [The Graph](https://thegraph.com/), [Chainlink](https://chain.link/).

📜 Considering using contracts: ERC721, [Ownable](https://docs.openzeppelin.com/contracts/2.x/access-control) and [Upgradeable](https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable) from [Solady](https://github.com/Vectorized/solady) for contract ownership.

🔗 To be deployed on EVM compatible chains.

## 📚 Prerequisites

- [Node (>= v18.17)](https://nodejs.org/en/download/package-manager)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/#windows-stable) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)
- [Foundry](https://book.getfoundry.sh/getting-started/installation)

## 👨‍🏫 Instructions

To get started follow the steps below:

1. Open a terminal and run this commands to clone this repo and install dependencies:

```
git clone https://github.com/luloxi/PunkSociety.git
cd PunkSociety
yarn install
```

2. Rename the `.env.example` to `.env` in the `packages/nextjs` folder. For each variable, follow the instructions above the variable.

3. Run this command to start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`.

> NOTE: You can interact with your smart contracts on `http://localhost:3000/debug` and see a local block explorer on `http://localhost:3000/blockexplorer`

### 🚀 Testing on a local network

1. Open a second terminal, navigate to `PunkSociety` and run this command to start a local chain:

```
yarn chain
```

> NOTE: To test using your own Avalanche L1, **[follow this instructions](./AVALANCHE-L1.md)**.

2. Duplicate and rename `packages/foundry/.env.example` to `packages/foundry/.env`. Fill the `DEPLOYER_PRIVATE_KEY` with the private key of the account you want to use to deploy the contracts. Remember to append `0x` at the beginning of the private key.

> NOTE: `ETHERSCAN_API_KEY` and `ALCHEMY_API_KEY` are not required until you deploy to a live EVM like Avalanche, Base, Ethereum, etc.

3. Open a terminal, navigate to `PunkSociety` and run this command to deploy the contracts:

```
yarn deploy
```

> NOTE: Contracts are located in `packages/foundry/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/foundry/script/Deploy.s.sol` to deploy the contract to the network. You can also customize the deploy script.

> NOTE 2: To deploy to a different network, you can run `yarn deploy --network <network-name>`. For example, to deploy to the Ethereum network, you can run `yarn deploy --network ethereum`.

4. Go to `packages/nextjs/scaffold.config.ts` and change the `targetNetworks` to `[chains.foundry]`.
