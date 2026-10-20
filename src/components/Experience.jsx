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

const bullets = [
  "Built an LLM-based semantic search assistant for QSB compliance-status workflows at NSE.",
  "Implemented MongoDB-backed document stores with structured metadata for reliable retrieval.",
  "Designed RAG-based QA pipelines over DRHP filings to surface answers with grounding.",
  "Connected document ingestion pipelines so LLMs could reason over internal regulatory data.",
];

export default function Experience() {
  const [sectionRef, inView] = useInView(0.1);
  const fadeUp = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
  });

  return (
    <>
      <style>{`
        .exp-section {
          width: 100%;
          padding: 96px 48px;
          font-family: var(--font-body);
        }
        .exp-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 36px;
        }
        .exp-card {
          padding: 32px 0;
          border-top: 2px solid var(--text);
          border-bottom: 1.5px solid var(--border);
        }
        .exp-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px 28px;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 22px;
        }
        .exp-org {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text);
          margin: 0 0 4px;
        }
        .exp-role {
          font-size: 15px;
          color: var(--accent);
          font-weight: 600;
          margin: 0;
        }
        .exp-when {
          font-size: 13px;
          color: var(--muted-soft);
          font-weight: 500;
        }
        .exp-loc {
          font-size: 13px;
          color: var(--muted-soft);
          text-align: right;
        }
        .exp-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin: 0;
          padding: 0;
        }
        .exp-list li {
          position: relative;
          padding-left: 18px;
          font-size: 14.5px;
          line-height: 1.7;
          color: var(--muted);
        }
        .exp-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.6em;
          width: 7px;
          height: 7px;
          border-radius: 2px;
          background: var(--accent);
        }
        @media (max-width: 700px) {
          .exp-section { padding: 72px 24px; }
          .exp-org { font-size: 20px; }
        }
      `}</style>

      <section className="exp-section" ref={sectionRef} id="experience">
        <div className="exp-inner">
          <div style={fadeUp(0)}>
            <div className="section-eyebrow">Experience</div>
            <h2 className="section-heading">Where I <em>work</em></h2>
            <p className="section-lede">Shipping AI systems in production environments.</p>
          </div>

          <div className="exp-card" style={fadeUp(0.1)}>
            <div className="exp-meta">
              <div>
                <h3 className="exp-org">National Stock Exchange of India Ltd. (NSE)</h3>
                <p className="exp-role">Software Engineering Intern (AI)</p>
              </div>
              <div>
                <div className="exp-when">June 2026 – Present</div>
                <div className="exp-loc">Mumbai, India</div>
              </div>
            </div>
            <ul className="exp-list">
              {bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
