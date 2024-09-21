- To see current development tasks and other info about the project, [see here](https://lulox.notion.site/TECHNAI-3458ad216e8c40a9b4489fe026146552?pvs=74)

## Prerequisites

- [Node (>= v18.17)](https://nodejs.org/en/download/package-manager)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/#windows-stable) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)
- [Foundry](https://book.getfoundry.sh/getting-started/installation)

## Quickstart

To get started follow the steps below:

1. Open a terminal and run this commands to clone this repo and install dependencies:

```
git clone https://github.com/luloxi/Technai-foundry.git
cd Technai-foundry
yarn install
```

2. After everything is installed, run this command to start a local blockchain network:

```
yarn chain
```

This command starts a local Ethereum network using Foundry. The network runs on your local machine and can be used for testing and development.

3. Duplicate and rename `packages/foundry/.env.example` to `packages/foundry/.env` (you don't need to fill it out until deploying to a live network)

4. Open a second terminal, navigate to `Technai-foundry` and run this command to deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/foundry/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/foundry/script/Deploy.s.sol` to deploy the contract to the network. You can also customize the deploy script.

5. Open a third terminal, navigate to `Technai-foundry` and run this command to start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page.

# Roadmap

## Phase 1 ✅

<details><summary>See completed tasks</summary>

### Simple Mint

- ✅ **Add music to NFTs metadata** and **integrate with frontend** (Reference: [OpenSea metadata-standards](https://docs.opensea.io/docs/metadata-standards))
- ✅ **Create a contract for SimpleMint and SimpleMintNFT**
- ✅ **Page for minting** that takes inputs for the metadata of the NFT (Reference: [scaffold-class](https://github.com/luloxi/scaffold-class))
- ✅ **Display NFT being built as a preview** before minting (display the NFT and the metadata)
- ✅ **Add an option to start a collection paying gas** on the Simple Mint page, with a toggle to switch between gasless and paying gas
- ✅ **Allow setting max tokenId and price**

### Marketplace

- ✅ **Page for interacting with the marketplace** buy and sell functions (Reference: [Simple Marketplace w/ Royalties)](https://app.buidlguidl.com/build/UxFNxy5XIMzz9mHKUxy5))
- ✅ Payment in native gas token **and USDC token**
- ✅ **Display Simple Minted NFTs in the marketplace**

### Social

- ✅ **Add a profile for the collector** with their NFTs and info about them

</details>

## Phase 2

- **Integrate GraphQL to index NFTs** and save RPC calls (Reference: [Bootstrap a Full Stack Modern dapp using the Scaffold-ETH CLI and Subgraph Extension](https://siddhantk08.hashnode.dev/bootstrap-a-full-stack-modern-dapp-using-the-scaffold-eth-cli-and-subgraph-extension))

### Marketplace

- **Display auction info and interactions**

### Social

- ✅ **Add a way for users to register their info**
- **Add individual NFT pages** with more info about the NFT, if it's on sale, and the artist and bigger images
- **Allow seeing other collectors profiles** and their NFTs
- **Remixing feature for NFTs**, where the creator receives a % of the royalties of the remix

## Phase 3

### Simple Mint

- ✅ **Simple minting function** for artists to upload their metadata to IPFS and sign a EIP 712 message, and then wait for an investor (first minter) to pay for the contract creation transaction.
- **Implement a database to store the signatures** that allows first minters to start a collection (Reference: [grants.buidlguidl.com](https://github.com/BuidlGuidl/grants.buidlguidl.com))
- **Determine which Royalty standard to implement**, and start implementing it (References: [ERC-2981](https://eips.ethereum.org/EIPS/eip-2981) | [ERC-4910](https://eips.ethereum.org/EIPS/eip-4910) | [ERC-721C compared to ERC-2981 and ERC-4910](https://blog.xp.network/the-battle-for-nft-royalties-meet-the-erc-2981-erc-4920-and-erc-721c-b71d6ba28acf)
- **First minter gets a share of the royalties** of all the NFTs minted in that collection

### Marketplace

- **Add NFTs available for first minting** reading from the database with signatures collected through the Simple Mint process

### Social

- **Add a way for users to register their info with a signature**
- Introduce **web2 social features** like creating profiles, following artists, liking NFTs, and commenting on NFTs

## Phase 4

### Social

- Make Profile read all the NFTs owned by the user, and **not just the ones minted through the website**
- **System to validate artists and collectors (and maybe enable them to Simple Mint and be able to disable them to prevent spam)**
- **Artist NFT (limited edition)**: Holders of artists NFTs get access to backstage, events, a free drink on live events, etc
- **Token gated content**: Holders of song NFTs get access to special content for holders
- **Feature for creating collections** of NFTs and displaying them in a gallery

### Music player

- **Music player as a PWA** that allows controlling the music from the notifications center on mobile devices (Reference: [React Player](https://www.npmjs.com/package/react-player))
- **Upload the NFT Metadata to Filecoin** instead of IPFS (Reference: [Filecoin NFT Storage](https://docs.filecoin.io/))

## Phase 5

### Marketplace

- **Batch buying NFTs**, to reduce gas fees and the amount of transactions a user needs to make
- **Mixed pay** that allows paying in USDC or native gas token for the same amount of USD, and/or maybe crosschain payments with USDC CCTP or Chainlink CCIP (integrate Chainlink Price Feeds with AggregatorV3Interface) (Reference: [Easy2Pay](https://github.com/luloxi/Easy2Pay))
- **Periodically airdrop dividends** in USDC for creators (and first minters if appliable) (may not even be necessary if royalties pay redirect funds to the creators directly)
- Consider transitioning ownership of the marketplace to a DAO
- **Functionality to move NFTs between blockchains** with Chainlink CCIP token transfer (Reference: [Chainlink CCIP Cross-chain Tokens](https://docs.chain.link/ccip/tutorials/cross-chain-tokens))
- **Support for ERC1155** in the marketplace, Simple Mint (rethink) and music player
- Go through [Artion Contracts](https://github.com/Fantom-foundation/Artion-Contracts) and see what **improvements can be made to the marketplace**

### Social

- **Profile creation with web2.5 login** (Twitter, Instagram, Google, etc). Linked wallet could be with account abstraction or creating a wallet from scratch, TBD
- **Notification system** for increasing engagement (customizable and ideally with email or mobile notifications)
- **Direct Messaging system** for artists and collectors
- Ability to **make your own group/community**
- **Educational Content**: Make an interactive way to step-by-step user onboarding flow, and/or video material explaining the use of the platform, especially for artists or collectors who may be unfamiliar with Web3 concepts, NFT minting, and/or royalties to improve user adoption.

### Music player

- **Tip for artists**: Enable or require tipping with tokens, and if you don’t have $ to pay, you can watch an ad as payment (i.e: for every 6 songs, 1 ad that gets distributed among the 6 artists reproduced for free).

# Completed product description

<div style="text-align: center;">
  <img src="packages/nextjs/public/logo.png" alt="Alt text" style="max-width: 100%; height: auto;">
</div>

Technai is a Web3-based marketplace that empowers artists to mint and monetize their work as NFTs while providing collectors with unique investment opportunities.

Our mission is to break down the barriers for artists and collectors by providing an easy-to-use platform that fosters creativity, collaboration, and sustainable income through digital art. The platform solves the problems of high minting costs for artists, lack of continuous royalties, and limited cross-chain interoperability, allowing for a more inclusive and connected NFT ecosystem.

## About

- This repo was started with `npx create-eth@latest` with Foundry and integrated with the contracts and frontend from [github.com/luloxi/technai-marketplace](https://github.com/luloxi/technai-marketplace)

🧪 Project started on [Aleph Hackathon](https://www.aleph.crecimiento.build/es-aleph-hackathon)

⚙️ Built using Foundry, NextJS, RainbowKit, Wagmi, Viem, and Typescript,

🔗 To be deployed on Polygon and Avalanche (or other EVM compatible chains)

## Roles within the platform

- Artists: Mint, remix, and earn royalties from NFTs.
- NFT Collectors: Buy, sell, auction, and collect NFTs while benefiting from features like batch buying and cross-chain transfers.
- Marketplace Owner: A central entity (or DAO) that manages marketplace fees and operations.
- Free Users: Explore, watch, and listen to content, with future plans to include ad-supported music streaming.

## Features

🎨 **Simple Mint**: A cost-free minting solution for artists where the first minter sponsors the collection’s minting costs. The sponsor receives a share of royalties on all future sales, creating opportunities for art investors. The marketplace takes a 5% fee on first mint transactions.

🔄 **Remixing Feature**: Allows artists to remix existing art and share royalties with the original artist. This promotes creative collaboration, where both the remixer and the original creator benefit from the sales of the remix.

✅ **Royalties**: Artists can set royalties on their NFTs, earning passive income on future sales. In the case of Simple Mint, first minters also earn a percentage of royalties on all sales within the collection.

🎶 **Music Player**: A full-featured on-chain music player that supports playlists, song likes, and playback on mobile and desktop via our PWA. Ads play for users streaming music they don’t own, providing additional income for artists.

🌐 **Cross-Chain NFTs**: Seamless cross-chain NFT transfers using Chainlink's CCIP, allowing artists to extend their reach and access new markets.

🪄 **Token Gated Content**: NFT holders get exclusive access to perks like backstage passes, special events, and live event rewards.

📦 **Batch Buying**: A cost-saving feature that allows users to purchase multiple NFTs in a single transaction, reducing gas fees.

🔒 **Web 2.5 Login**: Users can create profiles using familiar Web2 accounts like Twitter, Google, or Instagram, making onboarding easier. This auto-generates a crypto wallet for seamless interaction with the marketplace.

🤝 **Social Features**: Build a personal profile, like NFTs, follow artists, message collectors, comment on pieces, and receive notifications about new drops from your favorite creators.

👩‍🎤 **Artist NFTs (Limited Edition)**: Special artist NFTs that grant holders VIP experiences like backstage access, event invites, and more.

🎓 **Educational Content**: A comprehensive onboarding experience, including video tutorials and step-by-step guides, to help users unfamiliar with NFTs, minting, or Web3 get started.

📊 **Artist Dashboards**: Artists can view real-time insights into their NFTs' performance, including views, likes, and plays (for music), giving them deeper analytics into their work.

📈 **Royalty and Revenue Tracking**: A simplified interface for artists to monitor royalties, sales, and overall revenue, providing a clear view of their earnings and growth trajectory.

## Deployed artifacts

### Frontend

### Contracts
