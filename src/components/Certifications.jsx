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

const CloudIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
  </svg>
);
const CodeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);
const TerminalIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
  </svg>
);
const DatabaseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
);
const GlobeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const certs = [
  {
    title: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services",
    icon: <CloudIcon />,
    color: "#FF9900",
    border: "rgba(255,153,0,0.28)",
    bg: "rgba(255,153,0,0.07)",
    tag: "Cloud",
  },
  {
    title: "Introduction to IoT & Digital Transformation",
    issuer: "Cisco Networking Academy",
    icon: <GlobeIcon />,
    color: "#3ecf8e",
    border: "rgba(62,207,142,0.28)",
    bg: "rgba(62,207,142,0.07)",
    tag: "IoT & Networking",
  },
  {
    title: "C++ Certified Associate",
    issuer: "C++ Institute",
    icon: <CodeIcon />,
    color: "#5227FF",
    border: "rgba(82,39,255,0.28)",
    bg: "rgba(82,39,255,0.07)",
    tag: "Programming",
  },
  {
    title: "Java Programming",
    issuer: "Spoken Tutorial — IIT Bombay",
    icon: <TerminalIcon />,
    color: "#B19EEF",
    border: "rgba(177,158,239,0.28)",
    bg: "rgba(177,158,239,0.07)",
    tag: "Programming",
  },
  {
    title: "Python Programming",
    issuer: "Spoken Tutorial — IIT Bombay",
    icon: <CodeIcon />,
    color: "#3ecf8e",
    border: "rgba(62,207,142,0.28)",
    bg: "rgba(62,207,142,0.07)",
    tag: "Programming",
  },
  {
    title: "PHP & MySQL",
    issuer: "Spoken Tutorial — IIT Bombay",
    icon: <DatabaseIcon />,
    color: "#FF9FFC",
    border: "rgba(255,159,252,0.28)",
    bg: "rgba(255,159,252,0.07)",
    tag: "Web & Database",
  },
];

export default function Certifications() {
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

        .cert-section {
          width: 100%;
          padding: 100px 48px;
          font-family: 'DM Sans', sans-serif;
        }
        .cert-inner {
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
        .cert-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .cert-card {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 22px 24px;
          background: rgba(10,4,28,0.5);
          border-radius: 16px;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: all 0.25s ease;
          cursor: default;
          text-decoration: none;
        }
        .cert-card:hover {
          transform: translateY(-4px);
        }
        .cert-icon {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          border-radius: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cert-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          margin: 0 0 4px;
          line-height: 1.3;
        }
        .cert-issuer {
          font-size: 12.5px;
          color: rgba(177,158,239,0.6);
          margin: 0 0 8px;
        }
        .cert-tag {
          display: inline-block;
          padding: 2px 10px;
          border-radius: 50px;
          font-size: 11px;
          font-weight: 500;
        }
        @media (max-width: 640px) {
          .cert-section { padding: 80px 24px; }
          .cert-grid { grid-template-columns: 1fr; }
          .section-title { font-size: 34px; }
        }
      `}</style>

      <section className="cert-section" ref={sectionRef} id="certifications">
        <div className="cert-inner">

          {/* Heading */}
          <div style={fadeUp(0)}>
            <div className="section-label">Certifications</div>
            <h2 className="section-title">What I've <span>Earned</span></h2>
            <p className="section-sub">Courses and certifications I've completed.</p>
          </div>

          {/* Cards */}
          <div className="cert-grid">
            {certs.map((cert, i) => (
              <div
                key={cert.title}
                className="cert-card"
                style={{
                  border: `1px solid ${cert.border}`,
                  background: cert.bg,
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(28px)",
                  transition: `opacity 0.6s ease ${0.1 + i * 0.08}s, transform 0.6s ease ${0.1 + i * 0.08}s, box-shadow 0.25s ease`,
                  boxShadow: `0 0 0 rgba(0,0,0,0)`,
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 8px 32px ${cert.border}`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = `0 0 0 rgba(0,0,0,0)`}
              >
                <div
                  className="cert-icon"
                  style={{ background: cert.bg, border: `1px solid ${cert.border}`, color: cert.color }}
                >
                  {cert.icon}
                </div>
                <div>
                  <p className="cert-title">{cert.title}</p>
                  <p className="cert-issuer">{cert.issuer}</p>
                  <span
                    className="cert-tag"
                    style={{
                      background: cert.bg,
                      border: `1px solid ${cert.border}`,
                      color: cert.color,
                    }}
                  >
                    {cert.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}