"use client";

import { useState } from "react";
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
  const [usdcPrice, setUsdcPrice] = useState<number>(1);
  // const [averageUsdcPrice, setAverageUsdcPrice] = useState<number>();
  const averageUsdcPrice = "";

  const handleUsdcPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setUsdcPrice(value < 0 ? 0 : value);
  };

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
            <h1
              className="text-4xl font-bold text-center 
          font-mono "
            >
              WTF is <strong>PunkSociety? 🤘</strong>
            </h1>
            <div className="my-2 flex items-center justify-center">
              <span className="text-2xl text-center rounded-lg p-2 text-green-600 font-bold">
                Use social media and earn! 🤑
              </span>
            </div>
            <span className="text-lg text-center pt-2">
              Social protocol where interactions are monetized 💰 <br />
              Users earn while engaging with their community 🫂
            </span>
          </div>
        </div>
      </div>
      <div className="w-full pt-6 bg-base-300">
        <h1 className="text-4xl font-bold font-mono text-center">Features! 🤘</h1>
      </div>

      <div className="hero bg-base-300 flex flex-wrap justify-around gap-3 py-4 lg:p-4">
        <div className="card lg:h-[240px] max-w-[400px] flex flex-col justify-between bg-base-100 shadow-xl">
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <span className="text-6xl">🖼️✍️</span>
            <h2 className="card-title text-2xl font-mono">Pics with captions!</h2>
            <p>Posts can have one image 🖼️ and up to 140 characters of text ✍️</p>
          </div>
        </div>

        <div className="card lg:h-[240px] max-w-[400px] flex flex-col justify-between bg-base-100 shadow-xl">
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

        <div className="card lg:h-[240px] max-w-[400px] flex flex-col justify-between  lg:rounded-xl bg-base-100 shadow-xl">
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

        {/* <div className="card lg:h-[240px] max-w-[400px] flex flex-col justify-between items-center bg-base-100 shadow-xl">
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
        </div> */}

        {/* <div className="card lg:h-[240px] max-w-[400px] flex flex-col justify-between bg-base-100 shadow-xl">
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
        </div> */}

        <div className="card lg:h-[240px] max-w-[400px] flex flex-col justify-between  lg:rounded-xl bg-black border-2 text-yellow-300 shadow-xl">
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
        </div>

        <div className="card lg:h-[240px] w-[400px] flex flex-col justify-between bg-base-100 shadow-xl">
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <span className="text-6xl">🤹</span>
            {/* <h2 className="card-title text-2xl font-mono">More features! </h2> */}
            <ul className="list-disc list-inside mt-4">
              <li>
                <span aria-label="messaging">💬</span> Private and group chats
              </li>
              <li>
                <span aria-label="notifications">🔔</span> Notifications on activity
              </li>
              <li>
                <span aria-label="customization">🎨</span> Customize your profile
              </li>
              <li>
                <span aria-label="revenue">💹</span> Analyze your revenue
              </li>
            </ul>
          </div>
        </div>

        <div className="card lg:h-[240px] max-w-[400px] flex flex-col justify-between bg-base-100 shadow-xl">
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

        {usdcPrice ? (
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
        )}

        {averageUsdcPrice ? (
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
        )}
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
