import { getPosts } from "@/lib/mdx";

export function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.com";
  const items = getPosts().map((p) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${base}/blog/${p.slug}</link>
      <guid>${base}/blog/${p.slug}</guid>
      <description><![CDATA[${p.description}]]></description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
    </item>`).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <title>Designly AI Blog</title>
  <link>${base}/blog</link>
  <description>AI design insights & product updates</description>
  ${items}
</channel></rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}