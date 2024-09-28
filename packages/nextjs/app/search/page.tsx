import { Search } from "./Search";
import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Search",
  description: "Built with 🏗 Scaffold-ETH 2",
});

const SearchPage: NextPage = () => {
  return (
    <>
      <Search />
    </>
  );
};

export default SearchPage;
