"use client";

import Image from "next/image";
import { NFTMetaData } from "~~/utils/simpleNFT/nftsMetadata";

export interface Post extends Partial<NFTMetaData> {
  postId?: number;
  uri: string;
  user: string;
  date?: string;
}

export const About = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="hero bg-base-200 ">
        <div className="hero-content flex-col lg:flex-row-reverse lg:p-14">
          {/* INSERT HERE A GIF SHOWING HOW A LIKE BECOMES MONEY */}
          <Image
            src="/like-dollar.png"
            alt="Animation clicking a like button and increasing USDC balance"
            className="max-w-sm rounded-lg"
            width={150}
            height={150}
          />
          <div>
            <h1 className="text-6xl font-mono text-center">
              What if you <strong className="text-green-600">earned</strong> 💸 from using social media?
            </h1>
            <p className="pt-6">
              <div className="flex justify-center items-center gap-1 flex-wrap">
                <span className="text-3xl text-center">
                  What if <span className="text-orange-600 font-bold">every like, comment, and share</span>{" "}
                  <span className="text-green-600">changed the</span>
                </span>
                <span className="text-3xl text-blue-600 font-bold">USDC</span>
                <Image src="/usdc-logo.png" alt="USDC" width={30} height={30} />
                <span className="text-3xl">balance of your life? 🤔</span>
              </div>
              <br />
            </p>
            {/* <div className="flex justify-around gap-3">
              <button className="w-1/3 h-16 text-xl btn btn-primary text-white bg-orange-600 border-0 hover:bg-orange-700">
                See some posts!
              </button>

              <button className="w-1/3 h-16 text-xl btn btn-primary text-white bg-blue-600 border-0 hover:bg-blue-700">
                Create a profile!
              </button>
            </div> */}
          </div>
        </div>
      </div>
      <div className="w-full pt-2 bg-base-300">
        <h1 className="text-6xl font-mono text-center">Features! 🤘</h1>
      </div>
      <div className="hero bg-base-300 flex flex-wrap justify-around gap-3 lg:p-4">
        <div className="card lg:h-[500px] max-w-[600px] flex flex-col justify-between  lg:rounded-xl bg-base-100 shadow-xl">
          <figure className=" h-[250px] mt-10 flex-shrink-0">
            <Image src="/socialmonetization.jpg" alt="Social monetization" className="" width={500} height={500} />
          </figure>
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <h2 className="card-title text-3xl font-mono">Social monetization!</h2>
            <p>
              When liking, commenting and sharing, you send USDC to the post creator. If you receive a lot of
              interactions, you&apos;ll receive a lot of USDC!
            </p>
          </div>
        </div>
        <div className="card lg:h-[500px] max-w-[600px] flex flex-col justify-between items-center bg-base-100 shadow-xl">
          <div className="lg:h-[300px] mt-10 w-full overflow-hidden flex justify-center items-center">
            <figure className="px-10 pt-10 flex-shrink-0">
              <Image src="/usdc-yield.jpg" alt="Revenue" className=" object-cover" width={500} height={500} />
            </figure>
          </div>
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <h2 className="card-title text-3xl font-mono">Earn USDC yield!</h2>
            <p>When bridged to our Avalanche L1, USDC gets invested and generates interest on the home blockchain. </p>
          </div>
        </div>

        <div className="card lg:h-[500px] max-w-[600px] flex flex-col justify-between bg-base-100 shadow-xl">
          <figure className="px-10 pt-10 flex-shrink-0">
            <Image src="/usdc-flag.jpg" alt="USDC Flag" className="" width={500} height={500} />
          </figure>
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <h2 className="card-title text-3xl font-mono">USDC is the native gas here!</h2>
            <p>1 USD = 1 USDC = native gas! Nothing else is needed to pay for transactions and interactions.</p>
          </div>
        </div>

        <div className="card lg:h-[500px] max-w-[600px] flex flex-col justify-between items-center bg-base-100 shadow-xl">
          <div className="lg:h-[300px] mt-10 w-full overflow-hidden flex justify-center items-center">
            <figure className="px-10 pt-10 flex-shrink-0">
              <Image src="/revenue.jpg" alt="Revenue" className="object-cover" width={500} height={500} />
            </figure>
          </div>
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <h2 className="card-title text-3xl font-mono">Track your revenue!</h2>
            <p>Analyze your earnings and spendings in your revenue dashboard.</p>
          </div>
        </div>

        <div className="card lg:h-[500px] max-w-[600px] flex flex-col justify-between bg-base-100 shadow-xl">
          <figure className="px-10 pt-10 flex-shrink-0">
            <Image src="/social-login.jpeg" alt="Notifications" className="" width={500} height={500} />
          </figure>
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <h2 className="card-title text-3xl font-mono">Social login!</h2>
            <p>Access with your wallet or your social accounts!</p>
          </div>
        </div>
        <div className="card lg:h-[500px] max-w-[600px] flex flex-col justify-between bg-base-100 shadow-xl">
          <figure className="px-10 pt-10 flex-shrink-0">
            <Image src="/post-types.png" alt="Post types" className="" width={500} height={500} />
          </figure>
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <h2 className="card-title text-3xl font-mono">Several post types!</h2>
            <p>
              Posts can have text, image, audio, video, links and polls.
              <br /> And yeah, they&apos;re all NFTs! 🤯
            </p>
          </div>
        </div>
        <div className="card lg:h-[500px] max-w-[600px] flex flex-col justify-between bg-base-100 shadow-xl">
          <div className="lg:h-[300px] mt-10 w-full overflow-hidden flex justify-center items-center">
            <figure className="px-10 pt-10 flex-shrink-0">
              <Image src="/customize-profile.jpg" alt="Notifications" className="rounded-xl" width={500} height={500} />
            </figure>
          </div>

          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <h2 className="card-title text-3xl font-mono">Customize your profile!</h2>
            <p>Change colors, cover photo, create post collections, and so much more...</p>
          </div>
        </div>

        <div className="card lg:h-[500px] max-w-[600px] flex flex-col justify-between bg-base-100 shadow-xl">
          <div className="lg:h-[300px] mt-10 w-full overflow-hidden flex justify-center items-center">
            <figure className="px-10 pt-10 flex-shrink-0">
              <Image src="/messaging.jpg" alt="Messaging" width={500} height={500} />
            </figure>
          </div>
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <h2 className="card-title text-3xl font-mono">Message with others!</h2>
            <p>Encrypted direct messaging and group chats.</p>
          </div>
        </div>

        <div className="card lg:h-[500px] max-w-[600px] flex flex-col justify-between bg-base-100 shadow-xl">
          <figure className="px-10 pt-10 flex-shrink-0">
            <Image src="/notifications.png" alt="Notifications" className="" width={500} height={500} />
          </figure>
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <h2 className="card-title text-3xl font-mono">Notifications!</h2>
            <p>Get them on our web, on your phone, on your mail...</p>
          </div>
        </div>

        <div className="card lg:h-[500px] max-w-[600px] flex flex-col justify-between bg-base-100 shadow-xl">
          <figure className="px-10 pt-10 flex-shrink-0">
            <Image src="/accesibility.jpg" alt="Accesibility" className="" width={500} height={500} />
          </figure>
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <h2 className="card-title text-3xl font-mono">Accesibility!</h2>
            <p>PunkSociety can be used by people with visual or hearing impairments.</p>
          </div>
        </div>
      </div>

      <div className="w-full pt-2 bg-base-200">
        <h1 className="text-6xl font-mono text-center">Meet the team! 🤘</h1>
      </div>
      <div className="hero bg-base-200 ">
        <div className="hero-content flex-col lg:flex-row-reverse ">
          <a
            className="flex justify-center items-center gap-1"
            href="https://linktr.ee/lulox"
            target="_blank"
            rel="noreferrer"
          >
            <div className="flex flex-col items-center gap-3 bg-base-100">
              <figure className="px-10 pt-5 flex-shrink-0">
                <Image src="/lulox.jpg" alt="Lulox" className="rounded-xl" width={300} height={300} />
              </figure>
              <div className="flex pb-5 flex-col items-center justify-center">
                <h2 className="text-3xl">Lulox</h2>
                <span className="italic">founder, builder</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
