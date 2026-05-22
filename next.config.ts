import type { NextConfig } from "next";

const remotePatterns: any[] = [
  { protocol: 'https', hostname: 'flagcdn.com' },
  { protocol: 'https', hostname: 'images.unsplash.com' },
  { protocol: 'https', hostname: 'plus.unsplash.com' },
  { protocol: 'http', hostname: 'bellnjohn.test', port: '90' },
  { protocol: 'http', hostname: 'bellnjohn.test' },
  { protocol: 'http', hostname: '127.0.0.1', port: '8000' },
  { protocol: 'http', hostname: '127.0.0.1' },
  { protocol: 'http', hostname: 'localhost', port: '8000' },
  { protocol: 'http', hostname: 'localhost' },
];

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;
if (storageUrl) {
  try {
    const parsedUrl = new URL(storageUrl);
    remotePatterns.push({
      protocol: parsedUrl.protocol.replace(':', ''),
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || undefined,
    });
  } catch (e) {
    console.error("Invalid NEXT_PUBLIC_STORAGE_URL for remote pattern configuration:", e);
  }
}

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns,
  },
};

export default nextConfig;