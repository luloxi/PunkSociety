Social protocol where interactions are monetized 💰 allowing users to earn through engaging with their community 🫂.

❓ To know what this project aims to be, [read the about page](https://punksociety.xyz/about).

📥 Pending development tasks [on this Trello board](https://trello.com/b/HLBnvKSu/punksociety)

# 🤘 Development

## 🛠️ Technical details

⚙️ Currently built using [Scaffold-ETH 2](https://scaffoldeth.io/), [Foundry](https://book.getfoundry.sh/), [OnchainKit](https://onchainkit.xyz/), [Pinata](https://pinata.cloud/), [Vercel](https://vercel.com/), [NextJS](https://nextjs.org/), [RainbowKit](https://rainbowkit.com/), [Wagmi](https://wagmi.sh/), [Viem](https://viem.sh/), and [Typescript](https://www.typescriptlang.org/).

🏦 Considering using protocols: [Circle USDC](https://www.circle.com/) as native gas, [The Graph](https://thegraph.com/) for indexing events, [AAVE](https://aave.com/) for earning interest on USDC, [Chainlink](https://chain.link/) for cross-chain NFT bridging.

📜 Considering using contracts: ERC721, [Ownable](https://docs.openzeppelin.com/contracts/2.x/access-control) and [Upgradeable](https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable) from [Solady](https://github.com/Vectorized/solady) for contract ownership. And maybe [EIP712 Signatures](https://eips.ethereum.org/EIPS/eip-712) for some gasless activity.

🔗 To be deployed on [Avalanche L1](https://github.com/ava-labs/avalanche-starter-kit) and Bridge [ERC20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) and [ERC721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/) using [Avalanche Interchain Token Transfer](https://github.com/ava-labs/avalanche-interchain-token-transfer) and [Chainlink CCIP Transfer Tokens](https://docs.chain.link/ccip/tutorials/cross-chain-tokens) with [EVM compatible chains](https://ethereum.org/en/developers/docs/scaling/sidechains/#evm-compatibility).

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

2. Duplicate and rename `packages/foundry/.env.example` to `packages/foundry/.env`

> NOTE: `ETHERSCAN_API_KEY` and `ALCHEMY_API_KEY` are not required until you deploy to a live EVM like Avalanche, Base, Ethereum, etc.

3. Rename the `.env.example` to `.env` in the `packages/nextjs` folder. For each variable, follow the instructions above the variable.

4. Start a local Avalanche L1:

It'd be ideal to run it with one command like `yarn subnet` with a config file, but so far, you gotta **[follow this instructions](./AVALANCHE-L1.md)**.

You'll start a local Avalanche L1 using [Ava Labs avalanche-starter-kit](https://github.com/ava-labs/avalanche-starter-kit). The network runs on your local machine and can be used for testing and development.

5. Open a terminal, navigate to `PunkSociety` and run this command to deploy the contracts:

```
yarn deploy
```

This command deploys a PunkSociety contracts to your Avalanche L1.

> NOTE: Contracts are located in `packages/foundry/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/foundry/script/Deploy.s.sol` to deploy the contract to the network. You can also customize the deploy script.

> NOTE 2: To deploy to a different network, you can run `yarn deploy --network <network-name>`. For example, to deploy to the Ethereum network, you can run `yarn deploy --network ethereum`.

6. Open a second terminal, navigate to `PunkSociety` and run this command to start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`.

> NOTE: You can interact with your smart contract on `http://localhost:3000/debug` and see a local block explorer on `http://localhost:3000/blockexplorer`
