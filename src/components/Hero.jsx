import { useEffect, useState } from "react";
import profilePic from "../assets/profile.jpg";

function SocialLink({ href, label, icon }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="hero-social">
      {icon}
    </a>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  const fadeIn = (delay = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(12px)",
    transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
  });

  return (
    <>
      <style>{`
        .hero-wrap {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(280px, 420px);
          align-items: center;
          gap: clamp(32px, 5vw, 72px);
          padding: 100px clamp(24px, 5vw, 80px) 64px;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          min-height: 100vh;
          box-sizing: border-box;
        }

        .hero-brand {
          margin: 0 0 12px;
          font-size: clamp(40px, 6.5vw, 68px);
          font-weight: 700;
          font-family: var(--font-display);
          color: var(--text);
          letter-spacing: -0.035em;
          line-height: 1.02;
        }

        .hero-role {
          margin: 0 0 18px;
          font-size: 17px;
          color: var(--accent);
          font-weight: 600;
        }

        .hero-bio {
          margin: 0 0 28px;
          font-size: 16.5px;
          line-height: 1.7;
          color: var(--muted);
          max-width: 520px;
        }
        .hero-bio strong {
          color: var(--text);
          font-weight: 600;
        }

        .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }
        .hero-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 26px;
          background: var(--accent);
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 700;
          font-family: var(--font-body);
          text-decoration: none;
          transition: background 0.2s, transform 0.2s;
        }
        .hero-cta-primary:hover {
          background: var(--accent-hover);
          transform: translateY(-1px);
        }
        .hero-cta-secondary {
          display: inline-flex;
          align-items: center;
          padding: 12px 24px;
          background: transparent;
          color: var(--text);
          border: 1.5px solid var(--border-strong);
          border-radius: 4px;
          font-size: 14px;
          font-weight: 600;
          font-family: var(--font-body);
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .hero-cta-secondary:hover {
          border-color: var(--text);
          background: var(--surface);
        }

        .hero-socials { display: flex; gap: 10px; }
        .hero-social {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 4px;
          border: 1.5px solid var(--border);
          background: var(--surface);
          color: var(--text);
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }
        .hero-social:hover {
          color: var(--accent);
          border-color: var(--accent);
        }

        /* Photo box — image fills completely, no stretch */
        .hero-visual {
          position: relative;
          width: 100%;
          max-width: 420px;
          justify-self: end;
        }
        .hero-photo-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          border: 2px solid var(--text);
          border-radius: 2px;
          overflow: hidden;
          background: #ddd;
          z-index: 1;
        }
        .hero-photo-frame img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          max-width: none;
          object-fit: cover;
          object-position: center top;
          display: block;
        }
        .hero-photo-accent {
          position: absolute;
          inset: 12px -12px -12px 12px;
          background: var(--accent);
          z-index: 0;
          pointer-events: none;
        }

        @media (max-width: 900px) {
          .hero-wrap {
            grid-template-columns: 1fr;
            padding: 88px 24px 48px;
            gap: 36px;
            min-height: auto;
          }
          .hero-visual {
            justify-self: stretch;
            max-width: 320px;
            margin: 0 auto;
            width: 100%;
            order: -1;
          }
          .hero-actions { flex-direction: column; align-items: stretch; }
          .hero-cta-primary, .hero-cta-secondary { justify-content: center; }
        }
      `}</style>

      <section id="hero" className="hero-wrap">
        <div>
          <h1 className="hero-brand" style={fadeIn(0.05)}>
            Harsh Solanki
          </h1>

          <p className="hero-role" style={fadeIn(0.12)}>
            AI & Backend Developer · Intern @ NSE
          </p>

          <p className="hero-bio" style={fadeIn(0.2)}>
            Building systems at the intersection of{" "}
            <strong>AI</strong> and <strong>backend engineering</strong>. CGPA 9.35 at
            Shah & Anchor — shipping APIs and products that work.
          </p>

          <div className="hero-actions" style={fadeIn(0.28)}>
            <a href="#projects" className="hero-cta-primary">
              View Projects
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="mailto:harshsolanki2203@gmail.com" className="hero-cta-secondary">
              Get in Touch
            </a>
          </div>

          <div className="hero-socials" style={fadeIn(0.36)}>
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

        <div className="hero-visual" style={fadeIn(0.15)}>
          <div className="hero-photo-accent" aria-hidden="true" />
          <div className="hero-photo-frame">
            <img
              src={profilePic}
              alt="Harsh Solanki"
              width={840}
              height={1120}
              decoding="async"
            />
          </div>
        </div>
      </section>
    </>
  );
}
