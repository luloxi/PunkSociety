import * as chains from "viem/chains";

// import { defineChain } from "viem";

// Read the environment variable
// const rpcUrl = process.env.NEXT_PUBLIC_PUNKSOCIETY_RPC_URL || "http://127.0.0.1:9650";

// Convert to WebSocket URL
// const wsRpcUrl = rpcUrl.replace(/^https:\/\//, "ws://");

// export const punksociety = /*#__PURE__*/ defineChain({
//   id: 615_243,
//   name: "PunkSociety",
//   nativeCurrency: {
//     decimals: 18,
//     name: "USDC",
//     symbol: "USDC",
//   },
//   rpcUrls: {
//     default: {
//       http: [rpcUrl],
//       webSocket: [wsRpcUrl],
//     },
//   },
// });

export type ScaffoldConfig = {
  targetNetworks: readonly chains.Chain[];
  pollingInterval: number;
  alchemyApiKey: string;
  walletConnectProjectId: string;
  onlyLocalBurnerWallet: boolean;
};

const scaffoldConfig = {
  // The networks on which your DApp is live

  // For working locally, comment out chains.sepolia or chains.arbitrum
  // and uncomment chains.foundry
  // targetNetworks: [chains.foundry],
  // targetNetworks: [punksociety],
  // targetNetworks: [chains.baseSepolia],
  targetNetworks: [chains.zkSyncSepoliaTestnet],
  // targetNetworks: [chains.zkSyncSepoliaTestnet, chains.optimismSepolia],

  // The interval at which your front-end polls the RPC servers for new data
  // it has no effect if you only target the local network (default is 4000)
  pollingInterval: 30000,

  // This is ours Alchemy's default API key.
  // You can get your own at https://dashboard.alchemyapi.io
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF",

  // This is ours WalletConnect's default project ID.
  // You can get your own at https://cloud.walletconnect.com
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "3a8170812b534d0ff9d794f19a901d64",

  // Only show the Burner Wallet when running on hardhat network
  onlyLocalBurnerWallet: false,
} as const satisfies ScaffoldConfig;

export default scaffoldConfig;
