import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

const hacks = [
  {
    name: "GoaShore",
    venue: "Beach Cleanliness Reporting Platform",
    badge: "Solo · Mar 2026",
    desc: "Real-time pollution reporting civic-tech platform with geo-tagged submissions and a live dashboard — shipped solo in one hackathon day.",
    tech: ["React.js", "JavaScript", "CSS"],
    href: "https://goashore.vercel.app",
    linkLabel: "Live Demo",
  },
  {
    name: "Reform Helper",
    venue: "Accessibility-First Web Platform",
    badge: "Solo · Feb 2026",
    desc: "Responsive web platform with accessible UI for non-technical users — built and presented solo in 24 hours.",
    tech: ["HTML", "CSS", "JavaScript"],
    href: "https://github.com/edisshort/reform-helper",
    linkLabel: "GitHub",
  },
  {
    name: "Binary Beasts — Team 18",
    venue: "Smart City Web Application",
    badge: "Team · 2024",
    desc: "Smart City frontend in a team of 3 — owned UI design and interactive components within a 48-hour window.",
    tech: ["HTML", "CSS", "JavaScript"],
    href: "https://github.com/edisshort/binary-beasts-18",
    linkLabel: "GitHub",
  },
];

export default function Hackathon() {
  const [sectionRef, inView] = useInView(0.1);
  const fadeUp = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
  });

  return (
    <>
      <style>{`
        .hack-section {
          width: 100%;
          padding: 0 48px 96px;
          font-family: var(--font-body);
        }
        .hack-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .hack-row {
          padding: 26px 0;
          border-top: 1.5px solid var(--border);
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 20px;
        }
        .hack-row:last-child { border-bottom: 1.5px solid var(--border); }
        .hack-name {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 800;
          color: var(--text);
          margin: 0 0 4px;
          letter-spacing: -0.02em;
        }
        .hack-venue {
          font-size: 13.5px;
          color: var(--accent);
          font-weight: 600;
          margin: 0 0 10px;
        }
        .hack-desc {
          font-size: 14.5px;
          line-height: 1.7;
          color: var(--muted);
          margin: 0 0 14px;
          max-width: 640px;
        }
        .hack-tech { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
        .hack-tech span {
          padding: 4px 11px;
          border: 1.5px solid var(--border);
          border-radius: 4px;
          font-size: 12px;
          color: var(--muted);
          background: var(--surface);
        }
        .hack-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 16px;
          background: var(--accent);
          border-radius: 6px;
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s;
        }
        .hack-link:hover {
          background: var(--accent-hover);
          transform: translateY(-2px);
        }
        .hack-badge {
          font-size: 12px;
          color: var(--muted-soft);
          font-weight: 500;
          white-space: nowrap;
          padding-top: 4px;
        }
        @media (max-width: 700px) {
          .hack-section { padding: 0 24px 72px; }
          .hack-row { grid-template-columns: 1fr; gap: 8px; }
        }
      `}</style>

      <section className="hack-section" ref={sectionRef} id="hackathon">
        <div className="hack-inner">
          <div style={fadeUp(0)}>
            <div className="section-eyebrow">Hackathons</div>
            <h2 className="section-heading">Built under <em>pressure</em></h2>
            <p className="section-lede">Where ideas meet deadlines.</p>
          </div>

          {hacks.map((h, i) => (
            <div key={h.name} className="hack-row" style={fadeUp(0.08 + i * 0.07)}>
              <div>
                <h3 className="hack-name">{h.name}</h3>
                <p className="hack-venue">{h.venue}</p>
                <p className="hack-desc">{h.desc}</p>
                <div className="hack-tech">
                  {h.tech.map((t) => <span key={t}>{t}</span>)}
                </div>
                <a href={h.href} target="_blank" rel="noopener noreferrer" className="hack-link">
                  {h.linkLabel} →
                </a>
              </div>
              <div className="hack-badge">{h.badge}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
