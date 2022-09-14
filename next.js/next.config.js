
/** @type {import('next').NextConfig} */

module.exports = {
  webpack: (config) => {
    /**
     * Make HMR work in all ./node_modules/@pangolindex/ libraries
     * Needed after the next.js 12 upgrade along with transpiling the @pangolindex libraries
     */
    config.snapshot = {
      ...(config.snapshot ?? {}),
      managedPaths: [/^(.+?[\\/]node_modules[\\/])(?!@pangolindex)/],
    };

    // Replace the '**/node_modules/**' with a regex that excludes node_modules except @pangolindex
    config.watchOptions = {
      ...(config.watchOptions ?? {}),
      ignored: [
        "**/.git/**",
        "**/node_modules/!(@pangolindex)**",
        "**/.next/**",
      ],
    };

    return config;
  },
  reactStrictMode: false,
  swcMinify: true,
};
