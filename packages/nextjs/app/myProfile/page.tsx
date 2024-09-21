import { MyProfile } from "./MyProfile";
import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "My Profile",
  description: "Built with 🏗 Scaffold-ETH 2",
});

const SimpleMintPage: NextPage = () => {
  return (
    <>
      <MyProfile />
    </>
  );
};

export default SimpleMintPage;
