import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { withSentryConfig } from "@sentry/nextjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  sentry: {
    hideSourceMaps: true,
    hideSourceMapsInDev: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, ".."),
      "@/components": path.resolve(__dirname, "..", "components"),
      "@/lib": path.resolve(__dirname, "..", "lib"),
      "@/types": path.resolve(__dirname, "..", "types"),
    };
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  images: {
    unoptimized: false,
    domains: ['localhost'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
  },
  experimental: {
    optimizeCss: true,
  },
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
      {
        source: '/ingest/decide',
        destination: 'https://us.i.posthog.com/decide',
      },
    ];
  },
  skipTrailingSlashRedirect: true,
  env: {
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
  org: 'shubhdeep-chhabra',
  project: 'shubhdeepchhabra',
  widenClientFileUpload: true,
  transpileClientSDK: true,
  tunnelRoute: '/monitoring',
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);