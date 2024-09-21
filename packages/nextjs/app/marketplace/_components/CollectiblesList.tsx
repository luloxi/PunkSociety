// CollectiblesList.tsx
import { Collectible } from "../Marketplace";
import { NFTCard } from "./NFTCard";

export const CollectiblesList = ({ filteredCollectibles }: { filteredCollectibles: Collectible[] }) => {
  return (
    <div className="flex flex-wrap gap-6 my-4 px-5 justify-center">
      {filteredCollectibles.map(item => (
        <NFTCard nft={item} key={item.uri} />
      ))}
    </div>
  );
};
