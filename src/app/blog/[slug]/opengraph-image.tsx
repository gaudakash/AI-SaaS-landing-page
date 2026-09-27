import { ImageResponse } from "next/og";
import { getPost } from "@/lib/mdx";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { meta } = getPost(slug);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#050505",
        color: "#fff",
        fontFamily: "sans-serif",
        borderTop: "16px solid #ff5a1f",
      }}
    >
      <div style={{ fontSize: 26, display: "flex", color: "#ff5a1f" }}>
        {meta.tags?.join(" · ") ?? "Blog"}
      </div>
      <div
        style={{
          fontSize: 68,
          display: "flex",
          fontWeight: 700,
          lineHeight: 1.15,
        }}
      >
        {meta.title}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 26,
          color: "#a1a1a1",
        }}
      >
        <span>
          {meta.author} · {meta.readingTime}
        </span>
        <span>designly.ai</span>
      </div>
    </div>,
    size,
  );
}
