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
          <Image
            src="./placeholder.png"
            alt="Animation clicking a like button and increasing USDC balance"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">What if your social interactions earned you money? 💸</h1>
            <p className="py-6">
              Imagine a platform where every like, comment, or share sends USDC directly to your wallet.
              <br />
              With PunkSociety, we&apos;re building a social protocol that transforms how you interact, earn, and
              connect!
            </p>
            <button className="btn btn-primary bg-green-600 border-0 hover:bg-green-700">Create a profile!</button>
          </div>
        </div>
      </div>
      <div className="hero bg-base-300 ">
        <div className="hero-content flex flex-col">
          <div className="card bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <Image
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
          {/* <div className="card bg-base-100 w-96 shadow-xl">
            <figure className="px-10 pt-10">
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure className="px-10 pt-10">
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
