🤘 PunkSociety is a forkable social dapp 🫂 💬.

# 🤘 About the platform

**🫂 Social**: Follow and message other users. Like, comment and share posts. Receive notifications on activity.
**💬 Posts**: Can have text, image, audio, video, and links with preview.

# 🤘 Roadmap

## 🐣 Phase 1 (MVP)

### 🫂 Social

- ✅ **Add a way for users to register their info**
- ✅ **Add a user profile**
- **Search for other users** by address and username
- **Individual post pages** for displaying large descriptions, videos and big images

### 💬 Posts (NFTs)

- ✅ **Create PunkPosts contract**
- ✅ **Add audio to NFTs metadata** (Reference: [OpenSea metadata-standards](https://docs.opensea.io/docs/metadata-standards))
- ✅ **Page for creating posts** (ideally make it a modal on the homepage)
- ✅ **Display metadata preview** before minting

## 🌐 Phase 2 (Social Activity and Indexing)

- **Social features:** Following users, liking, commenting and sharing posts.
- **Integrate The Graph to index posts** and save RPC calls (Reference: [Bootstrap a Full Stack Modern dapp using the Scaffold-ETH CLI and Subgraph Extension](https://siddhantk08.hashnode.dev/bootstrap-a-full-stack-modern-dapp-using-the-scaffold-eth-cli-and-subgraph-extension))

## ✍️ Phase 3 (Gasless activity)

- **Database:** To store the EIP 712 signatures (Reference: [grants.buidlguidl.com](https://github.com/BuidlGuidl/grants.buidlguidl.com))

## 🚀 Phase 4 (Scaling)

- **Whitelist:** Optional system to validate users to prevent spam
- **Notification system:** On web and optionally on mobile
- **Direct Messaging system** for users and collectors
- **Accessibility support**: Posts on the website must be [ARIA compliant](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)

# 🤘 Development

## 🛠️ Technical details

⚙️ Built using Foundry, NextJS, RainbowKit, Wagmi, Viem, and Typescript,

🔗 To be deployed on EVM compatible chains

🐰 To see current development tasks, [see here](https://lulox.notion.site/PunkSociety-3458ad216e8c40a9b4489fe026146552?pvs=74)

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
