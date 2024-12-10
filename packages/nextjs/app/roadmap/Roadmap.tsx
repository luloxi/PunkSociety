"use client";

import Image from "next/image";
import Link from "next/link";
import { NFTMetaData } from "~~/utils/simpleNFT/nftsMetadata";

export interface Post extends Partial<NFTMetaData> {
  postId?: number;
  uri: string;
  user: string;
  date?: string;
}

export const Roadmap = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="hero bg-base-200 ">
        <div className="hero-content flex-col lg:flex-row-reverse lg:px-14">
          {/* INSERT HERE A GIF SHOWING HOW A LIKE BECOMES MONEY */}
          {/* <Image
            src="/like-dollar.png"
            alt="Animation clicking a like button and increasing USDC balance"
            className="max-w-sm rounded-lg"
            width={150}
            height={150}
          /> */}
          <div className="flex flex-col justify-center">
            <h1
              className="text-4xl font-bold text-center 
          font-mono "
            >
              <strong>PunkSociety roadmap!</strong>🤘
            </h1>

            <span className="text-2xl text-center pt-2">
              What we&apos;ve done and what will <strong className="text-green-600">we do next!</strong> 🎯
            </span>
          </div>
        </div>
      </div>

      <div className="w-full  bg-yellow-500">
        <div className="flex flex-col p-6 justify-center items-center  bg-yellow-500 text-black">
          <h1 className="text-4xl font-mono text-center">What is this about?</h1>
          <div>
            <Link href="/about">
              <button className="btn btn-primary bg-black hover:bg-gray-800 border-0 text-yellow-300">
                Read our About page
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="hero bg-base-300 flex flex-wrap justify-around gap-3 py-4 lg:p-4">
        <section className="flex flex-col justify-center items-center gap-3" aria-labelledby="roadmap">
          <h2 className="text-4xl " id="roadmap">
            🤘 Roadmap
          </h2>

          <section className="w-full md:w-1/2 p-4 rounded-lg bg-base-200" aria-labelledby="phase1">
            <h3 className="text-center text-2xl" id="phase1">
              🐣 Phase 1 (MVP)
            </h3>
            <ul className="list-disc list-inside">
              <li>
                <span aria-label="completed task">✅</span> <strong>Create PunkPosts contract</strong>
              </li>
              <li>
                <span aria-label="completed task">✅</span>{" "}
                <strong>Create PunkProfile contract to register users info and socials</strong>
              </li>
              <li>
                <span aria-label="completed task">✅</span> <strong>PunkSociety contract:</strong> Social interactions
              </li>
              <li>
                <span aria-label="completed task">✅</span> <strong>Post creation tool</strong>
              </li>
              <li>
                <span aria-label="completed task">✅</span> <strong>User profile page</strong>
              </li>
              <li>
                <span aria-label="completed task">✅</span> <strong>Search:</strong> By address or username
              </li>
              <li>
                <span aria-label="option enabled">✅</span> Enable options for sharing on other platforms
              </li>
              <li>
                <span aria-label="option enabled">✅</span> Enable following users, liking, commenting and sharing posts
              </li>
              <li>
                <strong>Incentive model:</strong> Likes and comments send $ to the user on the other end. Posting sends
                $ to PunkSociety&apos;s deployer.
              </li>
              <li>
                <strong>Dynamic page to view individual posts</strong>
              </li>
            </ul>
          </section>

          <section className="w-full md:w-1/2 p-4 rounded-lg bg-base-200" aria-labelledby="phase2">
            <h3 id="phase2" className="text-center text-2xl">
              📈 Phase 2 (Business model)
            </h3>
            <ul className="list-disc list-inside">
              {/* <li>
                ⏸️ <strong>Avalanche L1 with USDC as native gas:</strong> Use an Avalanche L1 with USDC as native gas
                <Link
                  href="https://docs.avax.network/tooling/create-deploy-avalanche-l1s/create-avalanche-l1"
                  className="text-blue-500 font-bold underline"
                  aria-label="Create an Avalanche L1"
                >
                  Create an Avalanche L1
                </Link>
              </li>
              <li>
                ⚠️ <strong>USDC Staking/Lending model:</strong> Bridged USDC can be lent or staked on AAVE and/or
                Compound (or similar) so users can earn interest on their USDC while using the platform
              </li> */}
              {/* <li>
                <strong>Fees:</strong> PunkSociety collects fees from USDC lending revenue
              </li> */}
              <li>
                <strong>Easy onramp tool:</strong> Easy USDC buying tool for onboarding new users.
                <Link
                  href="https://onchainkit.xyz/fund/fund-button"
                  className="text-blue-500 font-bold underline"
                  aria-label="FundButton from Coinbase"
                >
                  FundButton from Coinbase
                </Link>{" "}
                |
                <Link
                  href="https://github.com/scaffold-eth/create-eth-extensions/tree/onchainkit"
                  className="text-blue-500 font-bold underline"
                  aria-label="OnchainKit extension for Scaffold-ETH 2"
                >
                  OnchainKit extension for Scaffold-ETH 2
                </Link>
              </li>
              {/* <li>
                <strong>Built-in bridge manager:</strong> Built-in simple tool for bridging USDC and NFTs to and from
                Avalanche, Base, Ethereum, and other EVM chains
                <Link
                  href="https://github.com/ava-labs/avalanche-interchain-token-transfer"
                  className="text-blue-500 font-bold underline"
                  aria-label="avalanche-interchain-token-transfer"
                >
                  avalanche-interchain-token-transfer
                </Link>{" "}
                |
                <Link
                  href="https://docs.chain.link/ccip/tutorials/cross-chain-tokens"
                  className="text-blue-500 font-bold underline"
                  aria-label="Chainlink CCIP Cross Chain Tokens"
                >
                  Chainlink CCIP Cross Chain Tokens
                </Link>
              </li> */}
              <li>
                <strong>Dashboard Insights:</strong> Track and analyze your revenue
              </li>
            </ul>
          </section>

          <section className="w-full md:w-1/2 p-4 rounded-lg bg-base-200" aria-labelledby="phase3">
            <h3 className="text-center text-2xl" id="phase3">
              🌐 Phase 3 (Indexing)
            </h3>
            <ul className="list-disc list-inside">
              <li>
                <strong>Integrate The Graph to index activity</strong> and save RPC calls
                <Link
                  href="https://siddhantk08.hashnode.dev/bootstrap-a-full-stack-modern-dapp-using-the-scaffold-eth-cli-and-subgraph-extension"
                  className="text-blue-500 font-bold underline"
                  aria-label="Bootstrap a Full Stack Modern dapp using the Scaffold-ETH CLI and Subgraph Extension"
                >
                  Bootstrap a Full Stack Modern dapp using the Scaffold-ETH CLI and Subgraph Extension
                </Link>{" "}
                |
                <Link
                  href="https://thegraph.com/docs/en/developing/creating-a-subgraph/"
                  className="text-blue-500 font-bold underline"
                  aria-label="The Graph tool for creating a subgraph"
                >
                  The Graph tool for creating a subgraph
                </Link>
              </li>
              <li>
                <strong>Categories:</strong> Allow users to categorize their posts, filter by category and search by
                category
              </li>
              <li>
                <strong>Notification system</strong>
              </li>
              <li>Search by post content</li>
            </ul>
          </section>

          <section className="w-full md:w-1/2 p-4 rounded-lg bg-base-200" aria-labelledby="phase4">
            <h3 className="text-center text-2xl" id="phase4">
              💬 Phase 4 (Social enhancement)
            </h3>
            <ul className="list-disc list-inside">
              <li>
                <strong>Direct messages:</strong> Allow users to send private messages to each other
                <Link href="https://push.org/" className="text-blue-500 font-bold underline" aria-label="Push Protocol">
                  Push Protocol
                </Link>
              </li>
              {/* <li>Enable audio, video, and links with preview type of posts</li> */}
              {/* <li>
                <strong>Polls:</strong> Allow users to create polls
              </li> */}
              <li>
                <strong>Customization:</strong> Allow users to customize their profile appearance
              </li>
              <li>
                <strong>Collections:</strong> Create and share collections of posts
              </li>
              <li>
                <strong>Groups:</strong> Allow users to create and join groups with custom chat and newsfeed
              </li>
            </ul>
          </section>

          <section className="w-full md:w-1/2 p-4 rounded-lg bg-base-200" aria-labelledby="phase5">
            <h3 className="text-center text-2xl" id="phase5">
              👨‍🦽 Phase 5 (Ease of use)
            </h3>
            <ul className="list-disc list-inside">
              <li>
                <strong>Multi-language support:</strong> Switch between languages
              </li>
              <li>
                <strong>Educational Content:</strong> Include onboarding tutorials and step-by-step guides to help users
                understand what they can do on the platform
              </li>
              <li>
                <strong>Web 2.5 social login with account abstraction:</strong> Sign up and log in with Google, Twitter,
                Instagram, etc.
                <Link
                  href="https://github.com/thirdweb-example/wagmi-thirdweb?ref=blog.thirdweb.com"
                  className="text-blue-500 font-bold underline"
                  aria-label="wagmi-thirdweb Connect Button"
                >
                  wagmi-thirdweb Connect Button
                </Link>
              </li>
              <li>
                <strong>Accessibility support:</strong> For the hearing and visually impaired, the app should be ARIA
                compliant to support screen readers and other assistive technologies
                <Link
                  href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA"
                  className="text-blue-500 font-bold underline"
                  aria-label="ARIA"
                >
                  ARIA
                </Link>
              </li>
              <li>
                <strong>Add special metadata to NFTs:</strong> for screen readers and SEO
              </li>
            </ul>
          </section>
        </section>
      </div>
      <div className="hero bg-base-100 flex flex-col justify-start ">
        <div className="w-full pt-6 bg-base-100">
          <h1 className="text-4xl font-mono text-center">Meet us! 🤘</h1>
        </div>
        <div className="hero-content flex-col md:flex-row">
          <div className="flex flex-col  items-center gap-3 bg-base-100 rounded-lg border-2">
            <figure className="px-10 pt-5 flex-shrink-0">
              <Image src="/lulox.jpg" alt="Lulox" className="rounded-xl" width={200} height={200} />
            </figure>
            <div className="flex pb-5 flex-col items-center justify-center">
              <h2 className="text-3xl">Lulox</h2>
              <span className="italic">Buidler</span>
              <a
                className="flex justify-center items-center gap-1"
                href="https://linktr.ee/lulox"
                target="_blank"
                rel="noreferrer"
              >
                <button className="btn btn-success mt-2">Linktree</button>
              </a>
            </div>
          </div>

          <div className="flex flex-col  items-center gap-3 bg-base-100 rounded-lg border-2">
            <figure className="px-10 pt-5 flex-shrink-0">
              <Image
                src="/guest-profile.jpg"
                alt="Undefined profile picture"
                className="rounded-xl"
                width={200}
                height={200}
              />
            </figure>
            <div className="flex pb-5 flex-col items-center justify-center">
              <h2 className="text-3xl">You?</h2>
              <span className="italic">Buidler</span>
              <a
                className="flex justify-center items-center gap-1"
                href="https://linktr.ee/lulox"
                target="_blank"
                rel="noreferrer"
              >
                <button className="btn btn-primary mt-2">Contact Lulox!</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
