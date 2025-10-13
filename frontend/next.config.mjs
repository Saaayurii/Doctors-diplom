/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',

  // Disable SWC minification for debugging in production
  swcMinify: false,

  // Включаем standalone output для Docker
  output: 'standalone',

  async rewrites() {
    return [
      {
        source: "/login",
        destination:
          "https://telemedicine-pilot-d2anbuaxedbfdba9.southafricanorth-01.azurewebsites.net/login",
      },
    ];
  },

  // Additional webpack configuration for troubleshooting
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false, // Prevents usage of 'fs' on client-side
        path: false,
      };
    }
    return config;
  },
};

export default nextConfig;
