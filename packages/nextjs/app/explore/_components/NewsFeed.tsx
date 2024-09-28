import React from "react";
import { Post } from "../Explore";
import { NFTCard } from "./NFTCard";

type NewsFeedProps = {
  filteredPosts: Post[];
};

export const NewsFeed: React.FC<NewsFeedProps> = ({ filteredPosts }) => {
  return (
    <div className="mt-4 lg:mt-0 lg:flex lg:justify-center lg:items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:my-4">
        {filteredPosts.map(item => (
          <NFTCard nft={item} key={item.uri} />
        ))}
      </div>
    </div>
  );
};
