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

const highlights = [
  { label: "Education", text: "B.Tech Computer Engineering @ Shah & Anchor — CGPA 9.35 / 10.0" },
  { label: "Focus", text: "AI, LLMs, RAG pipelines, and backend systems that ship" },
  { label: "Leadership", text: "CSI Co-Head — 200+ members, 10+ workshops, 5+ concurrent teams" },
  { label: "Approach", text: "Learn by building — hackathons, open source, midnight ideas" },
];

export default function About() {
  const [sectionRef, inView] = useInView(0.1);
  const fadeUp = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
  });

  return (
    <>
      <style>{`
        .about-section {
          width: 100%;
          padding: 96px 48px;
          font-family: var(--font-body);
        }
        .about-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: start;
        }
        .about-bio p {
          font-size: 15.5px;
          line-height: 1.8;
          color: var(--muted);
          margin: 0 0 16px;
        }
        .about-bio p:last-child { margin: 0; }
        .about-bio em {
          color: var(--accent);
          font-style: normal;
          font-weight: 600;
        }
        .about-item {
          padding: 18px 0;
          border-top: 1.5px solid var(--border);
        }
        .about-item:last-child { border-bottom: 1.5px solid var(--border); }
        .about-item-label {
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          font-weight: 700;
          margin-bottom: 6px;
        }
        .about-item-text {
          font-size: 14.5px;
          color: var(--muted);
          line-height: 1.6;
        }
        @media (max-width: 800px) {
          .about-section { padding: 72px 24px; }
          .about-inner { grid-template-columns: 1fr; gap: 36px; }
        }
      `}</style>

      <section className="about-section" ref={sectionRef} id="about">
        <div className="about-inner">
          <div style={fadeUp(0)}>
            <div className="section-eyebrow">About</div>
            <h2 className="section-heading">Who I <em>am</em></h2>
            <div className="about-bio" style={{ marginTop: 24 }}>
              <p>
                I&apos;m <em>Harsh Solanki</em> — a Computer Engineering student who builds
                things that think. Currently an AI Software Engineering Intern at{" "}
                <em>NSE</em>, working on semantic search and RAG over regulatory documents.
              </p>
              <p>
                My stack centers on <em>Python, FastAPI, and LLMs</em> — voice assistants,
                multimodal RAG, and APIs that turn messy data into answers people can trust.
              </p>
              <p>
                I learn by shipping: hackathons, open source, and ideas that start at midnight
                and end as demos.
              </p>
            </div>
          </div>

          <div style={fadeUp(0.12)}>
            {highlights.map((h) => (
              <div key={h.label} className="about-item">
                <div className="about-item-label">{h.label}</div>
                <div className="about-item-text">{h.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
