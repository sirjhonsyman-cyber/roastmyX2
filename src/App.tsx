import { useState } from "react";

const STYLES: { label: string; value: string }[] = [
  { label: "Gen Z 💀", value: "gen_z" },
  { label: "Corporate 📊", value: "corporate" },
  { label: "Shakespeare 🎭", value: "shakespeare" },
  { label: "Therapist 🛋️", value: "therapist" },
];

const styleMap: Record<string, string> = {
  gen_z: "Use Gen Z slang: no cap, lowkey, it's giving, slay, ratio, cope. Be chaotic and unhinged.",
  corporate: "Write like a passive-aggressive corporate performance review. Use business jargon ironically.",
  shakespeare: "Write in dramatic Shakespearean English with thee, thou, dost, forsooth. Make it theatrical.",
  therapist: "Write like a concerned therapist diagnosing serious psychological issues. Clinical but devastating.",
};

export default function RoastMyX() {
  const [handle, setHandle] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [style, setStyle] = useState<string>("gen_z");
  const [roast, setRoast] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  const generate = async () => {
    if (!handle && !bio) return;
    setLoading(true);
    setRoast("");

    const prompt = `You are the world's most savage roast comedian. Roast this X (Twitter) profile.

Handle: ${handle || "Unknown"}
Bio: ${bio || "No bio"}

Rules:
- Show zero mercy, be devastatingly brutal, roast them to ash
- ${styleMap[style]}
- Reference specifics from what they provided
- Exactly 3-4 lines. No fluff. Every line must land.
- Last line is the mic drop — most devastating of all
- NO racism, sexism, or slurs. Only roast their Twitter personality.
- Make it so quotable they HAVE to screenshot it

Write ONLY the roast. Nothing else.`;

    try {
     const res = await fetch("/api/roast", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ prompt }),
});
      const data = await res.json();
      const text: string = data.content?.map((b: { text?: string }) => b.text || "").join("") || "The AI refused. Even robots pity you.";
      setRoast(text);
      setCount((c) => c + 1);
    } catch {
      setRoast("Something broke... but honestly your profile is already a roast.");
    } finally {
      setLoading(false);
    }
  };

  const copyRoast = () => {
    navigator.clipboard.writeText(`🔥 My X profile got roasted on RoastMyX.com:\n\n"${roast}"`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      fontFamily: "'Courier New', monospace",
      color: "#fff",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes floatUp { 0%{transform:translateY(0) scale(1);opacity:1} 100%{transform:translateY(-60px) scale(0);opacity:0} }
        @keyframes flicker { 0%,100%{opacity:1} 50%{opacity:0.75} }
        @keyframes pulse { 0%,100%{box-shadow:0 0 20px #ff4400aa} 50%{box-shadow:0 0 40px #ff4400,0 0 80px #ff220044} }
        @keyframes pop { 0%{transform:scale(0.9);opacity:0} 80%{transform:scale(1.03)} 100%{transform:scale(1);opacity:1} }
        @keyframes stripeScroll { 0%{background-position:0 0} 100%{background-position:60px 0} }
        .roast-btn:hover { transform:translateY(-2px); }
        .roast-btn:active { transform:translateY(0); }
        .chip { transition:all 0.15s; cursor:pointer; }
        .chip:hover { filter:brightness(1.3); }
        input:focus, textarea:focus { border-color:#ff4400 !important; outline:none; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-thumb { background:#ff4400; }
      `}</style>

      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        background: "repeating-linear-gradient(45deg, transparent, transparent 28px, rgba(255,68,0,0.03) 28px, rgba(255,68,0,0.03) 30px)",
        animation: "stripeScroll 3s linear infinite",
      }} />

      {[...Array(10)].map((_, i) => (
        <div key={i} style={{
          position: "fixed", bottom: 0, left: `${5 + i * 10}%`,
          width: "5px", height: "5px", borderRadius: "50%",
          background: "radial-gradient(circle, #fff 0%, #ff6b00 60%, transparent 100%)",
          animation: `floatUp ${1.5 + (i % 3) * 0.4}s ease-out infinite`,
          animationDelay: `${i * 0.25}s`, pointerEvents: "none",
        }} />
      ))}

      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "40px 20px 80px", position: "relative", zIndex: 1 }}>

        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "6px", color: "#ff4400", marginBottom: "14px", textTransform: "uppercase", animation: "flicker 3s infinite" }}>
            ⚡ FULLY AUTOMATED DESTRUCTION ⚡
            {count > 0 && <span style={{ marginLeft: "12px", color: "#ff8844" }}>• {count} souls roasted</span>}
          </div>
          <h1 style={{
            fontSize: "clamp(52px, 12vw, 88px)", fontWeight: 900,
            margin: 0, lineHeight: 0.88, letterSpacing: "-3px",
            background: "linear-gradient(135deg, #fff 0%, #ff6600 50%, #ff2200 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            ROAST<br />MY X
          </h1>
          <p style={{ color: "#555", fontSize: "13px", marginTop: "16px", letterSpacing: "2px" }}>
            PASTE YOUR PROFILE. RECEIVE DESTRUCTION.
          </p>
        </div>

        <div style={{ background: "#111", border: "1px solid #222", borderRadius: "2px", padding: "32px", marginBottom: "20px" }}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "10px", letterSpacing: "3px", color: "#ff4400", display: "block", marginBottom: "8px" }}>@ HANDLE</label>
            <input value={handle} onChange={(e) => setHandle(e.target.value)} placeholder="@elonmusk"
              style={{ width: "100%", background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: "2px", padding: "12px 16px", color: "#fff", fontSize: "14px", boxSizing: "border-box", fontFamily: "inherit" }}
            />
          </div>
          <div>
            <label style={{ fontSize: "10px", letterSpacing: "3px", color: "#ff4400", display: "block", marginBottom: "8px" }}>BIO</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="CEO of something. Thought leader. Dog dad 🐶" rows={3}
              style={{ width: "100%", background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: "2px", padding: "12px 16px", color: "#fff", fontSize: "14px", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }}
            />
          </div>
        </div>

        <button className="roast-btn" onClick={generate} disabled={loading || (!handle && !bio)}
          style={{
            width: "100%", padding: "20px",
            background: loading ? "#1a0a00" : "linear-gradient(135deg, #ff4400, #ff0000)",
            border: "none", borderRadius: "2px", color: "#fff",
            fontSize: "16px", fontWeight: 900, letterSpacing: "4px",
            cursor: loading || (!handle && !bio) ? "not-allowed" : "pointer",
            fontFamily: "inherit", textTransform: "uppercase",
            opacity: (!handle && !bio) ? 0.4 : 1,
            transition: "all 0.2s", marginBottom: "20px",
            animation: loading ? "pulse 1s infinite" : "none",
          }}>
          {loading ? "🔥 INCINERATING..." : "🔥 ROAST ME"}
        </button>

        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#555", marginBottom: "10px" }}>ROAST STYLE</div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {STYLES.map((opt) => (
              <button key={opt.value} className="chip" onClick={() => setStyle(opt.value)} style={{
                flex: 1, minWidth: "120px", padding: "11px 12px", borderRadius: "2px",
                background: style === opt.value ? "#1a0a00" : "#111",
                border: `1px solid ${style === opt.value ? "#ff6600" : "#222"}`,
                color: style === opt.value ? "#ff6600" : "#555",
                fontSize: "12px", fontFamily: "inherit", fontWeight: 700,
              }}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div style={{ textAlign: "center", marginTop: "16px", color: "#ff4400", fontSize: "11px", letterSpacing: "3px", animation: "flicker 1s infinite" }}>
            AI IS READING YOUR EMBARRASSING BIO...
          </div>
        )}

        {roast && !loading && (
          <div style={{ marginTop: "32px", animation: "pop 0.4s ease-out" }}>
            <div style={{ background: "#0f0500", border: "1px solid #ff4400", borderRadius: "2px", padding: "32px", boxShadow: "0 0 40px rgba(255,68,0,0.15)", position: "relative" }}>
              <div style={{ fontSize: "10px", letterSpacing: "4px", color: "#ff4400", marginBottom: "20px", animation: "flicker 2s infinite" }}>🔥 ROAST DELIVERED 🔥</div>
              <p style={{ fontSize: "16px", lineHeight: 1.75, color: "#ffccaa", margin: 0, fontStyle: "italic" }}>"{roast}"</p>
              <div style={{ display: "flex", gap: "10px", marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #2a1500" }}>
                <button onClick={copyRoast} style={{
                  flex: 1, padding: "12px", background: copied ? "#ff440022" : "#0a0a0a",
                  border: `1px solid ${copied ? "#ff4400" : "#333"}`, borderRadius: "2px",
                  color: copied ? "#ff4400" : "#666", cursor: "pointer", fontSize: "11px",
                  fontFamily: "inherit", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", transition: "all 0.2s",
                }}>
                  {copied ? "✓ COPIED" : "📋 COPY & SHARE"}
                </button>
                <button onClick={generate} style={{
                  flex: 1, padding: "12px", background: "#0a0a0a", border: "1px solid #333",
                  borderRadius: "2px", color: "#555", cursor: "pointer", fontSize: "11px",
                  fontFamily: "inherit", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", transition: "all 0.2s",
                }}>
                  🎲 ROAST AGAIN
                </button>
              </div>
            </div>
            <p style={{ textAlign: "center", color: "#333", fontSize: "11px", marginTop: "12px", letterSpacing: "2px" }}>
              SCREENSHOT & POST ON X. TAG YOUR ENEMIES.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
