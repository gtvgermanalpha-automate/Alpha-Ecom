import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${siteConfig.name} — eCommerce, Web & Mobile Development`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #111144 0%, #1c1c66 100%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Accent corner */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 360,
            height: 360,
            borderRadius: 9999,
            background: "#F98513",
            opacity: 0.35,
            display: "flex",
          }}
        />

        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#F98513",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 44,
              fontWeight: 800,
            }}
          >
            A
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "white", fontSize: 34, fontWeight: 800 }}>Alpha E-Commerce</span>
            <span style={{ color: "#9BACD8", fontSize: 20, letterSpacing: 4 }}>MARKETPLACE EXPERTS</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
          <span style={{ color: "white", fontSize: 60, fontWeight: 800, lineHeight: 1.12 }}>
            We create &amp; manage your marketplace stores
          </span>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 28, marginTop: 24 }}>
            Amazon · eBay · Etsy · OnBuy · TikTok Shop · Shopify
          </span>
        </div>

        {/* Footer row */}
        <div style={{ display: "flex", gap: 16 }}>
          {["Amazon", "eBay", "Etsy", "Shopify", "TikTok Shop"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 9999,
                padding: "10px 22px",
                color: "white",
                fontSize: 22,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
