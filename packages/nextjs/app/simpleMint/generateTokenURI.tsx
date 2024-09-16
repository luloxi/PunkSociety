const generateTokenURI = (
  name: string,
  description: string,
  image: string,
  animationUrl: string,
  attributes: { traitType: string; value: string }[],
) => {
  const metadata = {
    name,
    description,
    image,
    animation_url: animationUrl,
    attributes: attributes.map(attr => ({
      trait_type: attr.traitType,
      value: attr.value,
    })),
  };

  // Convert the metadata object to a JSON string
  const jsonString = JSON.stringify(metadata);

  // Encode the JSON string as base64
  const base64Encoded = btoa(jsonString);

  // Construct the data URI
  return `data:application/json;base64,${base64Encoded}`;
};

export default generateTokenURI;
