const generateTokenURI = (
  description: string,
  image: string,
  animationUrl: string,
  attributes: { traitType: string; value: string }[],
) => {
  // Base metadata object
  const metadata: any = {
    description,
    image,
  };

  // Add `animation_url` only if it's filled
  if (animationUrl) {
    metadata.animation_url = animationUrl;
  }

  // Add `attributes` only if at least one attribute has a non-empty trait and value
  const filteredAttributes = attributes.filter(attr => attr.traitType && attr.value);
  if (filteredAttributes.length > 0) {
    metadata.attributes = filteredAttributes.map(attr => ({
      trait_type: attr.traitType,
      value: attr.value,
    }));
  }

  // Convert the metadata object to a JSON string
  const jsonString = JSON.stringify(metadata);

  // Encode the JSON string as base64
  const base64Encoded = btoa(jsonString);

  // Construct the data URI
  return `data:application/json;base64,${base64Encoded}`;
};

export default generateTokenURI;
