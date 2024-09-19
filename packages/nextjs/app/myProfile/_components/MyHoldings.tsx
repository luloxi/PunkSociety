"use client";

import { useEffect, useState } from "react";
import { NFTCard } from "./NFTCard";
import { useAccount } from "wagmi";
import { useScaffoldContract, useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { getMetadataFromIPFS } from "~~/utils/simpleNFT/ipfs-fetch";
import { NFTMetaData } from "~~/utils/simpleNFT/nftsMetadata";

export interface Collectible extends Partial<NFTMetaData> {
  id: number;
  uri: string;
  owner: string;
}

export const MyHoldings = () => {
  const { address: connectedAddress } = useAccount();
  const [myAllCollectibles, setMyAllCollectibles] = useState<Collectible[]>([]);
  const [allCollectiblesLoading, setAllCollectiblesLoading] = useState(false);
  // const [showOnlyMyNFTs, setShowOnlyMyNFTs] = useState(true); // When false, displays all NFTs of the MockNFT collection

  const { data: yourCollectibleContract } = useScaffoldContract({
    contractName: "MockNFT",
  });

  const { data: myTotalBalance } = useScaffoldReadContract({
    contractName: "MockNFT",
    functionName: "balanceOf",
    args: [connectedAddress],
    watch: true,
  });

  useEffect(() => {
    const updateMyCollectibles = async (): Promise<void> => {
      if (yourCollectibleContract === undefined || connectedAddress === undefined) return;

      setAllCollectiblesLoading(true);
      const collectibleUpdate: Collectible[] = [];

      const totalSupply = await yourCollectibleContract.read.totalSupply();

      for (let tokenIndex = 0; tokenIndex < totalSupply; tokenIndex++) {
        try {
          const tokenId = await yourCollectibleContract.read.tokenByIndex([BigInt(tokenIndex)]);
          const tokenURI = await yourCollectibleContract.read.tokenURI([tokenId]);
          const owner = await yourCollectibleContract.read.ownerOf([tokenId]);

          // if (showOnlyMyNFTs && owner.toLowerCase() !== connectedAddress.toLowerCase()) {
          //   continue;
          // }

          const ipfsHash = tokenURI.replace("https://ipfs.io/ipfs/", "");

          const nftMetadata: NFTMetaData = await getMetadataFromIPFS(ipfsHash);

          collectibleUpdate.push({
            id: parseInt(tokenId.toString()),
            uri: tokenURI,
            owner,
            ...nftMetadata,
          });
        } catch (e) {
          notification.error("Error fetching collectibles");
          setAllCollectiblesLoading(false);
          console.log(e);
        }
      }

      collectibleUpdate.sort((a, b) => a.id - b.id);
      setMyAllCollectibles(collectibleUpdate);
      setAllCollectiblesLoading(false);
    };

    updateMyCollectibles();
    // }, [connectedAddress, showOnlyMyNFTs, myTotalBalance]); // Watching balance to update NFTs
  }, [connectedAddress, myTotalBalance]); // Watching balance to update NFTs

  if (allCollectiblesLoading)
    return (
      <div className="flex justify-center items-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <>
      {/* <div className="flex justify-center items-center mt-4">
        <label className="text-primary-content text-xl">
          <input
            type="checkbox"
            className="mr-2"
            checked={showOnlyMyNFTs}
            onChange={() => setShowOnlyMyNFTs(!showOnlyMyNFTs)}
          />
          Show only my NFTs
        </label>
      </div> */}
      {myAllCollectibles.length === 0 ? (
        <div className="flex justify-center items-center mt-10">
          <div className="text-2xl text-primary-content">No NFTs found</div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 my-8 px-5 justify-center">
          {myAllCollectibles.map(item => (
            <NFTCard nft={item} key={item.id} />
          ))}
        </div>
      )}
    </>
  );
};
