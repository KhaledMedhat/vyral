import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xou5clnhls.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "jicrd1yaac.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
