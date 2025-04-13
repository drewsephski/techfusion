import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  images: {
    unoptimized: false,
    domains: ['localhost'],
  },
  output: 'standalone',
};

export default nextConfig;