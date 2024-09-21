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

export const addToIPFS = async (fileOrJson: File | object, isImage = false) => {
  let body;

  if (isImage && fileOrJson instanceof File) {
    // Handle image upload using FormData
    const formData = new FormData();
    formData.append("file", fileOrJson); // 'fileOrJson' is a File here

    body = formData;
  } else if (!isImage && typeof fileOrJson === "object") {
    // Handle JSON upload by sending as a JSON string
    body = JSON.stringify(fileOrJson);
  } else {
    throw new Error("Invalid input type provided to addToIPFS");
  }

  const path = isImage ? "/api/ipfs/upload-image" : "/api/ipfs/add";
  const method = "POST";

  try {
    const response = await fetch(path, {
      method,
      headers: isImage ? {} : { "Content-Type": "application/json" }, // Only add header for JSON
      body: body,
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

export const getMetadataFromIPFS = async (ipfsHash: string) => {
  try {
    return await fetchFromApi({ path: "/api/ipfs/get-metadata", method: "Post", body: { ipfsHash } });
  } catch (error) {
    console.error("Error getting metadata from IPFS:", error);
    throw error;
  }
};
