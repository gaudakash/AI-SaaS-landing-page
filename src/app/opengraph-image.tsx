import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        background:
          "radial-gradient(circle at 50% 0%, #4a1a08 0%, #050505 60%)",
        color: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          color: "#ff5a1f",
          letterSpacing: 4,
        }}
      >
        DESIGNLY AI
      </div>

      {/* every multi-child element gets display:flex */}
      <div
        style={{
          display: "flex",
          fontSize: 84,
          fontWeight: 700,
          lineHeight: 1.1,
          marginTop: 24,
        }}
      >
        <span>Automate</span>
        <span style={{ color: "#ff5a1f", marginLeft: 20 }}>Intelligence.</span>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 84,
          fontWeight: 700,
          lineHeight: 1.1,
        }}
      >
        Accelerate Growth.
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 30,
          color: "#a1a1a1",
          marginTop: 32,
        }}
      >
        AI-powered design assistant for creators &amp; teams
      </div>
    </div>,
    size,
  );
}
