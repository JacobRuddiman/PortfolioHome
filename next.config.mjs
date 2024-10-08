/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/, // Target SVG files
        use: ['@svgr/webpack'], // Use @svgr/webpack loader for SVG files
      });
  
      return config;
    },
  };
  
  export default nextConfig;
  