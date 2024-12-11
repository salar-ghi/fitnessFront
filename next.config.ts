// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */

const nextConfig = {
  // output: 'export',
  // reactstrictMode: false,
  eslint: {
  ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true, // Set to true for permanent redirects (301)
      },
    ];
},
};

module.exports = nextConfig;


// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// }

// module.exports = nextConfig
