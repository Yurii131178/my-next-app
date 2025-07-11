import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      {
        protocol: 'https',
        hostname: 'fastly.picsum.photos',
        pathname: '/**', // дозволяє всі шляхи
      },
      { protocol: 'https', hostname: 'aliiev-lomach.com' },
    ],
  },
};

export default nextConfig;
