// CollectiblesList.tsx
import { Collectible } from "../Explore";
import { NFTCard } from "./NFTCard";

export const NewsFeed = ({ filteredCollectibles }: { filteredCollectibles: Collectible[] }) => {
  return (
    <div className="flex flex-wrap gap-6 my-4 justify-center">
      {filteredCollectibles.map(item => (
        <NFTCard nft={item} key={item.uri} />
      ))}
    </div>
  );
};
