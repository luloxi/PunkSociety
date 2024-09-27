const generateTokenURI = (description: string, image: string) => {
  // Base metadata object
  const metadata: any = {
    description,
    image,
  };

  // Convert the metadata object to a JSON string
  const jsonString = JSON.stringify(metadata);

  // Encode the JSON string as base64
  const base64Encoded = btoa(jsonString);

  // Construct the data URI
  return `data:application/json;base64,${base64Encoded}`;
};

export default generateTokenURI;
