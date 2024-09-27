// CollectiblesList.tsx
import { Collectible } from "../Explore";
import { NFTCard } from "./NFTCard";

export const NewsFeed = ({ filteredCollectibles }: { filteredCollectibles: Collectible[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-4">
      {filteredCollectibles.map(item => (
        <NFTCard nft={item} key={item.uri} />
      ))}
    </div>
  );
};
