import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath:
    process.env.GITHUB_ACTIONS === "true" &&
    process.env.GITHUB_REPOSITORY === "hugolalmeida/adv_land_page-Victor"
      ? "/adv_land_page-Victor"
      : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

