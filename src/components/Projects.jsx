import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.05) {
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

const projects = [
  {
    id: 1,
    title: "VidIntel AI",
    tagline: "Multimodal Video Intelligence Platform",
    description:
      "Transforms YouTube videos into a searchable knowledge base using a 4-agent AI system enabling cross-video reasoning and exact timestamp retrieval.",
    longDesc:
      "Built with FastAPI + Next.js 14 and powered by Groq's Llama 3.3 70B. Implements Hybrid RAG with BM25 + ChromaDB fused via Reciprocal Rank Fusion. Features a Visual RAG pipeline with EasyOCR + LLM reranking that retrieves code, diagrams, and terminal output visible in frames but never spoken aloud.",
    tech: ["FastAPI", "Next.js 14", "Groq", "ChromaDB", "BM25", "Python"],
    github: "https://github.com/edisshort/VidIntel",
    demo: "",
    featured: true,
  },
  {
    id: 2,
    title: "LyricLens",
    tagline: "AI Music Research Assistant",
    description:
      "A multilingual AI music assistant that ingests lyrics and Wikipedia into ChromaDB, enabling deep Q&A on themes, emotion, and symbolism.",
    longDesc:
      "Powered by Groq's Llama 3.3 70B with a 2-stage query router: regex fast-path classifies 6 query types instantly while Groq LLM handles ambiguous cases. Features language-aware filtering across Hindi, English, and other languages.",
    tech: ["FastAPI", "React", "Groq", "ChromaDB", "BM25", "Python"],
    github: "",
    demo: "https://basednigga-lyriclens.hf.space",
    featured: true,
  },
  {
    id: 3,
    title: "AI Voice Receptionist",
    tagline: "Conversational AI that handles real calls",
    description:
      "A voice receptionist that understands natural language, books appointments via Google Calendar, and responds under 2s end-to-end.",
    longDesc:
      "Voice-to-calendar pipeline using FastAPI + Qwen (Ollama). Real-time STT + TTS in the browser via Web Speech API. Self-hosted LLM stack achieving under 2s end-to-end response time.",
    tech: ["FastAPI", "Ollama", "Web Speech API", "Google Calendar", "Python"],
    github: "https://github.com/edisshort/ai-voice-receptionist",
    demo: "",
    featured: true,
  },
  {
    id: 4,
    title: "Concert Ticket Booking",
    tagline: "Book your favourite shows in one click",
    description:
      "A full-stack concert ticket booking platform with seat selection, booking management, and real-time seat availability.",
    longDesc:
      "Full-stack web app for browsing and booking concert tickets. Features event listings, seat selection, booking management, and user authentication.",
    tech: ["Python", "JavaScript", "HTML/CSS", "SQL"],
    github: "https://github.com/edisshort/conert-ticket-booking",
    demo: "",
    featured: false,
  },
];

function Modal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 999,
        background: "rgba(26, 18, 16, 0.45)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          border: "2px solid var(--text)",
          borderRadius: 8,
          padding: 36,
          maxWidth: 600,
          width: "100%",
          position: "relative",
          boxShadow: "var(--shadow)",
        }}
      >
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 4,
          background: "var(--accent)", borderRadius: "6px 6px 0 0",
        }} />
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute", top: 16, right: 16,
            width: 36, height: 36, borderRadius: 6,
            background: "var(--bg)", border: "1.5px solid var(--border)",
            color: "var(--text)", fontSize: 18, cursor: "pointer",
          }}
        >
          ×
        </button>
        <h3 style={{
          fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800,
          color: "var(--text)", margin: "8px 0 6px", letterSpacing: "-0.02em",
        }}>
          {project.title}
        </h3>
        <p style={{ fontSize: 14, color: "var(--accent)", fontWeight: 600, margin: "0 0 18px" }}>
          {project.tagline}
        </p>
        <p style={{ fontSize: 14.5, lineHeight: 1.8, color: "var(--muted)", margin: "0 0 22px" }}>
          {project.longDesc}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
          {project.tech.map((t) => (
            <span key={t} style={{
              padding: "5px 12px", border: "1.5px solid var(--border)",
              borderRadius: 6, fontSize: 12, color: "var(--text)", fontWeight: 500,
              background: "var(--bg)",
            }}>
              {t}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 18px", border: "2px solid var(--text)",
              borderRadius: 6, color: "var(--text)", fontSize: 13, fontWeight: 600,
              textDecoration: "none",
            }}>
              GitHub
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 18px", background: "var(--accent)",
              borderRadius: 6, color: "#fff", fontSize: 13, fontWeight: 700,
              textDecoration: "none",
            }}>
              Live Demo →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, inView, delay, onClick, index }) {
  const [hovered, setHovered] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") onClick(); }}
      style={{
        background: "var(--surface)",
        border: `2px solid ${hovered ? "var(--accent)" : "var(--border)"}`,
        borderRadius: 8,
        padding: 26,
        cursor: "pointer",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s, border 0.2s, box-shadow 0.2s`,
        boxShadow: hovered ? "var(--shadow)" : "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
        <span style={{
          fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 800,
          color: "var(--accent)", letterSpacing: "0.06em",
        }}>
          {num}
        </span>
        {project.featured && (
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
            textTransform: "uppercase", color: "var(--accent)",
            padding: "3px 8px", background: "var(--accent-soft)", borderRadius: 4,
          }}>
            Featured
          </span>
        )}
      </div>
      <h3 style={{
        fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 800,
        color: "var(--text)", margin: "0 0 4px", letterSpacing: "-0.02em",
      }}>
        {project.title}
      </h3>
      <p style={{ fontSize: 13, color: "var(--accent)", fontWeight: 600, margin: "0 0 12px" }}>
        {project.tagline}
      </p>
      <p style={{
        fontSize: 13.5, lineHeight: 1.7, color: "var(--muted)", margin: "0 0 16px",
        display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
      }}>
        {project.description}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {project.tech.slice(0, 4).map((t) => (
          <span key={t} style={{
            padding: "3px 10px", border: "1.5px solid var(--border)",
            borderRadius: 4, fontSize: 11.5, color: "var(--muted)", fontWeight: 500,
          }}>
            {t}
          </span>
        ))}
      </div>
      <div style={{
        borderTop: "1.5px solid var(--border)", paddingTop: 12,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontSize: 12, color: "var(--muted-soft)" }}>
          {project.demo ? "Live Demo" : "GitHub"}
        </span>
        <span style={{
          fontSize: 12, color: "var(--accent)", fontWeight: 700,
          opacity: hovered ? 1 : 0.6,
        }}>
          View details →
        </span>
      </div>
    </div>
  );
}

export default function Projects() {
  const [sectionRef, inView] = useInView(0.05);
  const [activeProject, setActiveProject] = useState(null);
  const fadeUp = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
  });

  return (
    <>
      <style>{`
        .projects-section {
          width: 100%;
          padding: 96px 48px;
          font-family: var(--font-body);
        }
        .projects-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .github-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          border: 2px solid var(--text);
          border-radius: 6px;
          color: var(--text);
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s;
        }
        .github-cta:hover {
          background: var(--text);
          color: #fff;
          transform: translateY(-2px);
        }
        @media (max-width: 900px) {
          .projects-section { padding: 72px 24px; }
          .projects-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="projects-section" ref={sectionRef} id="projects">
        <div className="projects-inner">
          <div style={fadeUp(0)}>
            <div className="section-eyebrow">Projects</div>
            <h2 className="section-heading">Things I&apos;ve <em>built</em></h2>
            <p className="section-lede">
              Products and systems — click a card for the full story.
            </p>
          </div>

          <div className="projects-grid">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                inView={inView}
                index={i}
                delay={0.08 + i * 0.07}
                onClick={() => setActiveProject(project)}
              />
            ))}
          </div>

          <div style={{ ...fadeUp(0.3), display: "flex", justifyContent: "center" }}>
            <a
              href="https://github.com/edisshort"
              target="_blank"
              rel="noopener noreferrer"
              className="github-cta"
            >
              See All on GitHub →
            </a>
          </div>
        </div>
      </section>

      {activeProject && (
        <Modal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </>
  );
}
