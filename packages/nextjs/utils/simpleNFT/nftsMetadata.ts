const nftsMetadata = [
  {
    name: "PiccaWho?",
    description: "House music for the soul.",
    // external_url: "https://austingriffith.com/portfolio/paintings/", // <-- this can link to a page for the specific file too
    image: "https://ipfs.io/ipfs/QmdsAeLoVrhu9APcXZuTGfnptgSrty2rfUULr5bqEEotLK",
    animation_url: "https://ipfs.io/ipfs/QmfF1jkVp339GXh5VtuYF3Kj4wLfKfYieQ8zp47LQWM8RP",
    attributes: [
      {
        trait_type: "Artwork",
        value: "abstract",
      },
      {
        trait_type: "Reproduction Type",
        value: "mp3",
      },
      {
        trait_type: "Track Length",
        value: "4:20",
      },
    ],
  },
  {
    description: "Reproduce and repeat.",
    // external_url: "https://austingriffith.com/portfolio/paintings/", // <-- this can link to a page for the specific file too
    image: "https://ipfs.io/ipfs/Qmf5UMKoWMEmza91tYT9UPx5PeSaburp9VeeN5w6NUFVG8",
    animation_url: "https://ipfs.io/ipfs/QmT4RaimopnKHxAF81ut9MBFLGqun1CyTM39ZEmKxDxkoL",
    name: "Mitosis 42",
    attributes: [
      {
        trait_type: "Artwork",
        value: "nebula",
      },
      {
        trait_type: "Reproduction Type",
        value: "mp3",
      },
      {
        trait_type: "Track Length",
        value: "3:39",
      },
    ],
  },
  {
    description: "Ambient music for blobs.",
    // external_url: "https://austingriffith.com/portfolio/paintings/", // <-- this can link to a page for the specific file too
    image: "https://ipfs.io/ipfs/QmZzYevVxn2bLwFWBpM67k74htu6m2pidsFnGcJebgtCA1",
    animation_url: "https://ipfs.io/ipfs/QmU7yNcUHCg2XuszsZKcmo113oKdXf6jfNJUF6odNdFoaK",
    name: "Blob miniworld",
    attributes: [
      {
        trait_type: "Artwork",
        value: "miniworld",
      },
      {
        trait_type: "Reproduction Type",
        value: "mp3",
      },
      {
        trait_type: "Track Length",
        value: "2:31",
      },
    ],
  },
  {
    description: "Fly away with us.",
    // external_url: "https://austingriffith.com/portfolio/paintings/", // <-- this can link to a page for the specific file too
    image: "https://ipfs.io/ipfs/QmchotzQo58tXY6Qd8foo4bdVaCzUSyqZEabn4no5r8KrX",
    animation_url: "https://ipfs.io/ipfs/QmTMwY2gRBoY2auvJZTRMtw7N4ZiPzPMqMBiRbQN5358tk",
    name: "Butterfly 3D",
    attributes: [
      {
        trait_type: "Artwork",
        value: "3D world",
      },
      {
        trait_type: "Reproduction Type",
        value: "mp3",
      },
      {
        trait_type: "Track Length",
        value: "4:15",
      },
    ],
  },
  // {
  //   description: "So delicate.",
  //   // external_url: "https://austingriffith.com/portfolio/paintings/", // <-- this can link to a page for the specific file too
  //   image: "https://austingriffith.com/images/paintings/flamingo.jpg",
  //   animation_url: "https://ipfs.io/ipfs/QmfF1jkVp339GXh5VtuYF3Kj4wLfKfYieQ8zp47LQWM8RP",
  //   name: "Flamingo",
  //   attributes: [
  //     {
  //       trait_type: "BackgroundColor",
  //       value: "black",
  //     },
  //     {
  //       trait_type: "Eyes",
  //       value: "googly",
  //     },
  //     {
  //       trait_type: "Stamina",
  //       value: 6,
  //     },
  //   ],
  // },
  // {
  //   description: "Raaaar!",
  //   // external_url: "https://austingriffith.com/portfolio/paintings/", // <-- this can link to a page for the specific file too
  //   image: "https://austingriffith.com/images/paintings/godzilla.jpg",
  //   animation_url: "https://ipfs.io/ipfs/QmfF1jkVp339GXh5VtuYF3Kj4wLfKfYieQ8zp47LQWM8RP",
  //   name: "Godzilla",
  //   attributes: [
  //     {
  //       trait_type: "BackgroundColor",
  //       value: "orange",
  //     },
  //     {
  //       trait_type: "Eyes",
  //       value: "googly",
  //     },
  //     {
  //       trait_type: "Stamina",
  //       value: 99,
  //     },
  //   ],
  // },
];

export type NFTMetaData = (typeof nftsMetadata)[number];

export default nftsMetadata;
