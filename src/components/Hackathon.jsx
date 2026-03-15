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

export default function Hackathon() {
  const [sectionRef, inView] = useInView(0.1);

  const fadeUp = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Space+Grotesk:wght@600;700&display=swap');

        .hack-section {
          width: 100%;
          padding: 0px 48px 100px;
          font-family: 'DM Sans', sans-serif;
        }
        .hack-inner {
          max-width: 860px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 36px;
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
        .hack-card {
          background: rgba(10,4,28,0.5);
          border: 1px solid rgba(82,39,255,0.3);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 36px 40px;
          display: flex;
          gap: 32px;
          align-items: flex-start;
          transition: all 0.25s ease;
        }
        .hack-card:hover {
          border-color: rgba(82,39,255,0.55);
          box-shadow: 0 8px 40px rgba(82,39,255,0.2);
          transform: translateY(-4px);
        }
        .hack-left {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .hack-emoji-wrap {
          width: 72px;
          height: 72px;
          border-radius: 20px;
          background: rgba(82,39,255,0.15);
          border: 1px solid rgba(82,39,255,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
        }
        .hack-badge {
          padding: 4px 12px;
          background: rgba(82,39,255,0.15);
          border: 1px solid rgba(82,39,255,0.35);
          border-radius: 50px;
          font-size: 11px;
          color: #B19EEF;
          font-weight: 600;
          letter-spacing: 0.05em;
          white-space: nowrap;
          text-align: center;
        }
        .hack-right {
          flex: 1;
          min-width: 0;
        }
        .hack-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 4px;
          letter-spacing: -0.02em;
        }
        .hack-venue {
          font-size: 13.5px;
          color: #B19EEF;
          font-weight: 500;
          margin: 0 0 16px;
        }
        .hack-desc {
          font-size: 15px;
          line-height: 1.8;
          color: rgba(210,198,240,0.75);
          margin: 0 0 20px;
        }
        .hack-desc em {
          color: #B19EEF;
          font-style: normal;
          font-weight: 500;
        }
        .hack-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }
        .hack-tech span {
          padding: 5px 14px;
          background: rgba(82,39,255,0.1);
          border: 1px solid rgba(177,158,239,0.2);
          border-radius: 50px;
          font-size: 12.5px;
          color: rgba(210,200,240,0.8);
          font-weight: 500;
        }
        .hack-github {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          background: rgba(82,39,255,0.15);
          border: 1px solid rgba(177,158,239,0.25);
          border-radius: 50px;
          color: #fff;
          font-size: 13.5px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .hack-github:hover {
          background: rgba(82,39,255,0.3);
          border-color: rgba(177,158,239,0.5);
          transform: translateY(-2px);
        }
        @media (max-width: 640px) {
          .hack-section { padding: 0 24px 80px; }
          .hack-card { flex-direction: column; padding: 24px; }
          .hack-left { flex-direction: row; align-items: center; }
          .section-title { font-size: 34px; }
        }
      `}</style>

      <section className="hack-section" ref={sectionRef} id="hackathon">
        <div className="hack-inner">

          {/* Heading */}
          <div style={fadeUp(0)}>
            <div className="section-label">Hackathon</div>
            <h2 className="section-title">Built Under <span>Pressure</span></h2>
            <p className="section-sub">Where ideas meet deadlines.</p>
          </div>

          {/* Card */}
          <div className="hack-card" style={fadeUp(0.15)}>
            <div className="hack-left">
              <div className="hack-emoji-wrap">🧠</div>
              <div className="hack-badge">Participant</div>
            </div>

            <div className="hack-right">
              <h3 className="hack-name">Binary Beasts — Team 18</h3>
              <p className="hack-venue">📍 Saraswati College of Engineering, Navi Mumbai</p>

              <p className="hack-desc">
                Participated in a intercollegiate hackathon as part of <em>Team Binary Beasts</em>.
                Our team tackled a real-world problem statement of Smart City within a time-boxed environment,
                designing and building a working solution from scratch. The experience pushed us
                to think fast, collaborate under pressure, and ship something functional within
                the deadline — a strong test of both technical and teamwork skills.
              </p>

              <div className="hack-tech">
                {["Python", "JavaScript", "HTML/CSS", "Git", "Team Collaboration"].map(t => (
                  <span key={t}>{t}</span>
                ))}
              </div>

              <a
                href="https://github.com/edisshort/binary-beasts-18"
                target="_blank"
                rel="noopener noreferrer"
                className="hack-github"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                View on GitHub
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}