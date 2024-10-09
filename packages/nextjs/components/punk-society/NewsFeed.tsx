import React from "react";
import { Post } from "../../app/explore/Explore";
import { PostCard } from "./PostCard";

type NewsFeedProps = {
  posts: Post[];
  isGrid?: boolean; // Optional prop to control grid layout
};

export const NewsFeed: React.FC<NewsFeedProps> = ({ posts, isGrid = false }) => {
  return (
    <div className="mt-4 lg:flex lg:justify-center lg:items-center">
      <div
        className={`${
          isGrid
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-3 lg:my-2"
            : "flex flex-col gap-3 w-[100%] lg:w-[500px]"
        }`}
      >
        {posts.map(post => (
          <PostCard post={post} key={post.uri} isGrid={isGrid} />
        ))}
      </div>
    </div>
  );
};
