"use client";

// import Image from "next/image";
// import Link from "next/link";
import MyNFTs from "./myNFTs/page";
import type { NextPage } from "next";

// import { useAccount } from "wagmi";

// import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  // const { address: connectedAddress } = useAccount();

  return (
    <>
      <MyNFTs />
    </>
  );
};

export default Home;
