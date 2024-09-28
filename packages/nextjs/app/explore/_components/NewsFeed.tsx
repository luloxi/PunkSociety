import React from "react";
import { Collectible } from "../Explore";
import { NFTCard } from "./NFTCard";

type NewsFeedProps = {
  filteredCollectibles: Collectible[];
};

export const NewsFeed: React.FC<NewsFeedProps> = ({ filteredCollectibles }) => {
  return (
    <div className="mt-4 lg:mt-0 lg:flex lg:justify-center lg:items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:my-4">
        {filteredCollectibles.map(item => (
          <NFTCard nft={item} key={item.uri} />
        ))}
      </div>
    </div>
  );
};
