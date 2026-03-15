import { useEffect, useState, useRef } from "react";
import profilePic from "../assets/profile.jpg"; // ← put your photo in src/assets/profile.jpg

// ─── Scramble Text Hook ────────────────────────────────────────────────────
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";

function useScramble(target, trigger, duration = 1200) {
  const [display, setDisplay] = useState("");
  const raf = useRef(null);

  useEffect(() => {
    if (!trigger) return;
    let start = null;
    const len = target.length;

    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const revealed = Math.floor(progress * len);
      let out = "";
      for (let i = 0; i < len; i++) {
        if (i < revealed) {
          out += target[i];
        } else if (target[i] === " ") {
          out += " ";
        } else {
          out += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplay(out);
      if (progress < 1) raf.current = requestAnimationFrame(step);
    }

    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [trigger, target, duration]);

  return display;
}



// ─── Social Link ──────────────────────────────────────────────────────────
function SocialLink({ href, label, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 44,
        height: 44,
        borderRadius: "50%",
        border: "1px solid rgba(177,158,239,0.35)",
        background: "rgba(82,39,255,0.12)",
        color: "#B19EEF",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        textDecoration: "none",
        transition: "all 0.25s ease",
        fontSize: 18,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(82,39,255,0.35)";
        e.currentTarget.style.borderColor = "rgba(177,158,239,0.7)";
        e.currentTarget.style.color = "#fff";
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(82,39,255,0.12)";
        e.currentTarget.style.borderColor = "rgba(177,158,239,0.35)";
        e.currentTarget.style.color = "#B19EEF";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {icon}
    </a>
  );
}



// ─── Main Hero Component ───────────────────────────────────────────────────
export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [nameReady, setNameReady] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = [
    "AI & Backend Developer",
    "Computer Engineering Student",
    "Full-Stack Enthusiast",
    "Open Source Contributor",
  ];

  const name = useScramble("Harsh Solanki", nameReady, 1400);

  useEffect(() => {
    // Staggered mount
    const t1 = setTimeout(() => setMounted(true), 100);
    const t2 = setTimeout(() => setNameReady(true), 400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Role cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const fadeIn = (delay = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(82,39,255,0.5); }
          70%  { box-shadow: 0 0 0 18px rgba(82,39,255,0); }
          100% { box-shadow: 0 0 0 0 rgba(82,39,255,0); }
        }
        @keyframes role-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes role-out {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-10px); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          background: linear-gradient(135deg, #5227FF 0%, #7B5CF0 100%);
          color: #fff;
          border: none;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.25s ease;
          letter-spacing: 0.02em;
        }
        .hero-btn-primary:hover {
          background: linear-gradient(135deg, #6535FF 0%, #8B6CF0 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(82,39,255,0.45);
        }
        .hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 28px;
          background: transparent;
          color: #B19EEF;
          border: 1px solid rgba(177,158,239,0.4);
          border-radius: 50px;
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.25s ease;
          letter-spacing: 0.02em;
          backdrop-filter: blur(8px);
        }
        .hero-btn-secondary:hover {
          background: rgba(177,158,239,0.12);
          border-color: rgba(177,158,239,0.7);
          color: #fff;
          transform: translateY(-2px);
        }
        .skill-tag {
          display: inline-block;
          padding: 5px 14px;
          background: rgba(82,39,255,0.15);
          border: 1px solid rgba(177,158,239,0.2);
          border-radius: 50px;
          font-size: 12px;
          color: #B19EEF;
          font-family: 'DM Sans', sans-serif;
          backdrop-filter: blur(6px);
          transition: all 0.2s;
        }
        .skill-tag:hover {
          background: rgba(82,39,255,0.28);
          border-color: rgba(177,158,239,0.5);
          color: #fff;
        }
        .avatar-ring {
          animation: pulse-ring 2.4s ease-out infinite;
        }

        @media (max-width: 768px) {
          .hero-wrapper {
            padding: 80px 20px 40px !important;
            align-items: flex-start !important;
            overflow-y: auto !important;
          }
          .hero-card {
            flex-direction: column-reverse !important;
            padding: 32px 24px !important;
            gap: 28px !important;
            align-items: center !important;
          }
          .hero-photo {
            width: 160px !important;
            height: 200px !important;
          }
          .hero-name {
            font-size: 36px !important;
          }
          .hero-bio {
            font-size: 13.5px !important;
          }
          .hero-btns {
            flex-direction: column !important;
            width: 100% !important;
          }
          .hero-btn-primary, .hero-btn-secondary {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>

      {/* Hero wrapper — sits ON TOP of LiquidEther (position absolute) */}
      <div
        className="hero-wrapper"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 48px",
          fontFamily: "'DM Sans', sans-serif",
          zIndex: 10,
          overflowY: "auto",
        }}
      >
        {/* Glass card */}
        <div
          className="hero-card"
          style={{
            ...fadeIn(0),
            width: "100%",
            maxWidth: 980,
            background: "rgba(10,6,30,0.45)",
            border: "1px solid rgba(177,158,239,0.18)",
            borderRadius: 28,
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            padding: "52px 56px",
            display: "flex",
            gap: 56,
            alignItems: "center",
          }}
        >
          {/* ── LEFT: Text content ── */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Eyebrow */}
            <div
              style={{
                ...fadeIn(0.15),
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "5px 14px",
                background: "rgba(82,39,255,0.2)",
                border: "1px solid rgba(177,158,239,0.3)",
                borderRadius: 50,
                marginBottom: 22,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#B19EEF",
                  boxShadow: "0 0 8px #B19EEF",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#B19EEF",
                  fontWeight: 500,
                }}
              >
              
              </span>
            </div>

            {/* Name */}
            <h1
              className="hero-name"
              style={{
                ...fadeIn(0.25),
                margin: "0 0 10px",
                fontSize: 52,
                fontWeight: 700,
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#fff",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              {name}
              <span
                style={{
                  display: "inline-block",
                  width: 3,
                  height: "0.85em",
                  background: "#5227FF",
                  marginLeft: 4,
                  verticalAlign: "middle",
                  borderRadius: 2,
                  animation: "blink 1s step-end infinite",
                }}
              />
            </h1>

            {/* Role (cycling) */}
            <div
              style={{
                ...fadeIn(0.35),
                height: 32,
                overflow: "hidden",
                marginBottom: 22,
              }}
            >
              <p
                key={roleIndex}
                style={{
                  margin: 0,
                  fontSize: 17,
                  fontWeight: 400,
                  color: "#B19EEF",
                  fontStyle: "italic",
                  animation: "role-in 0.4s ease forwards",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {roles[roleIndex]}
              </p>
            </div>

            {/* Bio */}
            <p
              className="hero-bio"
              style={{
                ...fadeIn(0.4),
                margin: "0 0 28px",
                fontSize: 14.5,
                lineHeight: 1.75,
                color: "rgba(200,190,230,0.75)",
                maxWidth: 420,
              }}
            >
              Building intelligent systems at the intersection of AI and backend
              engineering. Computer Engineering student passionate about{" "}
              <span style={{ color: "#B19EEF" }}>LLMs</span>,{" "}
              <span style={{ color: "#B19EEF" }}>APIs</span>, and turning ideas
              into working software.
            </p>



            {/* CTAs */}
            <div
              className="hero-btns"
              style={{
                ...fadeIn(0.5),
                display: "flex",
                gap: 12,
                alignItems: "center",
                flexWrap: "wrap",
                marginBottom: 32,
              }}
            >
              <a href="#projects" className="hero-btn-primary">
                View Projects
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3 7h8M8 4l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a href="mailto:harshsolanki2203@gmail.com"
                      className="hero-btn-secondary"
              >
                Get in Touch
              </a>
            </div>

            {/* Social links */}
            <div
              style={{
                ...fadeIn(0.55),
                display: "flex",
                gap: 10,
              }}
            >
              <SocialLink
                href="https://github.com/edisshort"
                label="GitHub"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                }
              />
              <SocialLink
                href="https://www.linkedin.com/in/harsh-solanki-37211128b/"
                label="LinkedIn"
                icon={
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                }
              />
            </div>
          </div>

          {/* ── RIGHT: Full photo ── */}
          <div
            className="hero-photo"
            style={{
              ...fadeIn(0.3),
              flexShrink: 0,
              width: 320,
              height: 400,
              borderRadius: 24,
              overflow: "hidden",
              border: "1px solid rgba(177,158,239,0.2)",
              position: "relative",
              boxShadow: "0 0 40px rgba(82,39,255,0.25)",
            }}
          >
            <img
              src={profilePic}
              alt="Harsh Solanki"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top",
                display: "block",
              }}
            />
            {/* Open to Work badge over photo */}
            <div style={{
              position: "absolute",
              bottom: 16, left: "50%",
              transform: "translateX(-50%)",
              background: "linear-gradient(135deg, #5227FF, #7B5CF0)",
              borderRadius: 50,
              padding: "6px 18px",
              fontSize: 12,
              color: "#fff",
              fontWeight: 600,
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}>
              ✦ Open to Work
            </div>
          </div>
        </div>
      </div>
    </>
  );
}