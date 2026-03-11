import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const message = searchParams.get("message") || "Anonymous feedback"

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 30,
          color: "white",
          fontFamily: "monospace",
          backgroundColor: "#000000",
          backgroundImage: "radial-gradient(circle at top, #1c1c1c, #000000)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            fontWeight: 700,
            opacity: 0.9,
          }}
        >
          Message Mystery
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            fontSize: 30,
            fontWeight: 600,
            maxWidth: 900,
            alignSelf: "center",
          }}
        >
          "{message}"
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 20,
            opacity: 0.7,
          }}
        >
          Anonymous Feedback
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}