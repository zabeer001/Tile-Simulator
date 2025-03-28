/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['127.0.0.1', 'localhost', 'hebbkx1anhila5yf.public.blob.vercel-storage.com'],
  },
  async rewrites() {
    return [
      {
        source: "/api/tiles",
        destination: "https://tilecustomizer.scaleupdevagency.com/api/tiles", // Production
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/api/colors',
        destination: 'http://127.0.0.1:8000/api/colors',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
