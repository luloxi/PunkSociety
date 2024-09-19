import { SimpleMint } from "./_components/SimpleMint";
import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Simple Mint",
  description: "Built with 🏗 Scaffold-ETH 2",
});

const SimpleMintPage: NextPage = () => {
  return (
    <>
      <SimpleMint />
    </>
  );
};

export default SimpleMintPage;
