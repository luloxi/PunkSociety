export const EIP_712_DOMAIN = {
  name: "Create",
  version: "1.0.0",
} as const;

// export const EIP_712_DOMAIN = {
//   name: "SimpleMint",
//   version: "1.0.0",
//   chainId: 31337, // Use the correct chain ID
//   verifyingContract: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
// };

export const EIP_712_TYPES__START_COLLECTION = {
  StartCollection: [
    { name: "collectionName", type: "string" },
    { name: "collectionSymbol", type: "string" },
    { name: "description", type: "string" },
    { name: "image", type: "string" },
    { name: "animationUrl", type: "string" },
    { name: "attributes", type: "string" }, // Make sure this matches
    { name: "user", type: "address" },
  ],
};
