const nftsMetadata = [
  {
    name: "Microworld",
    description: "Plants are magical.",
    // external_url: "https://austingriffith.com/portfolio/paintings/", // <-- this can link to a page for the specific file too
    image: "https://ipfs.io/ipfs/QmSUzqAbhU2HYfD5j9kdhFS92rUh1j84hMAgPizvGAHBbZ",
    animation_url: "https://ipfs.io/ipfs/QmfF1jkVp339GXh5VtuYF3Kj4wLfKfYieQ8zp47LQWM8RP",
    attributes: [
      {
        trait_type: "Greenness",
        value: "Lovely",
      },
      {
        trait_type: "Feeling",
        value: "Sunny and peaceful",
      },
    ],
  },
  {
    name: "Desolated rails",
    description: "Sometimes the shortest way is to follow the rails.",
    // external_url: "https://austingriffith.com/portfolio/paintings/", // <-- this can link to a page for the specific file too
    image: "https://ipfs.io/ipfs/Qmdw6ujzDhn6GEcXgJbQ8KWDuFyTDD7xpMcepcqTERKgCK",
    animation_url: "https://ipfs.io/ipfs/QmfF1jkVp339GXh5VtuYF3Kj4wLfKfYieQ8zp47LQWM8RP",

    attributes: [],
  },
  {
    name: "Fork cemetery",
    description: "R.I.P.",
    // external_url: "https://austingriffith.com/portfolio/paintings/", // <-- this can link to a page for the specific file too
    image: "https://ipfs.io/ipfs/QmZhs1eddBRFLtZ6enF7mzk4n5trE1WyLAgtWeWNHGAigX",
    animation_url: "https://ipfs.io/ipfs/QmTMwY2gRBoY2auvJZTRMtw7N4ZiPzPMqMBiRbQN5358tk",

    attributes: [
      {
        trait_type: "Deaths",
        value: "3 deaths",
      },
    ],
  },
  {
    name: "Colorful Car",
    description: "You wouldn't drive this car, but you'd definitely look at it.",
    // external_url: "https://austingriffith.com/portfolio/paintings/", // <-- this can link to a page for the specific file too
    image: "https://ipfs.io/ipfs/QmYQRbB6knc9FqNV6X8p49tKNg6e3Rh9hWXcJEf3hTvKfn",
    animation_url: "https://ipfs.io/ipfs/QmU7yNcUHCg2XuszsZKcmo113oKdXf6jfNJUF6odNdFoaK",

    attributes: [
      {
        trait_type: "Colors",
        value: "All colors",
      },
    ],
  },
  {
    name: "Dog in a bike",
    description: "Just as expected",
    // external_url: "https://austingriffith.com/portfolio/paintings/", // <-- this can link to a page for the specific file too
    image: "https://ipfs.io/ipfs/QmccnSeQc9ND2pUfEkFhQWxyU3Gu4WDRv4J11QgUtpkU3H",
    animation_url: "https://ipfs.io/ipfs/QmT4RaimopnKHxAF81ut9MBFLGqun1CyTM39ZEmKxDxkoL",

    attributes: [
      {
        trait_type: "Dogs",
        value: "U can",
      },
      {
        trait_type: "Moto",
        value: "Cool",
      },
    ],
  },
  {
    name: "Strange Lights",
    description: "They look cool tho",
    // external_url: "https://austingriffith.com/portfolio/paintings/", // <-- this can link to a page for the specific file too
    image: "https://ipfs.io/ipfs/QmQKQ86SaENES9j494UGwitP1d1F2Cxg52KFF1W6Kv5NQ2",
    animation_url: "https://ipfs.io/ipfs/QmfF1jkVp339GXh5VtuYF3Kj4wLfKfYieQ8zp47LQWM8RP",

    attributes: [],
  },
];

export type NFTMetaData = (typeof nftsMetadata)[number];

export default nftsMetadata;
