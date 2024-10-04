🐰 PunkSociety is an social dapp 🫂 that allows users to monetize 🛒 their posts 💬.

- 🤹‍♂️ Posts can have text, image, audio, video and links.
- 💬 Posting, liking, commenting, sharing and 🫂 following are ⛽ gasless operations.
- 🍀 Incentivized Minting: Users posts can be optionally minted as NFTs. Creators get income from mints of their posts. First minters of a post earn a share of future minting revenue.
- 🛒 Shopping cart: To streamline the user experience, collectors can mint multiple NFTs in a single transaction.
- 🔔 Receive notifications on activity.
- 💌 Message other users.
- 🎨 Customizable profile colors and layout.
- 📚 Built-in guides to help users understand Web3 and NFT minting.
- 🧑‍🦽 Accessibility for visually impaired users.

# 🤘 Roadmap

## 🐣 Phase 1 (MVP)

- ✅ **Create PunkPosts contract**
- ✅ **Create ProfileInfo contract for users to register their info**
- ✅ **Post creation page**
- ✅ **User profile page**
- ✅ **View other users profiles**

## 👥 Phase 2 (Social Activity and Indexing)

- **Search**: By address, ENS or username
- **Social features:** Following users, liking, commenting and sharing posts.
- **Integrate The Graph to index activity** and save RPC calls (Reference: [Bootstrap a Full Stack Modern dapp using the Scaffold-ETH CLI and Subgraph Extension](https://siddhantk08.hashnode.dev/bootstrap-a-full-stack-modern-dapp-using-the-scaffold-eth-cli-and-subgraph-extension) | [The Graph tool for creating a subgraph](https://thegraph.com/docs/en/developing/creating-a-subgraph/))
- **Individual post pages** for displaying long texts and big images
- **Notification system**

## ✍️ Phase 3 (Gasless activity)

- **Signatures:** Allow users to interact with the platform without paying gas fees
- **Database:** To store and retrieve EIP 712 signatures (Reference: [SE-2 firebase-auth-extension](https://github.com/ByteAtATime/firebase-auth-extension))
- **Whitelist:** Optional system to validate users to prevent spam

## 🍀 Phase 4 (Incentivized minting)

- **Optional Tokenization with Incentivized Minting**: Users can post for free (gasless). The first user to mint a post as an NFT, if not the creator, is incentivized by receiving a share of the revenue from subsequent mints, creating an incentive for early minting.
- **Dashboard Insights**: Track and analyze minting revenue.
- **Revenue Model**: PunkSociety collects fees from mints.

## 🎨 Phase 5 (Customization and ease of use)

- **Post Collections**: Create and share collections on galleries visibles from user profiles.
- **Profile Customization**: Users can customize colors and profile appearance.
- **Shopping cart**: To reduce gas fees and streamline the user experience, collectors can buy multiple NFTs in a single transaction.
- **Educational Content**: Include onboarding tutorials and step-by-step guides to help users and collectors understand NFTs and Web3 concepts.

## 💌 Phase 6 (Direct messages)

- **Direct messages:** Allow users to send private messages to each other

## 🧑‍🦽 Phase 7 (Accessibility)

- **Accessibility support**: Website must be [ARIA compliant](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)

# 🤘 Development

## 🛠️ Technical details

⚙️ Built using Foundry, NextJS, RainbowKit, Wagmi, Viem, and Typescript,

🔗 To be deployed on EVM compatible chains

📥 To see current development tasks, [see here](https://lulox.notion.site/PunkSociety-3458ad216e8c40a9b4489fe026146552?pvs=74)

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

2. After everything is installed, run this command to start a local blockchain network:

```
yarn chain
```

This command starts a local Ethereum network using Foundry. The network runs on your local machine and can be used for testing and development.

3. Duplicate and rename `packages/foundry/.env.example` to `packages/foundry/.env` (you don't need to fill it out until deploying to a live network)

4. Open a second terminal, navigate to `PunkSociety` and run this command to deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/foundry/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/foundry/script/Deploy.s.sol` to deploy the contract to the network. You can also customize the deploy script.

5. Go to `packages/nextjs/scaffold.config.ts` and comment out `targetNetworks: [chains.arbitrum]` and uncomment `targetNetworks: [chains.foundry]`

6. Open a third terminal, navigate to `PunkSociety` and run this command to start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page.
