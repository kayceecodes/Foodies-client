/** @type {import('next').NextConfig} */
const nextConfig = {
 webpack: (config, { dev }) => {
    if (dev) {
      config.output.chunkLoadTimeout = 30000; // 30 seconds instead of default 10
    }
    return config;
  }
}

module.exports = nextConfig
