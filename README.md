Social dapp that allows users to monetize 💰 their social activity 🫂.

- 💬 We don't show ads
- 📊 We don't sell your data

# 🤘 Features

- 🤹‍♂️ Posts can have text, image, audio, video and links.
- 💰 Liking, commenting and sharing send $ to the user on the other end
- 📈 Track and analyze revenue on your dashboard.
- 🛒 Shopping cart: Do multiple actions in a single transaction.
- 🔔 Receive notifications on activity.
- 💌 Message other users.

# 🤘 Roadmap

## 🐣 Phase 1 (MVP)

- ✅ **Create PunkPosts contract**
- ✅ **Create PunkProfile contract to register users info and socials**
- ✅ **Post creation tool**
- ✅ **User profile page**

## 👥 Phase 2 (Social Activity and Indexing)

- **PunkSociety contract:** Following users, liking, commenting and sharing posts.
- **Search**: By address or username
- **Notification system**
- **Integrate The Graph to index activity** and save RPC calls (Reference: [Bootstrap a Full Stack Modern dapp using the Scaffold-ETH CLI and Subgraph Extension](https://siddhantk08.hashnode.dev/bootstrap-a-full-stack-modern-dapp-using-the-scaffold-eth-cli-and-subgraph-extension) | [The Graph tool for creating a subgraph](https://thegraph.com/docs/en/developing/creating-a-subgraph/))
- Enable audio, video and links with preview type of posts.
- **Individual post viewer**

## 🍀 Phase 3 (Incentivized socials)

- **Incentive model**: Likes, comments and shares send $ to the user on the other end.
- **Dashboard Insights**: Track and analyze revenue.
- **Revenue Model**: PunkSociety collects fees from interactions.

## 💌 Phase 4 (Direct messages)

- **Direct messages:** Allow users to send private messages to each other

## 🎨 Phase 5 (Ease of use)

- **Shopping cart**: To reduce gas fees and streamline the user experience, users can send multiple actions in a single transaction.
- **Educational Content**: Include onboarding tutorials and step-by-step guides to help users and collectors understand NFTs and Web3 concepts.

## ✍️ Phase 6 (Gasless activity)

- **Signatures:** Allow users to interact with the platform without paying gas fees
- **Database:** To store and retrieve EIP 712 signatures (Reference: [SE-2 firebase-auth-extension](https://github.com/ByteAtATime/firebase-auth-extension))

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

6. Rename the `.env.example` to `.env` in the `packages/nextjs` folder. [Log in or Create an account on Pinata](https://app.pinata.cloud/signin), then create a new project, and copy the API Key and the Secret API Key into the `.env` file's `NEXT_PUBLIC_PINATA_API_KEY` and `NEXT_PUBLIC_PINATA_SECRET_API_KEY` variables and save the file.

7. Open a third terminal, navigate to `PunkSociety` and run this command to start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page.
