/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "i.pinimg.com",
        },
        {
          protocol: "https",
          hostname: "pixels.com",
        },
        // Add other hostnames if needed
      ],
    },
  };
  
  export default nextConfig;
  