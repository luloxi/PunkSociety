"use client";

import { Marketplace } from "./_components/Marketplace";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

const MarketplacePage: NextPage = () => {
  const { address: isConnected, isConnecting } = useAccount();
  // const { address: connectedAddress, isConnected, isConnecting } = useAccount();

  return (
    <>
      <div className="flex items-center flex-col pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">NFTs for sale</span>
          </h1>
        </div>
      </div>
      <div className="flex justify-center">{!isConnected || isConnecting ? <RainbowKitCustomConnectButton /> : ""}</div>
      <Marketplace />
    </>
  );
};

export default MarketplacePage;
