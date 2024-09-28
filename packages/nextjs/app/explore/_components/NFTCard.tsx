import Image from "next/image";
import { ProfileAddress } from "./ProfileAddress";
import { NFTMetaData } from "~~/utils/simpleNFT/nftsMetadata";

export interface Collectible extends Partial<NFTMetaData> {
  nftAddress?: string;
  listingId?: number;
  uri: string;
  user: string;
  date?: string;
}

export const NFTCard = ({ nft }: { nft: Collectible }) => {
  return (
    <div className={`card-compact bg-base-300 w-full lg:w-[300px] relative group rounded-lg`}>
      {/* Image Section */}

      {nft.image && nft.image !== "https://ipfs.io/ipfs/" && (
        <figure className="relative">
          <Image
            src={nft.image || "/path/to/default/image.png"}
            alt="NFT Image"
            className="w-full h-auto rounded-lg object-cover"
            layout="responsive" // Ensures responsiveness like the original img
            width={300} // Same as the original container width
            height={300} // Adjust this to maintain the aspect ratio of the image
          />
        </figure>
      )}

      <div className="card-body space-y-3">
        <div className="flex flex-col justify-center mt-1">
          <p className="my-0 text-lg">{nft.description ?? "No description available."}</p>
        </div>

        <div className="flex space-x-3 mt-1 items-center">
          <>
            <span className="text-lg font-semibold">Posted by: </span>
            <ProfileAddress address={nft.user} />
          </>
        </div>
      </div>
    </div>
  );
};
