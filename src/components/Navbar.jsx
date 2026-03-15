import { useState, useEffect } from "react";

const navLinks = [
  { label: "About", href: "#about" },
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

  // Highlight nav link based on which section is in view
  useEffect(() => {
    const ids = navLinks.map(l => l.href.replace("#", ""));
    const observers = [];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive("#" + id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const handleNav = (href) => {
    setActive(href);
    setMenuOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=DM+Sans:wght@400;500&display=swap');

        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          height: 64px;
          transition: all 0.35s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .navbar.scrolled {
          background: rgba(8, 4, 26, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(177,158,239,0.12);
          height: 56px;
        }

        .nav-logo {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 22px;
          font-weight: 600;
          color: #fff;
          text-decoration: none;
          letter-spacing: -0.03em;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .nav-logo span {
          background: linear-gradient(135deg, #5227FF, #B19EEF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .logo-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #5227FF;
          box-shadow: 0 0 10px #5227FF;
          flex-shrink: 0;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
          margin: 0; padding: 0;
        }
        .nav-links a {
          display: block;
          padding: 6px 14px;
          font-size: 13.5px;
          font-weight: 500;
          color: rgba(177,158,239,0.75);
          text-decoration: none;
          border-radius: 50px;
          transition: all 0.2s ease;
          letter-spacing: 0.01em;
        }
        .nav-links a:hover {
          color: #fff;
          background: rgba(82,39,255,0.18);
        }
        .nav-links a.active {
          color: #fff;
          background: rgba(82,39,255,0.28);
          box-shadow: 0 0 12px rgba(82,39,255,0.4);
          border: 1px solid rgba(177,158,239,0.35);
        }

        .nav-resume {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 20px;
          background: linear-gradient(135deg, #5227FF, #7B5CF0);
          color: #fff;
          border: none;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.22s ease;
          letter-spacing: 0.02em;
        }
        .nav-resume:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(82,39,255,0.45);
        }

        /* Hamburger */
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
          width: 24px; height: 2px;
          background: #B19EEF;
          border-radius: 2px;
          transition: all 0.25s ease;
        }
        .nav-hamburger.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .nav-hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        .nav-hamburger.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* Mobile menu */
        .nav-mobile {
          position: fixed;
          top: 56px; left: 0; right: 0;
          z-index: 99;
          background: rgba(8,4,26,0.92);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(177,158,239,0.12);
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
          color: rgba(177,158,239,0.8);
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.2s;
        }
        .nav-mobile a:hover {
          color: #fff;
          background: rgba(82,39,255,0.18);
        }
        .nav-mobile-resume {
          margin-top: 12px;
          padding: 12px 20px;
          background: linear-gradient(135deg,#5227FF,#7B5CF0);
          color: #fff;
          border-radius: 12px;
          text-align: center;
          font-weight: 500;
          font-size: 14px;
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .navbar { padding: 0 20px; }
          .nav-links, .nav-resume { display: none; }
          .nav-hamburger { display: flex; }
        }
      `}</style>

      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        {/* Logo */}
        <a href="#" className="nav-logo" onClick={() => handleNav("")}>
          <div className="logo-dot" />
          Harsh<span>.</span>
        </a>

        {/* Desktop links */}
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

        {/* Resume button */}
        <a href="/harsh-resume.pdf" download="Harsh_Solanki_Resume.pdf" target="_blank" rel="noopener noreferrer" className="nav-resume">
          Resume
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        {/* Hamburger (mobile) */}
        <button
          className={`nav-hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div className={`nav-mobile${menuOpen ? " open" : ""}`}>
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} onClick={() => handleNav(l.href)}>
            {l.label}
          </a>
        ))}
        <a href="/harsh-resume.pdf" download="Harsh_Solanki_Resume.pdf" target="_blank" rel="noopener noreferrer" className="nav-mobile-resume">
          Download Resume ↗
        </a>
      </div>
    </>
  );
}