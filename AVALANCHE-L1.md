# How to run a local Avalanche L1

General avalanche instructions: `avalanche -h`

## 0. Start the GitHub codespace

Go to [avalanche-starter-kit](https://github.com/ava-labs/avalanche-starter-kit), open Code, switch to tab Codespaces, then click on `+` to start a new codespace:

It'll take some time to load, go take a walk or do something else while it loads

## 1. Create and Start the local blockchain

1. `avalanche blockchain create punksociety`

2. Subnet EVM, "I want to use defaults for a test environment", Chain ID: 615243
   Token Symbol: USDC, Enter

3. `avalanche blockchain deploy punksociety`

4. Local Network, Enter

5. After it boots up the blockchain, for some reason port `9650` doesn't set itself automatically to public, so you gotta click `Ports` to the right of `Terminal`, find port 9650, right click it, Port visibility, Public

> NOTE: After 30 minutes (or if you close the tab/browser) your codespaces goes to sleep. To prevent this from happening, run this command: `while true; do echo "Ah ah ah ah, staying alive!"; sleep 900; done &` to ping the codespace every 15 minutes.

> NOTE: Remember [GitHub will provide users in the free plan](https://docs.github.com/es/billing/managing-billing-for-your-products/managing-billing-for-github-codespaces/about-billing-for-github-codespaces) (boo!) 120 core hours or 60 hours of run time on a 2 core codespace, plus 15 GB of storage each month. So remember to shut it down when you're not using it.

## 2. Load RPC URL into your scaffold-eth

Add the rpc url on `packages/foundry/.env` and on `packages/nextjs/.env` variable called `PUNKSOCIETY_RPC_URL` and `NEXT_PUBLIC_PUNKSOCIETY_RPC_URL` respectively

> NOTE: When using codespace on github, load the global URL, NOT the local (127.0.0.1) one

## 3. Import wallets

1. Go to the frontend and switch networks to `PunkSociety`, or do it manually if you're inclined to do so. This will prompt you to add Punk Society network to your wallet (only tried on MetaMask so far).

2. To have `1000000 USDC as starting balance` (deployer account), scroll up on the Terminal and find `Main funded account EWOQ`, then **COPY THE PRIVATE KEY** (the one NOT starting with 0x).

3. Copy the private key into `packages/foundry/.env` variable called `DEPLOYER_PRIVATE_KEY` prefixing a `0x` to it (format is `0xPRIVATE_KEY`).

Now you'll be able to deploy contracts to PunkSociety!

4. Open your metamask and add a new account with that private key.

**[CLICK HERE to CONTINUE with STEP 5 in the INSTRUCTIONS NOW!](./README.md#L113)**
