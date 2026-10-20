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

const certs = [
  { title: "AWS Cloud Practitioner Essentials", issuer: "Amazon Web Services — Sep 2025", tag: "Cloud" },
  { title: "Introduction to IoT & Digital Transformation", issuer: "Cisco Networking Academy — Oct 2025", tag: "IoT" },
  { title: "C++ Certified Associate", issuer: "C++ Institute", tag: "Programming" },
  { title: "Java Programming", issuer: "Spoken Tutorial — IIT Bombay", tag: "Programming" },
  { title: "Python Programming", issuer: "Spoken Tutorial — IIT Bombay", tag: "Programming" },
  { title: "PHP & MySQL", issuer: "Spoken Tutorial — IIT Bombay", tag: "Web" },
];

export default function Certifications() {
  const [sectionRef, inView] = useInView(0.05);
  const fadeUp = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
  });

  return (
    <>
      <style>{`
        .cert-section {
          width: 100%;
          padding: 96px 48px;
          font-family: var(--font-body);
        }
        .cert-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 36px;
        }
        .cert-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 16px;
          align-items: baseline;
          padding: 16px 0;
          border-top: 1.5px solid var(--border);
        }
        .cert-row:last-child { border-bottom: 1.5px solid var(--border); }
        .cert-title {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 700;
          color: var(--text);
          margin: 0 0 4px;
        }
        .cert-issuer {
          font-size: 13px;
          color: var(--muted);
          margin: 0;
        }
        .cert-tag {
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent);
          font-weight: 700;
          white-space: nowrap;
        }
        @media (max-width: 640px) {
          .cert-section { padding: 72px 24px; }
          .cert-row { grid-template-columns: 1fr; gap: 4px; }
        }
      `}</style>

      <section className="cert-section" ref={sectionRef} id="certifications">
        <div className="cert-inner">
          <div style={fadeUp(0)}>
            <div className="section-eyebrow">Certifications</div>
            <h2 className="section-heading">What I&apos;ve <em>earned</em></h2>
            <p className="section-lede">Courses and credentials that backed the build.</p>
          </div>

          <div style={fadeUp(0.08)}>
            {certs.map((cert) => (
              <div key={cert.title} className="cert-row">
                <div>
                  <p className="cert-title">{cert.title}</p>
                  <p className="cert-issuer">{cert.issuer}</p>
                </div>
                <span className="cert-tag">{cert.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
