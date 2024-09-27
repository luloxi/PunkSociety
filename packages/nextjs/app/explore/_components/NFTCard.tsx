import Image from "next/image";
import { Address } from "~~/components/scaffold-eth";
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
    <div className={`card-compact bg-base-300 w-[300px] relative group rounded-lg`}>
      {/* Image Section */}
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

      <div className="card-body space-y-3">
        <div className="flex items-center justify-center">
          <div className="flex flex-wrap space-x-2 mt-1">
            {nft.attributes?.map((attr, index) => (
              <span key={index} className="badge badge-primary py-3">
                {attr.value}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center mt-1">
          <p className="my-0 text-lg">{nft.description ?? "No description available."}</p>
        </div>

        {nft.animation_url && (
          <video controls className="w-full h-14">
            <source src={nft.animation_url} type="audio/mpeg" />
          </video>
        )}

        <div className="flex space-x-3 mt-1 items-center">
          <>
            <span className="text-lg font-semibold">Owner: </span>
            <Address address={nft.user} />
          </>
        </div>
      </div>
    </div>
  );
};
