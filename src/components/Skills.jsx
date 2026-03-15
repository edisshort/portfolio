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
  {
    label: "Languages",
    color: "#5227FF",
    border: "rgba(82,39,255,0.4)",
    bg: "rgba(82,39,255,0.12)",
    skills: ["Python", "Java", "C", "C++", "JavaScript", "CSS", "SQL"],
  },
  {
    label: "Frontend",
    color: "#B19EEF",
    border: "rgba(177,158,239,0.4)",
    bg: "rgba(177,158,239,0.1)",
    skills: ["React", "CSS", "HTML"],
  },
  {
    label: "AI & Cloud",
    color: "#FF9FFC",
    border: "rgba(255,159,252,0.4)",
    bg: "rgba(255,159,252,0.1)",
    skills: ["LLMs", "AWS", "Prompt Engineering"],
  },
  {
    label: "Tools",
    color: "#7B5CF0",
    border: "rgba(123,92,240,0.4)",
    bg: "rgba(123,92,240,0.12)",
    skills: ["Git", "GitHub"],
  },
];

export default function Skills() {
  const [sectionRef, inView] = useInView(0.05);

  const fadeUp = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Space+Grotesk:wght@600;700&display=swap');

        .skills-section {
          width: 100%;
          padding: 100px 48px;
          font-family: 'DM Sans', sans-serif;
        }
        .skills-inner {
          max-width: 860px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 52px;
        }
        .section-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 4px 14px;
          background: rgba(82,39,255,0.15);
          border: 1px solid rgba(177,158,239,0.25);
          border-radius: 50px;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #B19EEF;
          font-weight: 500;
          margin-bottom: 14px;
        }
        .section-label::before {
          content: '';
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #B19EEF;
          box-shadow: 0 0 8px #B19EEF;
        }
        .section-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 46px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.025em;
          line-height: 1.15;
          margin: 0 0 6px;
        }
        .section-title span {
          background: linear-gradient(135deg, #5227FF, #B19EEF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .section-sub {
          font-size: 16px;
          color: rgba(200,188,230,0.6);
          margin: 0;
          line-height: 1.7;
        }
        .cat-block {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .cat-heading {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 600;
        }
        .cat-line {
          flex: 1;
          height: 1px;
          background: rgba(177,158,239,0.1);
        }
        .badge-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .skill-badge {
          padding: 9px 20px;
          border-radius: 50px;
          font-size: 14.5px;
          font-weight: 500;
          cursor: default;
          transition: all 0.2s ease;
          white-space: nowrap;
          color: rgba(230,220,255,0.92) !important;
          background: rgba(10,4,28,0.6) !important;
        }
        .skill-badge:hover {
          transform: translateY(-3px);
          color: #fff !important;
          background: rgba(82,39,255,0.2) !important;
        }
        @media (max-width: 600px) {
          .skills-section { padding: 80px 24px; }
          .section-title { font-size: 34px; }
        }
      `}</style>

      <section className="skills-section" ref={sectionRef} id="skills">
        <div className="skills-inner">

          {/* Heading */}
          <div style={fadeUp(0)}>
            <div className="section-label">Skills</div>
            <h2 className="section-title">What I <span>Know</span></h2>
            <p className="section-sub">Technologies I work with.</p>
          </div>

          {/* Categories */}
          {categories.map((cat, ci) => (
            <div key={cat.label} className="cat-block" style={fadeUp(0.1 + ci * 0.08)}>
              <div className="cat-heading">
                <span style={{ color: cat.color }}>{cat.label}</span>
                <div className="cat-line" />
              </div>
              <div className="badge-row">
                {cat.skills.map((skill, si) => (
                  <span
                    key={skill}
                    className="skill-badge"
                    style={{
                      borderLeft: `3px solid ${cat.color}`,
                      borderTop: `1px solid rgba(177,158,239,0.15)`,
                      borderRight: `1px solid rgba(177,158,239,0.15)`,
                      borderBottom: `1px solid rgba(177,158,239,0.15)`,
                      opacity: inView ? 1 : 0,
                      transform: inView ? "translateY(0)" : "translateY(12px)",
                      transition: `opacity 0.5s ease ${0.15 + ci * 0.08 + si * 0.05}s, transform 0.5s ease ${0.15 + ci * 0.08 + si * 0.05}s`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}

        </div>
      </section>
    </>
  );
}