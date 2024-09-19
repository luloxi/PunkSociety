import { Marketplace } from "./_components/Marketplace";
import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Marketplace",
  description: "Built with 🏗 Scaffold-ETH 2",
});

const MarketplacePage: NextPage = () => {
  return (
    <>
      <Marketplace />
    </>
  );
};

export default MarketplacePage;
