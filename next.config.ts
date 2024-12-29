import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    ppr: true,
    reactCompiler: true,
  },
}

export default nextConfig
