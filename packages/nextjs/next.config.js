// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  eslint: {
    ignoreDuringBuilds: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ipfs.io",
        port: "",
        pathname: "/ipfs/**",
      },
      {
        protocol: "https",
        hostname: "gateway.pinata.cloud",
        port: "",
        pathname: "/ipfs/**",
      },
      {
        protocol: "https",
        hostname: "img.daisyui.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;

// module.exports = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "ipfs.io",
//         port: "",
//         pathname: "/ipfs/**",
//       },
//       {
//         protocol: "https",
//         hostname: "gateway.pinata.cloud",
//         port: "",
//         pathname: "/ipfs/**",
//       },
//     ],
//   },
// };
