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
      "Transforms YouTube videos into a searchable knowledge base using a 4-agent AI system (Retrieval, Visual, Consensus, Research) enabling cross-video reasoning and exact timestamp retrieval.",
    longDesc:
      "Built with FastAPI + Next.js 14 and powered by Groq's Llama 3.3 70B. Implements Hybrid RAG with BM25 + ChromaDB fused via Reciprocal Rank Fusion for superior retrieval accuracy over pure semantic search. Features a Visual RAG pipeline with EasyOCR + LLM reranking that retrieves code, diagrams, and terminal output visible in frames but never spoken aloud.",
    tech: ["FastAPI", "Next.js 14", "Groq (Llama 3.3 70B)", "ChromaDB", "BM25", "Python"],
    github: "https://github.com/edisshort/VidIntel",
    demo: "",
    color: "#5227FF",
    glow: "rgba(82,39,255,0.35)",
    featured: true,
  },
  {
    id: 2,
    title: "LyricLens",
    tagline: "AI Music Research Assistant",
    description:
      "A multilingual AI music assistant that ingests lyrics and Wikipedia into ChromaDB, enabling deep Q&A on themes, emotion, and symbolism with 6-turn conversational memory.",
    longDesc:
      "Powered by Groq's Llama 3.3 70B with a 2-stage query router: regex fast-path classifies 6 query types instantly while Groq LLM handles only ambiguous cases — optimising API usage without sacrificing accuracy. Features language-aware filtering that prevents cross-language recommendation leakage, keeping results culturally accurate across Hindi, English, and other languages.",
    tech: ["FastAPI", "React", "Groq (Llama 3.3 70B)", "ChromaDB", "BM25", "Python"],
    github: "",
    demo: "https://basednigga-lyriclens.hf.space",
    color: "#FF9FFC",
    glow: "rgba(255,159,252,0.35)",
    featured: true,
  },
  {
    id: 3,
    title: "AI Voice Receptionist",
    tagline: "Conversational AI that handles real calls",
    description:
      "A fully functional AI-powered voice receptionist that understands natural language, books appointments via Google Calendar, and responds with a human-like voice — entirely under 2s end-to-end.",
    longDesc:
      "Eliminated manual appointment booking by building a voice-to-calendar pipeline using FastAPI + Qwen (Ollama). Speech is processed, intent extracted, and Google Calendar events created automatically with no human input. Engineered a real-time STT + TTS pipeline in the browser using Web Speech API — fully voice-driven with no paid third-party services. Self-hosted the full LLM stack via Ollama achieving under 2s end-to-end response time.",
    tech: ["FastAPI", "Ollama (Qwen)", "Web Speech API", "Google Calendar API", "Python"],
    github: "https://github.com/edisshort/ai-voice-receptionist",
    demo: "",
    color: "#B19EEF",
    glow: "rgba(177,158,239,0.35)",
    featured: true,
  },
  {
    id: 4,
    title: "Concert Ticket Booking",
    tagline: "Book your favourite shows in one click",
    description:
      "A full-stack concert ticket booking platform where users can browse upcoming concerts, select seats, and book tickets. Built with a clean UI and real-time seat availability.",
    longDesc:
      "A full-stack web application for browsing and booking concert tickets. Features include event listings, seat selection, booking management, and user authentication. Built to handle real-time seat availability and prevent double-booking.",
    tech: ["Python", "JavaScript", "HTML/CSS", "SQL"],
    github: "https://github.com/edisshort/conert-ticket-booking",
    demo: "",
    color: "#3ecf8e",
    glow: "rgba(62,207,142,0.35)",
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
        background: "rgba(4,2,14,0.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "rgba(12,6,32,0.95)",
          border: `1px solid ${project.color}44`,
          borderRadius: 24,
          padding: "40px",
          maxWidth: 620,
          width: "100%",
          position: "relative",
          animation: "slideUp 0.3s ease",
          boxShadow: `0 0 60px ${project.glow}`,
        }}
      >
        {/* Accent top bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${project.color}, ${project.color}44)`,
          borderRadius: "24px 24px 0 0",
        }} />

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 20, right: 20,
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(177,158,239,0.08)",
            border: "1px solid rgba(177,158,239,0.18)",
            color: "rgba(177,158,239,0.7)", fontSize: 18, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(177,158,239,0.18)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(177,158,239,0.08)"; e.currentTarget.style.color = "rgba(177,158,239,0.7)"; }}
        >
          ×
        </button>

        {/* Header */}
        <div style={{ marginBottom: 24, paddingTop: 8 }}>
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 26, fontWeight: 700, color: "#fff",
            margin: "0 0 6px", letterSpacing: "-0.02em",
          }}>
            {project.title}
          </h3>
          <p style={{
            fontSize: 13.5, color: project.color,
            margin: 0, fontWeight: 500, letterSpacing: "0.01em",
          }}>
            {project.tagline}
          </p>
        </div>

        <div style={{
          height: 1,
          background: `linear-gradient(90deg, ${project.color}33, transparent)`,
          marginBottom: 22,
        }} />

        <p style={{
          fontSize: 14.5, lineHeight: 1.85,
          color: "rgba(200,188,230,0.72)",
          margin: "0 0 24px",
        }}>
          {project.longDesc}
        </p>

        {/* Tech stack */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
          {project.tech.map(t => (
            <span key={t} style={{
              padding: "5px 14px",
              background: `${project.color}12`,
              border: `1px solid ${project.color}33`,
              borderRadius: 50, fontSize: 12,
              color: project.color, fontWeight: 500,
            }}>
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 22px",
              background: "rgba(177,158,239,0.08)",
              border: "1px solid rgba(177,158,239,0.2)",
              borderRadius: 50, color: "#ccc",
              fontSize: 13, fontWeight: 500,
              textDecoration: "none", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(177,158,239,0.18)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(177,158,239,0.08)"; e.currentTarget.style.color = "#ccc"; }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 22px",
              background: `linear-gradient(135deg, ${project.color}cc, ${project.color}88)`,
              borderRadius: 50, color: "#fff",
              fontSize: 13, fontWeight: 500,
              textDecoration: "none", transition: "all 0.2s",
              border: `1px solid ${project.color}44`,
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              Live Demo
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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
      style={{
        background: "rgba(10,4,28,0.55)",
        border: `1px solid ${hovered ? project.color + "44" : "rgba(177,158,239,0.1)"}`,
        borderTop: `2px solid ${hovered ? project.color : project.color + "55"}`,
        borderRadius: 20,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        padding: "28px",
        cursor: "pointer",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s, border 0.25s ease, box-shadow 0.25s ease`,
        boxShadow: hovered ? `0 12px 40px ${project.glow}` : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Hover glow bg */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 20,
        background: `radial-gradient(ellipse at top left, ${project.color}0d, transparent 65%)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.35s ease",
        pointerEvents: "none",
      }} />

      {/* Header row: number + featured badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 12, fontWeight: 700, letterSpacing: "0.08em",
          color: project.color, opacity: 0.7,
        }}>
          {num}
        </span>
        {project.featured && (
          <span style={{
            padding: "3px 10px",
            background: `${project.color}18`,
            border: `1px solid ${project.color}44`,
            borderRadius: 50,
            fontSize: 10, color: project.color,
            fontWeight: 600, letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}>
            Featured
          </span>
        )}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 18, fontWeight: 700, color: "#fff",
        margin: "0 0 5px", letterSpacing: "-0.02em",
      }}>
        {project.title}
      </h3>
      <p style={{
        fontSize: 12.5, color: project.color,
        margin: "0 0 16px", fontWeight: 500, opacity: 0.9,
      }}>
        {project.tagline}
      </p>

      <p style={{
        fontSize: 13.5, lineHeight: 1.75,
        color: "rgba(200,188,230,0.65)",
        margin: "0 0 20px",
        display: "-webkit-box",
        WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}>
        {project.description}
      </p>

      {/* Tech tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
        {project.tech.slice(0, 4).map(t => (
          <span key={t} style={{
            padding: "3px 10px",
            background: "rgba(177,158,239,0.08)",
            border: "1px solid rgba(177,158,239,0.15)",
            borderRadius: 50,
            fontSize: 11.5, color: "rgba(177,158,239,0.75)", fontWeight: 500,
          }}>
            {t}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span style={{
            padding: "3px 10px",
            background: "rgba(177,158,239,0.05)",
            border: "1px solid rgba(177,158,239,0.1)",
            borderRadius: 50, fontSize: 11.5,
            color: "rgba(177,158,239,0.5)",
          }}>
            +{project.tech.length - 4} more
          </span>
        )}
      </div>

      {/* Footer */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderTop: "1px solid rgba(177,158,239,0.07)",
        paddingTop: 16,
      }}>
        <span style={{
          fontSize: 12, color: "rgba(177,158,239,0.4)",
          display: "flex", alignItems: "center", gap: 5,
        }}>
          {project.demo ? (
            <>
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Live Demo
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.5 }}>
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </>
          )}
        </span>
        <span style={{
          fontSize: 12, color: project.color,
          display: "flex", alignItems: "center", gap: 4,
          fontWeight: 500,
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.2s",
        }}>
          View details
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
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
    transform: inView ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Space+Grotesk:wght@400;600;700&display=swap');

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

        .projects-section {
          width: 100%;
          padding: 100px 48px;
          font-family: 'DM Sans', sans-serif;
        }
        .projects-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 56px;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
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
        .section-sub {
          font-size: 15px;
          color: rgba(200,188,230,0.6);
          margin: 0;
          line-height: 1.7;
        }
        .github-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          background: rgba(82,39,255,0.12);
          border: 1px solid rgba(177,158,239,0.25);
          border-radius: 50px;
          color: #B19EEF;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.25s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .github-cta:hover {
          background: rgba(82,39,255,0.25);
          border-color: rgba(177,158,239,0.5);
          color: #fff;
          transform: translateY(-2px);
        }
        @media (max-width: 900px) {
          .projects-section { padding: 80px 24px; }
          .projects-grid { grid-template-columns: 1fr; }
          .section-title { font-size: 32px; }
        }
      `}</style>

      <section className="projects-section" ref={sectionRef} id="projects">
        <div className="projects-inner">

          {/* Heading */}
          <div style={fadeUp(0)}>
            <div className="section-label">Projects</div>
            <h2 className="section-title">Things I've <span>Built</span></h2>
            <p className="section-sub">
              A selection of projects that showcase my skills across AI, backend, and full-stack development.
            </p>
          </div>

          {/* Project cards */}
          <div className="projects-grid">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                inView={inView}
                index={i}
                delay={0.1 + i * 0.1}
                onClick={() => setActiveProject(project)}
              />
            ))}
          </div>

          {/* GitHub CTA */}
          <div style={{ ...fadeUp(0.4), display: "flex", justifyContent: "center" }}>
            <a
              href="https://github.com/edisshort"
              target="_blank"
              rel="noopener noreferrer"
              className="github-cta"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              See All Projects on GitHub
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

        </div>
      </section>

      {/* Modal */}
      {activeProject && (
        <Modal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </>
  );
}