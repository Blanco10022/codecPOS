/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'out',
    eslint: {
      ignoreDuringBuilds: true,
    },
    // assetPrefix: './',
    trailingSlash: true,
    reactStrictMode: true,
    images: {
      unoptimized: true,
    },
  };
  
  export default nextConfig;
