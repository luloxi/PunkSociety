Social dapp where interactions are monetized 💰 allowing users to earn through engaging with their community 🫂.

# 🤘 Features

> NOTE: This is a work in progress and most features are not yet implemented.

- ⛓️ **Avalanche L1 with USDC as native gas**
- 💸 **When bridged to PunkSociety, USDC earns interest on AAVE**
- 💰 **Social monetization**: Likes, comments, shares and follows send USDC to the user on the other end
- 📈 **Revenue dashboard**: Users can track and analyze their earnings

- 🤹‍♂️ **Post types**: Posts can have text, image, audio, video, links and polls
- 🔔 **Notifications**: Receive alerts on activity
- 💌 **Messaging**: Direct messaging and group chat features
- 🎨 **Profile customization**: Users can customize their profile and post collections

- 📱 **Web 2.5 login**: Social login options with Web2 platforms (Google, Twitter, etc.)
- 🌐 **Multi-chain support**: Bridge your posts as NFTs to Avalanche L0 and other chains to access NFT markets
- 🎧 **Accessibility support**: ARIA compliant for screen readers and other assistive technologies
- 📚 **Educational content**: Onboarding tutorials and step-by-step guides

# 🤘 Roadmap

📥 To see pending project tasks, [see this Trello](https://trello.com/b/HLBnvKSu/punksociety)

## 🐣 Phase 1 (MVP)

- ✅ **Create PunkPosts contract**
- ✅ **Create PunkProfile contract to register users info and socials**
- ✅ **PunkSociety contract:** Social interactions
- ✅ **Post creation tool**
- ✅ **User profile page**
- ✅ **Search**: By address or username
- ✅ Enable options for sharing on other platforms
- ✅ **Avalanche L1 with USDC as native gas:** Use an Avalanche L1 with USDC as native gas (Reference: [Create an Avalanche L1](https://docs.avax.network/tooling/create-deploy-avalanche-l1s/create-avalanche-l1))
- Enable following users, liking, commenting and sharing posts on frontend
- **Individual post viewer**

## 📈 Phase 2 (Business model)

- **Incentive model**: Social interactions send $ to the user on the other end
- **Built-in bridge manager**: Built-in simple tool for bridging USDC and NFTs to and from Avalanche, Base, Ethereum, and other EVM chains (Reference: [avalanche-interchain-token-transfer](https://github.com/ava-labs/avalanche-interchain-token-transfer) | [Chainlink CCIP Cross Chain Tokens](https://docs.chain.link/ccip/tutorials/cross-chain-tokens))
- **Staking**: Bridged USDC goes to lending on AAVE so users can earn interest on their USDC while using the platform
- **Dashboard Insights**: Track and analyze your revenue
- **Easy onramp tool**: Easy USDC buying tool for onboarding new users. (Reference:[FundButton from Coinbase](https://onchainkit.xyz/fund/fund-button) | [OnchainKit extension for Scaffold-ETH 2](https://github.com/scaffold-eth/create-eth-extensions/tree/onchainkit))
- **Business Model**: PunkSociety collects 1% fees from social interactions and from USDC lending revenue

## 🌐 Phase 3 (Indexing)

- **Integrate The Graph to index activity** and save RPC calls (Reference: [Bootstrap a Full Stack Modern dapp using the Scaffold-ETH CLI and Subgraph Extension](https://siddhantk08.hashnode.dev/bootstrap-a-full-stack-modern-dapp-using-the-scaffold-eth-cli-and-subgraph-extension) | [The Graph tool for creating a subgraph](https://thegraph.com/docs/en/developing/creating-a-subgraph/))
- **Notification system**
- Search by post content

## 💬 Phase 4 (Social enhancement)

- **Direct messages:** Allow users to send private messages to each other (Reference [Push Protocol](https://push.org/))
- Enable audio, video and links with preview type of posts
- **Polls**: Allow users to create polls
- **Customization**: Allow users to customize their profile appearance
- **Collections**: Create and share collections of posts
- **Groups**: Allow users to create and join groups with custom chat and newfeed
- **Categories**: Allow users to categorize their posts, filter by category and search by category

## 👨‍🦽 Phase 5 (Ease of use)

- **Web 2.5 social login:** Sign up and log in with Google, Twitter, Instagram, etc
- **Multi-language support**: Switch between languages
- **Accesibility support**: For the hearing and visually impaired, the app should be ARIA compliant to support screen readers and other assistive technologies (Reference: [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA))
- **Educational Content**: Include onboarding tutorials and step-by-step guides to help users understand what they can do on the platform

# 🤘 Development

📥 To see pending development tasks, [see this Trello](https://trello.com/b/HLBnvKSu/punksociety)

## 🛠️ Technical details

⚙️ Built using Foundry, NextJS, RainbowKit, Wagmi, Viem, and Typescript,

🔗 To be deployed on EVM compatible chains

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

It'd be ideal to run it with one command like `yarn avalanche`, but so far, you gotta [follow this instructions](./AVALANCHE-L1.md).

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
