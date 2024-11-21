import { Roadmap } from "./Roadmap";
import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Roadmap",
  description: "Built with 🏗 Scaffold-ETH 2",
});

const RoadmapPage: NextPage = () => {
  return (
    <>
      <Roadmap />
    </>
  );
};

export default RoadmapPage;
