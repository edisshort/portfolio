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

const categories = [
  { label: "Frontend", skills: ["React.js", "Next.js 14", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"] },
  { label: "Backend & APIs", skills: ["FastAPI", "REST APIs", "Python"] },
  { label: "Databases & Search", skills: ["MongoDB", "MongoDB Search", "ChromaDB", "Vector Embeddings", "BM25", "RAG"] },
  { label: "AI / LLM", skills: ["Groq API", "Ollama", "PyTorch", "Semantic Search", "Web Speech API"] },
  { label: "Languages & Tools", skills: ["Python", "JavaScript", "C", "SQL", "Git", "Docker", "Vercel", "Render"] },
];

export default function Skills() {
  const [sectionRef, inView] = useInView(0.05);
  const fadeUp = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
  });

  return (
    <>
      <style>{`
        .skills-section {
          width: 100%;
          padding: 96px 48px;
          font-family: var(--font-body);
        }
        .skills-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 36px;
        }
        .skill-row {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 20px;
          padding: 20px 0;
          border-top: 1.5px solid var(--border);
          align-items: start;
        }
        .skill-row:last-child { border-bottom: 1.5px solid var(--border); }
        .skill-cat {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          color: var(--accent);
          padding-top: 4px;
        }
        .skill-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .skill-tag {
          padding: 7px 14px;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--text);
          border: 1.5px solid var(--border);
          background: var(--surface);
          border-radius: 6px;
          transition: all 0.2s ease;
        }
        .skill-tag:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
        @media (max-width: 640px) {
          .skills-section { padding: 72px 24px; }
          .skill-row { grid-template-columns: 1fr; gap: 10px; }
        }
      `}</style>

      <section className="skills-section" ref={sectionRef} id="skills">
        <div className="skills-inner">
          <div style={fadeUp(0)}>
            <div className="section-eyebrow">Skills</div>
            <h2 className="section-heading">What I <em>use</em></h2>
            <p className="section-lede">Tools from the stack I ship with every week.</p>
          </div>

          <div style={fadeUp(0.08)}>
            {categories.map((cat) => (
              <div key={cat.label} className="skill-row">
                <div className="skill-cat">{cat.label}</div>
                <div className="skill-tags">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
