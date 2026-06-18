import { ImageResponse } from "next/og";

export const alt = "Fellowship Dubai S.H.A.P.E. Discovery - Discover how God shaped you to serve";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "edge";

const letters = [
  { letter: "S", label: "Spiritual Gifts" },
  { letter: "H", label: "Heart" },
  { letter: "A", label: "Abilities" },
  { letter: "P", label: "Personality" },
  { letter: "E", label: "Experiences" },
];

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", color: "#ffffff", background: "#12263f" }}>
      <div style={{ position: "absolute", width: 560, height: 560, border: "1px solid rgba(98,201,204,.18)", borderRadius: 999, left: -260, top: -170, display: "flex" }} />
      <div style={{ position: "absolute", width: 380, height: 380, border: "1px solid rgba(236,111,69,.2)", borderRadius: 999, right: -160, bottom: -210, display: "flex" }} />
      <div style={{ width: "68%", height: "100%", padding: "62px 36px 52px 72px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
          <div style={{ width: 52, height: 52, borderRadius: 15, background: "#167d83", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800 }}>FD</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: "#72d2d4", fontSize: 18, fontWeight: 800, letterSpacing: 3 }}>FELLOWSHIP DUBAI</div>
            <div style={{ color: "rgba(255,255,255,.58)", fontSize: 15, marginTop: 5 }}>S.H.A.P.E. DISCOVERY</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#72d2d4", fontSize: 19, fontWeight: 700, letterSpacing: 1.5, marginBottom: 15 }}>YOU WERE SHAPED FOR SERVING GOD</div>
          <div style={{ maxWidth: 720, display: "flex", flexDirection: "column", fontSize: 65, fontWeight: 800, lineHeight: 1.01, letterSpacing: -3 }}>
            <span>Discover how God</span>
            <span><span style={{ color: "#f17a50" }}>SHAPED</span> you to serve.</span>
          </div>
          <div style={{ maxWidth: 650, marginTop: 21, color: "rgba(255,255,255,.72)", fontSize: 20, lineHeight: 1.45 }}>A guided journey to understand your unique ministry profile.</div>
        </div>
        <div style={{ display: "flex", color: "rgba(255,255,255,.68)", fontSize: 15, fontWeight: 600, letterSpacing: .4 }}>Know Jesus&nbsp;&nbsp;·&nbsp;&nbsp;Grow to be like Jesus&nbsp;&nbsp;·&nbsp;&nbsp;Go tell the nations</div>
      </div>
      <div style={{ width: "32%", height: "100%", padding: "54px 54px 54px 18px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
          {letters.map((item, index) => (
            <div key={item.letter} style={{ height: 78, padding: "0 17px", border: "1px solid rgba(255,255,255,.14)", borderRadius: 18, background: index === 0 ? "rgba(236,111,69,.16)" : "rgba(255,255,255,.055)", display: "flex", alignItems: "center", gap: 15 }}>
              <div style={{ width: 46, height: 46, borderRadius: 14, background: index === 0 ? "#ec6f45" : "#167d83", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 850 }}>{item.letter}</div>
              <div style={{ color: "rgba(255,255,255,.86)", fontSize: 17, fontWeight: 650 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    size,
  );
}
