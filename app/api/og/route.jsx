import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
          position: "relative",
        }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at center, rgba(0, 0, 255, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%)",
            zIndex: 0,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}>
          <img
            src={`${process.env.NEXT_PUBLIC_SITE_URL}/juragan.png`}
            alt='JuraganIT Logo'
            width='200'
            height='200'
            style={{ marginBottom: "2rem" }}
          />
          <h1
            style={{
              fontSize: 60,
              fontWeight: 800,
              background:
                "linear-gradient(to bottom right, #FFFFFF 20%, #3B82F6)",
              backgroundClip: "text",
              color: "transparent",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              textAlign: "center",
              margin: 0,
              marginBottom: "1rem",
            }}>
            JuraganIT
          </h1>
          <p
            style={{
              fontSize: 30,
              color: "#9CA3AF",
              textAlign: "center",
              margin: 0,
            }}>
            Solusi Digital untuk Bisnis Anda
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
