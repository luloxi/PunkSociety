import CollectiblePage from "./CollectiblePage";
import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Collectible Page",
  description: "Built with 🏗 Scaffold-ETH 2",
});

const Page: NextPage = () => {
  return (
    <>
      <CollectiblePage />
    </>
  );
};

export default Page;
