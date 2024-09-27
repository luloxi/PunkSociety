import Image from "next/image";
import { Collectible } from "./MyHoldings";

// For ETH conversion

export const NFTCard = ({ nft }: { nft: Collectible }) => {
  return (
    <div className={`card-compact w-full h-auto lg:w-[300px] relative bg-base-100 group`}>
      {/* Image Section */}
      <figure className="relative">
        <Image
          src={nft.image || "/path/to/default/image.png"}
          alt="NFT Image"
          className="w-full h-auto rounded-lg object-cover"
          layout="responsive"
          width={300}
          height={300}
        />
      </figure>

      <div>
        <div className="card-body space-y-3">
          <div className="flex flex-col justify-center mt-1">
            <p className="my-0 text-lg">{nft.description}</p>
          </div>

          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </div>
  );
};
