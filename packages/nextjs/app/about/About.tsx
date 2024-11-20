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
            <h1 className="text-4xl font-bold font-mono text-center">
              Wanna <strong className="text-green-600">earn</strong> 💸 from using social media?
            </h1>
            <p className="pt-6 flex justify-center">
              <span className="text-5xl text-center ">
                Meet <strong>PunkSociety 🤘</strong>!
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="w-full pt-6 bg-base-300">
        <h1 className="text-4xl font-bold font-mono text-center">Features! 🤘</h1>
      </div>
      <div className="hero bg-base-300 flex flex-wrap justify-around gap-3 py-4 lg:p-4">
        <div className="card lg:h-[500px] max-w-[400px] flex flex-col justify-between bg-base-100 shadow-xl">
          <figure className="px-10 pt-10 flex-shrink-0">
            <Image src="/post-types.png" alt="Post types" className="" width={500} height={500} />
          </figure>
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <h2 className="card-title text-2xl font-mono">Post whatever! 🤹‍♂️</h2>
            <p>
              Posts can have text ✍️, image 🖼️, audio 🔈, video ▶️, links 🔗 and polls 📊. <br />
              And yeah,{" "}
              <strong>
                they&apos;re all{" "}
                <Link href="https://opensea.io/learn/nft/what-are-nfts" target="_blank">
                  <span className="pr-1 text-emerald-600 font-bold underline underline-offset-2">NFTs </span>💎
                </Link>{" "}
                , digital collectibles that can be resold ! 🤯
              </strong>
            </p>
          </div>
        </div>

        <div className="card lg:h-[500px] max-w-[400px] flex flex-col justify-between  lg:rounded-xl bg-base-100 shadow-xl">
          <figure className=" h-[250px]  flex-shrink-0">
            <Image src="/socialmonetization.jpg" alt="Social monetization" className="" width={500} height={500} />
          </figure>
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <h2 className="card-title text-2xl font-mono">Social economy! ❤️</h2>
            <p>
              Every like ❤️, comment 💬, and share 🔄 sends{" "}
              <Link href="https://circle.com/" target="_blank">
                <span className="pr-1 text-blue-600 font-bold underline underline-offset-2">USDC</span>
                <Image src="/usdc-logo.png" alt="USDC" width={20} height={20} className="inline-block" />
              </Link>{" "}
              to the post creator. <br />
              If you receive a lot of interactions, you&apos;ll receive a lot of{" "}
              <Link href="https://circle.com/" target="_blank">
                <span className="pr-1 text-blue-600 font-bold underline underline-offset-2">USDC</span>
                <Image src="/usdc-logo.png" alt="USDC" width={20} height={20} className="inline-block" />
              </Link>{" "}
              !
            </p>
          </div>
        </div>

        <div className="card lg:h-[500px] max-w-[400px] flex flex-col justify-between items-center bg-base-100 shadow-xl">
          <div className="lg:h-[300px]  w-full overflow-hidden flex justify-center items-center">
            <figure className="px-10 pt-10 flex-shrink-0">
              <Image src="/revenue.jpg" alt="Revenue" className="object-cover" width={500} height={500} />
            </figure>
          </div>
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <h2 className="card-title text-2xl font-mono">Track your revenue! 💹</h2>
            <p>Analyze your earnings and spendings in your revenue dashboard.</p>
          </div>
        </div>

        <div className="card lg:h-[500px] max-w-[400px] flex flex-col justify-between bg-base-100 shadow-xl">
          <figure className="px-10 pt-10 flex-shrink-0">
            <Image src="/usdc-flag.jpg" alt="USDC Flag" className="" width={500} height={500} />
          </figure>
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <h2 className="card-title text-2xl font-mono">USDC = native gas! ⛽</h2>
            <p>
              <span className="pr-1 text-blue-600 font-bold underline underline-offset-2">USDC</span>
              <Image src="/usdc-logo.png" alt="USDC logo" width={20} height={20} className="inline-block" /> is used to
              pay for transactions and interactions on our{" "}
              <Link href="https://www.avax.network/" target="_blank">
                <span className="pr-1 text-red-600 font-bold underline underline-offset-2">Avalanche</span>
                <Image src="/avalanche-logo.png" alt="Avalanche logo" width={20} height={20} className="inline-block" />
              </Link>{" "}
              L1.
            </p>
          </div>
        </div>

        <div className="card lg:h-[500px] max-w-[400px] flex flex-col justify-between items-center bg-base-100 shadow-xl">
          <div className="lg:h-[300px] w-full overflow-hidden flex justify-center items-center">
            <figure className="px-10 flex-shrink-0">
              <Image src="/usdc-yield.jpg" alt="Revenue" className=" object-cover" width={500} height={500} />
            </figure>
          </div>
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <h2 className="card-title text-2xl font-mono">Earn USDC yield! 🫰</h2>
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
              <Link href="https://www.avax.network/" target="_blank">
                <span className="pr-1 text-red-600 font-bold underline underline-offset-2">Avalanche</span>
                <Image src="/avalanche-logo.png" alt="Avalanche logo" width={20} height={20} className="inline-block" />
              </Link>{" "}
              L1!
            </p>
          </div>
        </div>

        <div className="card lg:h-[500px] max-w-[400px] flex flex-col justify-between bg-base-100 shadow-xl">
          <figure className="px-10 pt-10 flex-shrink-0">
            <Image src="/notifications.png" alt="Notifications" className="" width={500} height={500} />
          </figure>
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <h2 className="card-title text-2xl font-mono">Notifications! 🔔</h2>
            <p>Get informed on activity on our web 🌐, your phone notifications 📱 or your mail 📧.</p>
          </div>
        </div>

        <div className="card lg:h-[500px] max-w-[400px] flex flex-col justify-between bg-base-100 shadow-xl">
          <div className="lg:h-[300px]  w-full overflow-hidden flex justify-center items-center">
            <figure className="px-10 pt-10 flex-shrink-0">
              <Image src="/customize-profile.jpg" alt="Notifications" className="rounded-xl" width={500} height={500} />
            </figure>
          </div>

          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <h2 className="card-title text-2xl font-mono">Display your taste! 🎨</h2>
            <p>Create post collections, change cover photo, and so much more...</p>
          </div>
        </div>

        {/* <div className="card lg:h-[500px] max-w-[400px] flex flex-col justify-between bg-base-100 shadow-xl">
          <figure className="px-10 pt-10 flex-shrink-0">
            <Image src="/social-login.jpeg" alt="Notifications" className="" width={500} height={500} />
          </figure>
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <h2 className="card-title text-2xl font-mono">Social login!</h2>
            <p>Access with your wallet or your social accounts!</p>
          </div>
        </div> */}

        <div className="card lg:h-[500px] max-w-[400px] flex flex-col justify-between bg-base-100 shadow-xl">
          <div className="lg:h-[300px] w-full overflow-hidden flex justify-center items-center">
            <figure className="px-10 pt-10 flex-shrink-0">
              <Image src="/messaging.jpg" alt="Messaging" width={500} height={500} />
            </figure>
          </div>
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <h2 className="card-title text-2xl font-mono">Chat with friends! 💬</h2>
            <p>Encrypted direct messaging and group chats.</p>
          </div>
        </div>

        <div className="card lg:h-[500px] max-w-[400px] flex flex-col justify-between bg-base-100 shadow-xl">
          <figure className="px-10 pt-10 flex-shrink-0">
            <Image src="/accesibility.jpg" alt="Accesibility" className="" width={500} height={500} />
          </figure>
          <div className="card-body items-center text-center flex-grow overflow-hidden">
            <h2 className="card-title text-2xl font-mono">Accesibility! 👨‍🦽</h2>
            <p>PunkSociety can be used by people with visual or hearing impairments.</p>
          </div>
        </div>
      </div>

      <div className="w-full pt-6 bg-base-200">
        <h1 className="text-6xl font-mono text-center">Meet the team! 🤘</h1>
      </div>
      <div className="hero bg-base-200 ">
        <div className="hero-content flex-col lg:flex-row">
          <div className="flex flex-col items-center gap-3 bg-base-100 rounded-lg">
            <figure className="px-10 pt-5 flex-shrink-0">
              <Image src="/lulox.jpg" alt="Lulox" className="rounded-xl" width={300} height={300} />
            </figure>
            <div className="flex pb-5 flex-col items-center justify-center">
              <h2 className="text-3xl">Lulox</h2>
              <span className="italic">buidler</span>
              <a
                className="flex justify-center items-center gap-1"
                href="https://linktr.ee/lulox"
                target="_blank"
                rel="noreferrer"
              >
                <button className="btn btn-success mt-2">Contact me</button>
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 bg-base-100 rounded-lg">
            <figure className="px-10 pt-5 flex-shrink-0">
              <Image src="/guest-profile.jpg" alt="Lulox" className="rounded-xl" width={300} height={300} />
            </figure>
            <div className="flex pb-5 flex-col items-center justify-center">
              <h2 className="text-3xl">You</h2>
              <span className="italic">?</span>
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
