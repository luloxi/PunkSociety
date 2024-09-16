const fetchFromApi = async ({ path, method, body }: { path: string; method: string; body?: object }) => {
  try {
    const response = await fetch(path, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching from API:", error);
    throw error;
  }
};

export const addToIPFS = (yourJSON: object) => fetchFromApi({ path: "/api/ipfs/add", method: "Post", body: yourJSON });

export const getMetadataFromIPFS = async (ipfsHash: string) => {
  try {
    return await fetchFromApi({ path: "/api/ipfs/get-metadata", method: "Post", body: { ipfsHash } });
  } catch (error) {
    console.error("Error getting metadata from IPFS:", error);
    throw error;
  }
};
