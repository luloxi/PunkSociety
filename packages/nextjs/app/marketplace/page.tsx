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
      <div className="flex justify-center">{!isConnected || isConnecting ? <RainbowKitCustomConnectButton /> : ""}</div>
      <Marketplace />
    </>
  );
};

export default MarketplacePage;
