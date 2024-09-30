const generateTokenURI = (description: string, image: string) => {
  // Base metadata object
  const metadata: any = {
    description,
    image,
  };

  // Convert the metadata object to a JSON string
  const jsonString = JSON.stringify(metadata);

  // Encode the JSON string as base64 using a UTF-8 safe method
  const base64Encoded = utf8ToBase64(jsonString);

  // Construct the data URI
  return `data:application/json;base64,${base64Encoded}`;
};

// Function to encode a UTF-8 string to base64
const utf8ToBase64 = (str: string) => {
  return window.btoa(unescape(encodeURIComponent(str)));
};

export default generateTokenURI;
