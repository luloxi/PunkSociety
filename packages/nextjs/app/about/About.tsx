"use client";

// import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NFTMetaData } from "~~/utils/simpleNFT/nftsMetadata";

export interface Post extends Partial<NFTMetaData> {
  postId?: number;
  uri: string;
  user: string;
  date?: string;
}

export const About = () => {
  // const [usdcPrice, setUsdcPrice] = useState<number>(1);
  // const [averageUsdcPrice, setAverageUsdcPrice] = useState<number>();
  // const averageUsdcPrice = "1";

  // const handleUsdcPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = Number(e.target.value);
  //   setUsdcPrice(value < 0 ? 0 : value);
  // };

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
          <div className="flex flex-col items-center justify-center">
            <div className="hero bg-base-200">
              <div className="hero-content flex-col lg:flex-row-reverse text-2xl">
                <Image
                  src="https://www.rawshorts.com/blog/wp-content/uploads/2019/08/instagram-ads.gif"
                  alt="Animation showing how to enter PunkSociety, and the experience of scrolling the home feed"
                  className="max-w-sm rounded-lg shadow-2xl mx-3"
                  width={350}
                  height={350}
                />
                <div>
                  <h1 className="text-5xl font-bold">WTF is PunkSociety? 🤘</h1>
                  <p className="pt-6">
                    It is an <strong>open source framework</strong> for building dapps that interact with{" "}
                    <Link href="https://docs.avax.network/avalanche-l1s" target="_blank">
                      <span className=" text-blue-600 font-bold underline underline-offset-2">ERC20</span>
                    </Link>{" "}
                    and{" "}
                    <Link href="https://docs.avax.network/avalanche-l1s" target="_blank">
                      <span className=" text-pink-600 font-bold underline underline-offset-2">ERC721</span>
                    </Link>{" "}
                    tokens (<span className=" text-blue-600 font-bold">fungible</span> and{" "}
                    <span className=" text-pink-600 font-bold">non-fungible</span>).
                  </p>
                  <p className="">
                    Instructions on{" "}
                    <Link href="https://github.com/luloxi/PunkSociety" target="_blank">
                      <span className="pr-1 text-orange-600 font-bold underline underline-offset-2">
                        {" "}
                        PunkSociety&apos;s GitHub repo
                      </span>
                    </Link>
                    explain how to deploy the project on any{" "}
                    <Link
                      href="https://blog.thirdweb.com/evm-compatible-blockchains-and-ethereum-virtual-machine/"
                      target="_blank"
                    >
                      <span className=" text-green-600 font-bold underline underline-offset-2">
                        EVM compatible blockchain.
                      </span>
                    </Link>
                  </p>
                  {/* <button className="btn btn-primary">Get Started</button> */}
                </div>
              </div>
            </div>

            {/* <hr className="w-full border-2 border-white mb-6" /> */}
          </div>
        </div>
      </div>

      <div className="w-full  bg-yellow-500">
        <div className="flex flex-col p-6 justify-center items-center  bg-yellow-500 text-black">
          <h1 className="text-4xl font-mono text-center">Prefer reading PDFs?</h1>
          <div>
            <Link href="/PunkPaper.pdf" target="_blank">
              <button className="btn btn-primary bg-black hover:bg-gray-800 border-0 text-yellow-300">
                Read our PunkPaper!
              </button>
            </Link>
          </div>
        </div>
      </div>

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
          <div className="flex flex-col items-center justify-center">
            <div className="hero bg-base-200">
              <div className="hero-content flex-col lg:flex-row-reverse ">
                <Image
                  src="https://www.rawshorts.com/blog/wp-content/uploads/2019/08/instagram-ads.gif"
                  alt="Animation showing how to enter PunkSociety, and the experience of scrolling the home feed"
                  className="max-w-sm rounded-lg shadow-2xl mx-3"
                  width={350}
                  height={350}
                />
                <div>
                  <h1 className="text-5xl font-bold">About this build 🤘</h1>
                  <p className="pt-6 text-green-600 text-2xl">Use social media and earn! 🤑</p>
                  <p className="">
                    Social protocol where interactions are monetized 💰 <br />
                    Users earn while engaging with their community 🫂
                  </p>
                  {/* <button className="btn btn-primary">Get Started</button> */}
                  <span className="pt-4 text-center italic">
                    This website is a social network where posts are NFTs and likes send USDC to post creators.{" "}
                    <Link href="https://docs.avax.network/avalanche-l1s" target="_blank">
                      <br />
                      <span className="pr-1 text-orange-600 font-bold underline underline-offset-2">
                        Clone it and <strong>start your own community!</strong>
                      </span>
                    </Link>{" "}
                  </span>
                </div>
              </div>
            </div>

            {/* <hr className="w-full border-2 border-white mb-6" /> */}
          </div>
        </div>
      </div>

      <div className="w-full pt-6 bg-base-100">
        <h1 className="text-4xl font-bold font-mono text-center">Features! 🤘</h1>
      </div>

      <div className="hero bg-base-100 flex flex-wrap justify-around gap-3 py-4 lg:p-4">
        <div className="card lg:h-[240px] max-w-[400px] flex flex-col justify-between bg-base-300 shadow-xl">
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <span className="text-6xl">🖼️✍️</span>
            <h2 className="card-title text-2xl font-mono">Pics with captions!</h2>
            <p>Posts can have one image 🖼️ and up to 140 characters of text ✍️</p>
          </div>
        </div>

        <div className="card lg:h-[240px] max-w-[400px] flex flex-col justify-between bg-base-300 shadow-xl">
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <span className="text-6xl">💎</span>
            <h2 className="card-title text-2xl font-mono">Posts are NFTs! </h2>
            <p>
              If you didn&apos;t know,{" "}
              <Link href="https://opensea.io/learn/nft/what-are-nfts" target="_blank">
                <span className="pr-1 text-emerald-600 font-bold underline underline-offset-2">NFTs</span>
              </Link>
              are digital collectibles that can be resold ! 🤯
            </p>
          </div>
        </div>

        <div className="card lg:h-[240px] max-w-[400px] flex flex-col justify-between  lg:rounded-xl bg-base-300 shadow-xl">
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <span className="text-6xl">🫂</span>
            <h2 className="card-title text-2xl font-mono">Social economy! </h2>
            <p>
              Likes ❤️ and comments 💬 send{" "}
              <Link href="https://circle.com/" target="_blank">
                <span className="pr-1 text-blue-600 font-bold underline underline-offset-2">USDC</span>
                <Image src="/usdc-logo.png" alt="USDC" width={20} height={20} className="inline-block" />
              </Link>{" "}
              to the post creator.
            </p>
          </div>
        </div>

        {/* <div className="card lg:h-[240px] max-w-[400px] flex flex-col justify-between  lg:rounded-xl bg-base-100 shadow-xl">
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <span className="text-6xl">🔄</span>
            <h2 className="card-title text-2xl font-mono">Sharing incentives! </h2>
            <p>
              Interactions ❤️💬 from your reposts earn you a % of the post creator{" "}
              <Link href="https://circle.com/" target="_blank">
                <span className="pr-1 text-blue-600 font-bold underline underline-offset-2">USDC</span>
                <Image src="/usdc-logo.png" alt="USDC" width={20} height={20} className="inline-block" />
              </Link>{" "}
              earnings.
            </p>
          </div>
        </div> */}

        {/* <div className="card lg:h-[240px] max-w-[400px] flex flex-col justify-between  lg:rounded-xl bg-black border-2 text-yellow-300 shadow-xl">
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <div className="flex flex-row items-center gap-2">
              <span className="text-6xl">🗳️</span>
              <div className="flex flex-col items-center justify-center gap-2">
                <h2 className="card-title text-2xl font-mono">Survey! </h2>
                <span>
                  How much{" "}
                  <Link href="https://circle.com/" target="_blank">
                    <span className="pr-1 text-blue-600 font-bold underline underline-offset-2">USDC</span>
                    <Image src="/usdc-logo.png" alt="USDC" width={20} height={20} className="inline-block" />
                  </Link>{" "}
                  would you pay for a like?
                </span>
                <div className="max-w-28">
                  <input
                    type="number"
                    value={usdcPrice}
                    onChange={handleUsdcPriceChange}
                    placeholder="0"
                    className="input mt-2 input-ghost focus-within:border-transparent outline-blue-500 focus:outline-green-500 focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border-2 border-blue-500 w-full font-medium placeholder:text-accent/50 text-green-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="card lg:h-[240px] w-[400px] flex flex-col justify-between bg-base-300 shadow-xl">
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <span className="text-6xl">🤹</span>
            {/* <h2 className="card-title text-2xl font-mono">More features! </h2> */}
            <ul className="list-disc text-xl list-inside mt-4">
              <li>
                <span aria-label="revenue">💹</span> Analyze your revenue
              </li>
              <li>
                <span aria-label="notifications">🔔</span> Notifications on activity
              </li>
              <li>
                <span aria-label="messaging">💬</span> Private and group chats
              </li>
            </ul>
          </div>
        </div>

        <div className="card lg:h-[240px] max-w-[400px] flex flex-col justify-between bg-base-300 shadow-xl">
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <span className="text-6xl">👨‍🦽</span>
            <h2 className="card-title text-2xl font-mono">Accesibility! </h2>
            <p>PunkSociety can be used by people with visual or hearing impairments.</p>
          </div>
        </div>

        {/* <div className="card lg:h-[240px] max-w-[400px] flex flex-col justify-between bg-base-100 shadow-xl">
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <span className="text-6xl">🕵️‍♂️</span>
            <h2 className="card-title text-2xl font-mono">Users are real humans! </h2>
            <p>
              We use{" "}Create PunkPosts contract
              <Link href="https://0xparc.org/blog/zk-id-1" target="_blank">
                <span className="pr-1 text-orange-600 font-bold underline underline-offset-2">ZK-identity</span>
              </Link>
              to ensure that all users are real humans rather than AI 🤖...
            </p>
          </div>
        </div> */}

        {/* {usdcPrice ? (
          <div className="card lg:h-[240px] max-w-[400px] flex flex-col justify-between  lg:rounded-xl bg-black border-2 text-yellow-300 shadow-xl">
            <div className="card-body items-center text-center flex-grow overflow-hidden">
              <div className="flex flex-row items-center gap-2">
                <span className="text-6xl">❤️</span>
                <div className="flex flex-col justify-center gap-2">
                  <h2 className="font-bold first-letter text-2xl font-mono">Like the project? </h2>

                  <span>
                    If you&apos;d pay <span className="pr-1 text-blue-600 font-bold">{usdcPrice}</span>
                    <Link href="https://circle.com/" target="_blank">
                      <span className="pr-1 text-blue-600 font-bold underline underline-offset-2">USDC</span>
                      <Image src="/usdc-logo.png" alt="USDC" width={20} height={20} className="inline-block" />
                    </Link>
                    , would you donate us the cost of a like? 🥺
                  </span>

                  <button className="btn btn-warning mt-2">Approve {usdcPrice} USDC</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )} */}

        {/* {averageUsdcPrice ? (
          <div className="card lg:h-[240px] max-w-[400px] flex flex-col justify-between  lg:rounded-xl bg-black border-2 text-yellow-300 shadow-xl">
            <div className="card-body items-center text-center flex-grow overflow-hidden">
              <span className="text-6xl">🗳️</span>
              <h2 className="card-title text-2xl font-mono">Statistics! </h2>
              <span>
                So far, 0 people liked the project and the average price for a like is $0.00{" "}
                <Link href="https://circle.com/" target="_blank">
                  <span className="pr-1 text-blue-600 font-bold underline underline-offset-2">USDC</span>
                  <Image src="/usdc-logo.png" alt="USDC" width={20} height={20} className="inline-block" />
                </Link>{" "}
              </span>
            </div>
          </div>
        ) : (
          ""
        )} */}
      </div>

      {/* <div className="w-full pt-6 bg-base-300">
        <h1 className="text-4xl font-bold font-mono text-center">Tech stack! 🤘</h1>
      </div>

      <div className="hero bg-base-300 flex flex-wrap justify-around gap-3 py-4 lg:p-4">
        <div className="card lg:h-[280px] max-w-[400px] flex flex-col justify-between bg-base-100 shadow-xl">
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <Image src="/scaffold-eth.svg" alt="Scaffold-ETH 2 logo" width={70} height={70} />
            <h2 className="card-title text-2xl font-mono">Scaffold-ETH 2</h2>
            <p>
              Built with{" "}
              <Link href="https://scaffoldeth.io/" target="_blank">
                <span className="pr-1 text-blue-600 font-bold underline underline-offset-2">Scaffold-ETH 2</span>
                <Image
                  src="/scaffold-eth.svg"
                  alt="Scaffold-ETH 2 logo"
                  width={20}
                  height={20}
                  className="inline-block"
                />
              </Link>{" "}
              , using the latest tech stack to build web3 dApps.
            </p>
          </div>
        </div>

        <div className="card lg:h-[280px] max-w-[400px] flex flex-col justify-between bg-base-100 shadow-xl">
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <Image src="/usdc-logo.png" alt="USDC logo" width={70} height={70} />
            <h2 className="card-title text-2xl font-mono">Circle USDC</h2>
            <p>
              Payment for likes and comments is done with{" "}
              <Link href="https://circle.com/" target="_blank">
                <span className="pr-1 text-blue-600 font-bold underline underline-offset-2">USDC</span>
                <Image src="/usdc-logo.png" alt="USDC logo" width={20} height={20} className="inline-block" />
              </Link>{" "}
              for easy accountability.
            </p>
          </div>
        </div>

        <div className="card lg:h-[280px] max-w-[400px] flex flex-col justify-between bg-base-100 shadow-xl">
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <Image src="/chainlink-logo.png" alt="Chainlink logo" width={70} height={70} />
            <h2 className="card-title text-2xl font-mono">Chainlink CCIP</h2>
            <p>
              Bridge NFTs and USDC to other blockchains using{" "}
              <Link href="https://chain.link/cross-chain" target="_blank">
                <span className="pr-1 text-blue-600 font-bold underline underline-offset-2">Chainlink CCIP</span>
                <Image src="/chainlink-logo.png" alt="Chainlink logo" width={20} height={20} className="inline-block" />
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="card lg:h-[280px] max-w-[400px] flex flex-col justify-between bg-base-100 shadow-xl">
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <Image src="/thegraph-logo.png" alt="The Graph logo" width={70} height={70} />
            <h2 className="card-title text-2xl font-mono">The Graph</h2>
            <p>
              Using{" "}
              <Link href="https://thegraph.com/" target="_blank">
                <span className="pr-1 text-blue-600 font-bold underline underline-offset-2">The Graph</span>
                <Image src="/thegraph-logo.png" alt="The Graph logo" width={20} height={20} className="inline-block" />
              </Link>{" "}
              provides efficient, scalable, and real-time querying of blockchain data for Web3 dApps.
            </p>
          </div>
        </div>
      </div> */}

      <div className="hero-content flex-col lg:flex-row-reverse lg:px-14">
        <span className="text-xl">
          If you want to{" "}
          <strong>
            deploy it as an{" "}
            <Link
              href="https://www.coingecko.com/learn/what-are-appchains-application-specific-blockchains"
              target="_blank"
            >
              <span className=" text-red-600 font-bold underline underline-offset-2">appchain</span>
            </Link>
          </strong>
          , there are instructions to test with an{" "}
          <Link href="https://docs.avax.network/avalanche-l1s" target="_blank">
            <span className="pr-1 text-red-600 font-bold underline underline-offset-2">Avalanche L1</span>
            <Image src="/avalanche-logo.png" alt="Avalanche logo" width={20} height={20} className="inline-block" />
          </Link>
          , which allows more customization of the experience with features such as:
        </span>
      </div>

      <div className="hero bg-base-200 flex flex-wrap justify-around gap-3 py-4 lg:p-4">
        <div className="card lg:h-[240px] max-w-[400px] flex flex-col justify-between bg-base-100 shadow-xl">
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <span className="text-6xl">⛽</span>
            <h2 className="card-title text-2xl font-mono">USDC = native gas! </h2>
            <p>
              <Link href="https://circle.com/" target="_blank">
                <span className="pr-1 text-blue-600 font-bold underline underline-offset-2">USDC</span>
                <Image src="/usdc-logo.png" alt="USDC logo" width={20} height={20} className="inline-block" />
              </Link>{" "}
              is used to pay for transactions and interactions on our{" "}
              <Link href="https://docs.avax.network/avalanche-l1s" target="_blank">
                <span className="pr-1 text-red-600 font-bold underline underline-offset-2">Avalanche L1</span>
                <Image src="/avalanche-logo.png" alt="Avalanche logo" width={20} height={20} className="inline-block" />
              </Link>{" "}
              .
            </p>
          </div>
        </div>
        <div className="card lg:h-[240px] max-w-[400px] flex flex-col justify-between items-center bg-base-100 shadow-xl">
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <span className="text-6xl">🫰</span>
            <h2 className="card-title text-2xl font-mono">Earn USDC yield! </h2>
            <p>
              Your{" "}
              <Link href="https://circle.com/" target="_blank">
                <span className="pr-1 text-blue-600 font-bold underline underline-offset-2">USDC</span>
                <Image src="/usdc-logo.png" alt="USDC logo" width={20} height={20} className="inline-block" />
              </Link>{" "}
              generates interest on{" "}
              <Link href="https://aave.com/" target="_blank">
                <span className="pr-1 text-indigo-600 font-bold underline underline-offset-2">AAVE</span>
                <Image src="/aave-logo.png" alt="AAVE logo" width={20} height={20} className="inline-block" />
              </Link>{" "}
              while bridged to our{" "}
              <Link href="https://docs.avax.network/avalanche-l1s" target="_blank">
                <span className="pr-1 text-red-600 font-bold underline underline-offset-2">Avalanche L1</span>
                <Image src="/avalanche-logo.png" alt="Avalanche logo" width={20} height={20} className="inline-block" />
              </Link>{" "}
              !
            </p>
          </div>
        </div>
      </div>

      <div className="w-full  bg-yellow-500">
        <div className="flex flex-col p-6 justify-center items-center  bg-yellow-500 text-black">
          <h1 className="text-4xl font-mono text-center">Wanna know how we&apos;re doing?</h1>
          <div>
            <Link href="/roadmap">
              <button className="btn btn-primary bg-black hover:bg-gray-800 border-0 text-yellow-300">
                See our Roadmap
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full pt-6 bg-base-100">
        <h1 className="text-4xl font-mono text-center">Meet us! 🤘</h1>
      </div>
      <div className="hero bg-base-100 ">
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
