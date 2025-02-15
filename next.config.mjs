/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Add Webpack configuration for handling video files
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // Match video/audio file types
      use: {
        loader: 'file-loader',
        options: {
          outputPath: 'static/media', // Where to output files
          publicPath: '/_next/static/media', // Public path for files
          name: '[name].[hash].[ext]', // Naming pattern
        },
      },
    });

    return config;
  },
};

export default nextConfig;
