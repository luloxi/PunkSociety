<div style="text-align: center;">
  <img src="packages/nextjs/public/logo.png" alt="Alt text" style="max-width: 100%; height: auto;">
</div>

# About

🧪 This dApp is meant to facilitate art tokenization for artists, and listening, watching and trading NFTs

⚙️ Built using Foundry, NextJS, RainbowKit, Wagmi, Viem, and Typescript,

🔗 To be deployed on Polygon and Avalanche (or other EVM compatible chains)

## Deployed artifacts

### Frontend

### Contracts

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

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `packages/hardhat/hardhat.config.ts`.

3. Open a second terminal, navigate to `Technai-foundry` and run this command to deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. Open a third terminal, and run this command to start your NextJS app:

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

## Phase 1

Project started on [Aleph Hackathon](https://www.aleph.crecimiento.build/es-aleph-hackathon)
This repo was started with `npx create-eth@latest` with Foundry and integrated with the contracts and frontend from [github.com/luloxi/technai-marketplace](https://github.com/luloxi/technai-marketplace)

### Simple Mint

- ✅ **Simple minting function** for artists to upload their metadata to IPFS and sign a EIP 712 message, and then wait for an investor (first minter) to pay for the contract creation transaction. (Reference: [grants.buidlguidl.com](https://github.com/BuidlGuidl/grants.buidlguidl.com))
- ✅ **Add music to NFTs metadata** and **integrate with frontend** (Reference: [OpenSea metadata-standards](https://docs.opensea.io/docs/metadata-standards))
- ✅ **Create a contract for SimpleMint and SimpleMintNFT**
- ✅ **Page for minting** that takes inputs for the metadata of the NFT (Reference: [scaffold-class](https://github.com/luloxi/scaffold-class))
- **Implement a database to store the signatures** that allows first minters to start a collection,
- **Add a page for first minters** reading from the database with NFTs available to complete the Simple Mint process

### Marketplace

- ✅ **Page for interacting with the marketplace** buy and sell functions (Reference: [Simple Marketplace w/ Royalties)](https://app.buidlguidl.com/build/UxFNxy5XIMzz9mHKUxy5))
- ✅ **Payment in native gas token** and USDC token
- **Display auction info and interactions**
- **Add individual NFT pages** with more info about the NFT, if it's on sale, and the artist and bigger images
- **Add a page for the collector** with their NFTs and info about them
- **Add a page for the artist** with their NFTs and info about them
- **Add a way for artists (and collectors) to register their info (ideally with a signature)**

## Phase 2

### Simple Mint

- **Display NFT being built as a preview** before minting (display the NFT and the metadata)
- **Allow setting max tokenId and price**
- **Determine which Royalty standard to implement**, and start implementing it (References: [ERC-2981](https://eips.ethereum.org/EIPS/eip-2981) | [ERC-4910](https://eips.ethereum.org/EIPS/eip-4910) | [ERC-721C compared to ERC-2981 and ERC-4910](https://blog.xp.network/the-battle-for-nft-royalties-meet-the-erc-2981-erc-4920-and-erc-721c-b71d6ba28acf)
- **First minter gets a share of the royalties** of all the NFTs minted in that collection
- **Periodically airdrop dividends** in USDC for creators (and first minters if appliable) (may not even be necessary if royalties pay redirect funds to the creators directly)

### Marketplace

- **Display Simple Minted NFTs in the marketplace**
- **Mixed pay** that allows paying in USDC or native gas token for the same amount of USD, and/or maybe crosschain payments with USDC CCTP or Chainlink CCIP (integrate Chainlink Price Feeds with AggregatorV3Interface) (Reference: [Easy2Pay](https://github.com/luloxi/Easy2Pay))
- **Batch buying NFTs**, to reduce gas fees and the amount of transactions a user needs to make

## Phase 3

- **Artist NFT (limited edition)**: Holders of artists NFTs get access to backstage, events, a free drink on live events, etc
- **Token gated content**: Holders of song NFTs get access to special content for holders

### Music player

- **Music player as a PWA** that allows controlling the music from the notifications center on mobile devices (Reference: [React Player](https://www.npmjs.com/package/react-player))
- **Tip for artists**: Enable or require tipping with tokens, and if you don’t have $ to pay, you can watch an ad as payment (i.e: for every 6 songs, 1 ad that gets distributed among the 6 artists reproduced for free).

### Social

- Introduce **web2 social features** like creating profiles, following artists, liking NFTs, and commenting on NFTs
- **Feature for creating collections** of NFTs and displaying them in a gallery

## Phase 4

- **Guided Onboarding**: Make an interactive way to step-by-step user onboarding flow, and/or video material explaining the use of the platform, especially for artists or collectors who may be unfamiliar with blockchain or Web3 concepts.
- **Educational Content**: Tutorials or content to explain Web3 concepts, NFT minting, and royalties can improve user adoption.

### Marketplace

- Consider transitioning ownership of the marketplace to a DAO
- **Support for ERC1155** in the marketplace, Simple Mint (rethink) and music player
- Go through [Artion Contracts](https://github.com/Fantom-foundation/Artion-Contracts) and see what **improvements can be made to the marketplace**

### Social

- **Remixing feature for NFTs**, where the creator receives 30% of the royalties of the remix
- **Notification system** for increasing engagement (customizable and ideally with email or mobile notifications)
- **Direct Messaging system** for artists and collectors
- Ability to **make your own group/community**

### Performance improvements

- **Functionality to move NFTs between blockchains** with Chainlink CCIP token transfer (Reference: [Chainlink CCIP Cross-chain Tokens](https://docs.chain.link/ccip/tutorials/cross-chain-tokens))
- **Profile creation with web2.5 login** (Twitter, Instagram, Google, etc). Linked wallet could be with account abstraction or creating a wallet from scratch, TBD
- **Integrate GraphQL to index NFTs** and save RPC calls
- **Upload the NFT Metadata to Filecoin** instead of IPFS, and use it with a EIP-712 signature for Simple Mint. (Reference: [Viem recoverTypedDataAddress](https://viem.sh/docs/utilities/recoverTypedDataAddress))

# Completed product features

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
