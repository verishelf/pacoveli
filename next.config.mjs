/** @type {import('next').NextConfig} */
const nextConfig = {
  // Do not set `turbopack.root` here: it can break `tailwindcss` / PostCSS resolution when parent folders
  // have other package.json lockfiles. Music data uses relative JSON imports from `src/app/**` to avoid
  // wrong `\@/data` resolution. For lockfile warnings, run `npm run dev` from this folder only.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "is1-ssl.mzstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "is2-ssl.mzstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "is3-ssl.mzstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "is4-ssl.mzstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "is5-ssl.mzstatic.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
