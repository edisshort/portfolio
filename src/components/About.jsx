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
  { icon: "🤖", text: "Passionate about AI, LLMs and building intelligent systems" },
  { icon: "⚙️", text: "Frontend passion — building interfaces that feel smooth and look great" },
  { icon: "🚀", text: "Love turning ideas into working software from scratch" },
  { icon: "📚", text: "Always learning — currently deep in LangChain and vector DBs" },
];

export default function About() {
  const [sectionRef, inView] = useInView(0.1);

  const fadeUp = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(32px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;1,9..40,400&family=Space+Grotesk:wght@600;700&display=swap');

        .about-section {
          width: 100%;
          padding: 100px 48px;
          font-family: 'DM Sans', sans-serif;
        }
        .about-inner {
          max-width: 860px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 48px;
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
          font-size: 42px;
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
        .about-bio {
          background: rgba(10,4,28,0.5);
          border: 1px solid rgba(177,158,239,0.13);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 36px 40px;
        }
        .bio-p {
          font-size: 15.5px;
          line-height: 1.85;
          color: rgba(210,198,240,0.78);
          margin: 0 0 18px;
        }
        .bio-p:last-child { margin: 0; }
        .bio-p em {
          color: #B19EEF;
          font-style: normal;
          font-weight: 500;
        }
        .highlights {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 18px 20px;
          background: rgba(10,4,28,0.45);
          border: 1px solid rgba(177,158,239,0.1);
          border-radius: 14px;
          backdrop-filter: blur(12px);
          transition: all 0.25s;
          cursor: default;
        }
        .highlight-item:hover {
          border-color: rgba(177,158,239,0.28);
          background: rgba(82,39,255,0.1);
          transform: translateY(-3px);
        }
        .highlight-icon {
          font-size: 22px;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .highlight-text {
          font-size: 13.5px;
          color: rgba(200,188,230,0.75);
          line-height: 1.65;
          font-weight: 400;
        }
        @media (max-width: 700px) {
          .about-section { padding: 80px 24px; }
          .highlights { grid-template-columns: 1fr; }
          .section-title { font-size: 32px; }
          .about-bio { padding: 24px; }
        }
      `}</style>

      <section className="about-section" ref={sectionRef} id="about">
        <div className="about-inner">

          {/* Heading */}
          <div style={fadeUp(0)}>
            <div className="section-label">About Me</div>
            <h2 className="section-title">Who I <span>Am</span></h2>
          </div>

          {/* Bio */}
          <div className="about-bio" style={fadeUp(0.1)}>
            <p className="bio-p">
              Hey! I'm <em>Harsh Solanki</em> — a Computer Engineering student who genuinely enjoys
              building things with code. I got into tech because I love how software can take a simple
              idea and turn it into something real and useful.
            </p>
            <p className="bio-p">
              My focus is on <em>AI and backend development</em>. I work mostly with <em>Python,
              FastAPI, and Django</em>, and lately I've been going deep into <em>LLMs and AI-powered
              applications</em> — building things like voice assistants, intelligent APIs, and
              systems that actually think.
            </p>
            <p className="bio-p">
              I'm the kind of person who learns best by building. Whether it's a hackathon project,
              an open source contribution, or just an idea I had at midnight — I like to ship it,
              break it, and make it better.
            </p>
          </div>

          {/* Highlights */}
          <div className="highlights">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="highlight-item"
                style={fadeUp(0.15 + i * 0.08)}
              >
                <span className="highlight-icon">{h.icon}</span>
                <span className="highlight-text">{h.text}</span>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}