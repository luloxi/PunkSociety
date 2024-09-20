import { create } from "kubo-rpc-client";

const PROJECT_ID = "2GajDLTC6y04qsYsoDRq9nGmWwK";
const PROJECT_SECRET = "48c62c6b3f82d2ecfa2cbe4c90f97037";
const PROJECT_ID_SECRET = `${PROJECT_ID}:${PROJECT_SECRET}`;

export const ipfsClient = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    Authorization: `Basic ${Buffer.from(PROJECT_ID_SECRET).toString("base64")}`,
  },
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
 * Fetch NFT metadata from IPFS, handling both full URLs and raw IPFS hashes.
 */
export async function getNFTMetadataFromIPFS(ipfsInput: string) {
  // Extract the IPFS hash from the input (either full URL or hash)
  const ipfsHash = extractIpfsHash(ipfsInput);

  // Fetch the metadata from IPFS
  for await (const file of ipfsClient.get(ipfsHash)) {
    // The file is of type unit8array so we need to convert it to string
    const content = new TextDecoder().decode(file);
    // Remove any leading/trailing whitespace
    const trimmedContent = content.trim();
    // Find the start and end index of the JSON object
    const startIndex = trimmedContent.indexOf("{");
    const endIndex = trimmedContent.lastIndexOf("}") + 1;
    // Extract the JSON object string
    const jsonObjectString = trimmedContent.slice(startIndex, endIndex);
    try {
      // Parse the extracted JSON string
      const jsonObject = JSON.parse(jsonObjectString);
      return jsonObject;
    } catch (error) {
      console.log("Error parsing JSON:", error);
      return undefined;
    }
  }
}
