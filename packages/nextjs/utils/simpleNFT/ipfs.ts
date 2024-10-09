import { create } from "kubo-rpc-client";

// Pinata gateway configuration
const PINATA_GATEWAY = "https://gateway.pinata.cloud/ipfs/";

export const ipfsClient = create({
  host: "gateway.pinata.cloud",
  port: 443,
  protocol: "https",
});

/**
 * Helper function to extract the IPFS hash from a full URL if necessary
 */
function extractIpfsHash(input: string): string {
  // Check if the input is a full URL (e.g., https://ipfs.io/ipfs/Qm...)
  if (input.startsWith("http")) {
    // Extract the hash part after '/ipfs/'
    const hashIndex = input.indexOf("/ipfs/");
    if (hashIndex !== -1) {
      return input.slice(hashIndex + 6); // Return everything after "/ipfs/"
    }
  }
  // If it's already a hash, return it as is
  return input;
}

/**
 * Fetch NFT metadata from Pinata
 * Maybe needs to be improved for handling both full URLs and raw IPFS hashes.
 */
export async function getNFTMetadataFromIPFS(ipfsHash: string) {
  const hash = extractIpfsHash(ipfsHash);
  const url = `${PINATA_GATEWAY}${hash}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch metadata from Pinata: ${response.statusText}`);
  }
  return await response.json();
}
