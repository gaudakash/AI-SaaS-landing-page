import { getPosts } from "@/lib/mdx";
export default function sitemap() {
  const base = "https://yourdomain.com";
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/blog`, lastModified: new Date() },
    ...getPosts().map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.date) })),
  ];
}