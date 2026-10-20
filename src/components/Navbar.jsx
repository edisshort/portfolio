import { useState, useEffect } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Hackathon", href: "#hackathon" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const observers = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive("#" + id); },
        { threshold: 0.28 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNav = (href) => {
    setActive(href);
    setMenuOpen(false);
  };

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          height: 64px;
          transition: all 0.3s ease;
          font-family: var(--font-body);
        }
        .navbar.scrolled {
          background: rgba(250, 246, 241, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          height: 58px;
        }
        .nav-logo {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 800;
          color: var(--text);
          text-decoration: none;
          letter-spacing: -0.03em;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .nav-logo-mark {
          width: 10px;
          height: 10px;
          background: var(--accent);
          border-radius: 2px;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin: 0; padding: 0;
        }
        .nav-links a {
          display: block;
          padding: 6px 11px;
          font-size: 13px;
          font-weight: 550;
          color: var(--muted);
          text-decoration: none;
          border-radius: 4px;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--text); }
        .nav-links a.active { color: var(--accent); font-weight: 700; }
        .nav-resume {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          background: var(--accent);
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          font-family: var(--font-body);
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .nav-resume:hover {
          background: var(--accent-hover);
          transform: translateY(-1px);
        }
        .nav-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 4px;
          background: none;
          border: none;
        }
        .nav-hamburger span {
          display: block;
          width: 22px; height: 2px;
          background: var(--text);
          border-radius: 2px;
          transition: all 0.25s ease;
        }
        .nav-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .nav-hamburger.open span:nth-child(2) { opacity: 0; }
        .nav-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        .nav-mobile {
          position: fixed;
          top: 58px; left: 0; right: 0;
          z-index: 99;
          background: rgba(250, 246, 241, 0.97);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
          padding: 16px 24px 24px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          transform: translateY(-110%);
          opacity: 0;
          transition: all 0.3s ease;
          pointer-events: none;
        }
        .nav-mobile.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: all;
        }
        .nav-mobile a {
          display: block;
          padding: 10px 16px;
          font-size: 15px;
          font-weight: 500;
          color: var(--muted);
          text-decoration: none;
          border-radius: 6px;
        }
        .nav-mobile a:hover { color: var(--accent); background: var(--accent-soft); }
        .nav-mobile-resume {
          margin-top: 12px;
          padding: 12px 20px;
          background: var(--accent);
          color: #fff;
          border-radius: 6px;
          text-align: center;
          font-weight: 700;
          font-size: 14px;
          text-decoration: none;
        }
        @media (max-width: 900px) {
          .navbar { padding: 0 20px; }
          .nav-links, .nav-resume { display: none; }
          .nav-hamburger { display: flex; }
        }
      `}</style>

      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <a href="#hero" className="nav-logo" onClick={() => handleNav("")}>
          <span className="nav-logo-mark" aria-hidden="true" />
          Harsh Solanki
        </a>

        <ul className="nav-links">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={active === l.href ? "active" : ""}
                onClick={() => handleNav(l.href)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/harsh-resume.pdf"
          download="Harsh_Solanki_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-resume"
        >
          Resume
        </a>

        <button
          className={`nav-hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`nav-mobile${menuOpen ? " open" : ""}`}>
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} onClick={() => handleNav(l.href)}>
            {l.label}
          </a>
        ))}
        <a
          href="/harsh-resume.pdf"
          download="Harsh_Solanki_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-mobile-resume"
        >
          Download Resume
        </a>
      </div>
    </>
  );
}
