import { Explore } from "./Explore";
import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Explore",
  description: "Built with 🏗 Scaffold-ETH 2",
});

const ExplorePage: NextPage = () => {
  return (
    <>
      <Explore />
    </>
  );
};

export default ExplorePage;
