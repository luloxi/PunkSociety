<div style="text-align: center;">
  <img src="packages/nextjs/public/logo.png" alt="Alt text" style="max-width: 100%; height: auto;">
</div>

# About

🧪 This dApp is meant to facilitate art tokenization for artists, and listening, watching and trading NFTs

⚙️ Built using Foundry, NextJS, RainbowKit, Wagmi, Viem, and Typescript,

🔗 To be deployed on Polygon and Avalanche (or other EVM compatible chains)

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

# Roles within the platform

- Artists
- NFT collectors (buy, sell, auction, collect)
- Marketplace owner (one address, could be a DAO in the future)
- Free users (watch, listen, in the future may consume ads)

# Roadmap

- To see detailed development info, [see here](https://lulox.notion.site/TECHNAI-3458ad216e8c40a9b4489fe026146552?pvs=74)

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

### Simple Mint

- ✅ **Simple minting function** for artists to upload their metadata to IPFS and sign a EIP 712 message, and then wait for an investor (first minter) to pay for the contract creation transaction.
- **Implement a database to store the signatures** that allows first minters to start a collection (Reference: [grants.buidlguidl.com](https://github.com/BuidlGuidl/grants.buidlguidl.com))
- **Determine which Royalty standard to implement**, and start implementing it (References: [ERC-2981](https://eips.ethereum.org/EIPS/eip-2981) | [ERC-4910](https://eips.ethereum.org/EIPS/eip-4910) | [ERC-721C compared to ERC-2981 and ERC-4910](https://blog.xp.network/the-battle-for-nft-royalties-meet-the-erc-2981-erc-4920-and-erc-721c-b71d6ba28acf)
- **First minter gets a share of the royalties** of all the NFTs minted in that collection

### Marketplace

- **Display auction info and interactions**
- **Add NFTs available for first minting** reading from the database with signatures collected through the Simple Mint process

### Social

- **Add a way for artists (and collectors) to register their info (ideally with a signature)**
- **Allow seeing other collectors profiles** and their NFTs
- **Add individual NFT pages** with more info about the NFT, if it's on sale, and the artist and bigger images
- **Add a page for the artist** with their NFTs and info about them
- Make MyNFTs read all the NFTs owned by the user, and **not just the ones minted through the website**

## Phase 3

### Marketplace

- **Batch buying NFTs**, to reduce gas fees and the amount of transactions a user needs to make
- **Mixed pay** that allows paying in USDC or native gas token for the same amount of USD, and/or maybe crosschain payments with USDC CCTP or Chainlink CCIP (integrate Chainlink Price Feeds with AggregatorV3Interface) (Reference: [Easy2Pay](https://github.com/luloxi/Easy2Pay))
- **Periodically airdrop dividends** in USDC for creators (and first minters if appliable) (may not even be necessary if royalties pay redirect funds to the creators directly)

### Social

- **System to validate artists and collectors (and maybe enable them to Simple Mint and be able to disable them to prevent spam)**
- **Artist NFT (limited edition)**: Holders of artists NFTs get access to backstage, events, a free drink on live events, etc
- **Token gated content**: Holders of song NFTs get access to special content for holders
- Introduce **web2 social features** like creating profiles, following artists, liking NFTs, and commenting on NFTs
- **Feature for creating collections** of NFTs and displaying them in a gallery

### Music player

- **Upload the NFT Metadata to Filecoin** instead of IPFS, and use it with a EIP-712 signature for Simple Mint. (Reference: [Viem recoverTypedDataAddress](https://viem.sh/docs/utilities/recoverTypedDataAddress))
- **Music player as a PWA** that allows controlling the music from the notifications center on mobile devices (Reference: [React Player](https://www.npmjs.com/package/react-player))
- **Tip for artists**: Enable or require tipping with tokens, and if you don’t have $ to pay, you can watch an ad as payment (i.e: for every 6 songs, 1 ad that gets distributed among the 6 artists reproduced for free).

## Phase 4

### Marketplace

- Consider transitioning ownership of the marketplace to a DAO
- **Functionality to move NFTs between blockchains** with Chainlink CCIP token transfer (Reference: [Chainlink CCIP Cross-chain Tokens](https://docs.chain.link/ccip/tutorials/cross-chain-tokens))
- **Support for ERC1155** in the marketplace, Simple Mint (rethink) and music player
- Go through [Artion Contracts](https://github.com/Fantom-foundation/Artion-Contracts) and see what **improvements can be made to the marketplace**

### Social

- **Profile creation with web2.5 login** (Twitter, Instagram, Google, etc). Linked wallet could be with account abstraction or creating a wallet from scratch, TBD
- **Remixing feature for NFTs**, where the creator receives a % of the royalties of the remix
- **Notification system** for increasing engagement (customizable and ideally with email or mobile notifications)
- **Direct Messaging system** for artists and collectors
- Ability to **make your own group/community**
- **Guided Onboarding**: Make an interactive way to step-by-step user onboarding flow, and/or video material explaining the use of the platform, especially for artists or collectors who may be unfamiliar with blockchain or Web3 concepts.
- **Educational Content**: Tutorials or content to explain Web3 concepts, NFT minting, and royalties can improve user adoption.

# Completed product description

- Project started on [Aleph Hackathon](https://www.aleph.crecimiento.build/es-aleph-hackathon)
- This repo was started with `npx create-eth@latest` with Foundry and integrated with the contracts and frontend from [github.com/luloxi/technai-marketplace](https://github.com/luloxi/technai-marketplace)

## Deployed artifacts

### Frontend

### Contracts

## Features

🎶 **Music player**: This music player allows listening to onchain music, creating playlists, liking songs, all from your desktop or your mobile with our PWA.

TBD -> If you listen to music you don't own, an ad will play once in a while to pay to the artists.

📊 **Artist Dashboards**: Provide real-time insights for artists, such as statistics on how many times their NFTs have been viewed, liked, played (for music), etc.

🎨 **Simple Mint**: A way for artists to upload and mint their collections for free, where a first minter sponsors the collection minting costs and gets a share of the royalties of all the NFTs minted in that collection. This creates a market for art investors being eager to first mint a piece of art they like.

The complete cost for first minters consists in the price of 1 NFT plus the gas costs of the deployment transaction. The marketplace collects 5% of each first mint price.

✅ **Royalties**: Artists have an option to set a royalty. This royalty is paid to the artist every time the NFT is sold through a market that supports the royalty standard, creating a passive income stream for artists.

In the case of Simple Mint, the first minter of a collection gets a share of the royalties of all the NFTs minted in that collection.

📈 **Royalty and Revenue Tracking**: Let artists track their royalties, sales, and revenue in an easy-to-understand interface.

🌐 **Cross-Chain NFTs**: We allow artists and collectors to easily bridge their NFTs between blockchains, and thus access other marketplaces. We offer this functionality for NFTs minted on our marketplace by leveraging the Chainlink CCIP (Cross-Chain Interoperability Protocol).

🔄 **Remixing Feature**: Take another artists piece and remix it. Then upload specifying what piece you remixed, and you can be displayed as a remixer artist on the art piece you remixed. The creator of the original piece will receive a percent of the royalties of the remix.

🤝 **Social Features**: You can create your own profile, like NFTs, get notifications on your favorite artists, message with other collectors and artists, comment on NFTs, and much more!
