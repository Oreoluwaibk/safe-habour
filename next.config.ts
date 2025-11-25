import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  compiler: {
    removeConsole: false,
  },

  // ✅ Disable minification for debugging (so the "j" variable becomes readable)
  webpack(config, { dev }) {
    if (!dev) {
      config.optimization.minimize = false;
    }
    return config;
  },
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'safeharbour.azurewebsites.net',
        port: '',
        pathname: '/**',
      },
    ]
  }
};

export default nextConfig;
