import Marketplace from "./marketplace/page";
import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Marketplace | DARTE",
  description: "Built with 🏗 Scaffold-ETH 2",
});

const Home: NextPage = () => {
  return (
    <>
      <Marketplace />
    </>
  );
};

export default Home;
