import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'lucide-react': path.resolve(__dirname, 'components/ui/Icons.tsx'),
    };
    return config;
  },
  turbopack: {
    resolveAlias: {
      'lucide-react': './components/ui/Icons.tsx',
    },
  },
  // Silence Supabase/Resend/PG bundling warnings
  serverExternalPackages: ['@supabase/supabase-js', 'pg'],
};

export default nextConfig;
