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

const socials = [
  {
    label: "GitHub",
    handle: "edisshort",
    href: "https://github.com/edisshort",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    handle: "Harsh Solanki",
    href: "https://www.linkedin.com/in/harsh-solanki-37211128b/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    handle: "harshsolanki2203@gmail.com",
    href: "mailto:harshsolanki2203@gmail.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="3" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

const INITIAL = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [sectionRef, inView] = useInView(0.05);
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const fadeUp = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
  });

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleChange = (field) => (ev) => {
    setForm((f) => ({ ...f, [field]: ev.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1800);
  };

  return (
    <>
      <style>{`
        .contact-section {
          width: 100%;
          padding: 96px 48px 100px;
          font-family: var(--font-body);
        }
        .contact-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.35fr;
          gap: 28px;
          align-items: start;
        }
        .contact-left { display: flex; flex-direction: column; gap: 10px; }
        .avail-card {
          padding: 18px 20px;
          border: 2px solid var(--accent);
          border-radius: 8px;
          background: var(--accent-soft);
          margin-bottom: 6px;
        }
        .avail-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #22c55e;
          display: inline-block;
          margin-right: 8px;
        }
        .social-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          border: 1.5px solid var(--border);
          border-radius: 8px;
          background: var(--surface);
          text-decoration: none;
          transition: all 0.2s;
        }
        .social-card:hover {
          border-color: var(--accent);
          transform: translateX(4px);
        }
        .social-icon {
          width: 40px; height: 40px;
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          color: var(--accent);
          background: var(--accent-soft);
          flex-shrink: 0;
        }
        .social-label { font-size: 12px; color: var(--muted-soft); font-weight: 500; }
        .social-handle {
          font-size: 14px; font-weight: 700; color: var(--text);
          font-family: var(--font-display); word-break: break-all;
        }
        .contact-form {
          background: var(--surface);
          border: 2px solid var(--border);
          border-radius: 8px;
          padding: 28px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 12px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 12px;
        }
        .form-label {
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted-soft);
          font-weight: 700;
        }
        .form-input, .form-textarea {
          background: var(--bg);
          border: 1.5px solid var(--border);
          border-radius: 6px;
          padding: 11px 14px;
          color: var(--text);
          font-size: 14px;
          font-family: var(--font-body);
          outline: none;
          width: 100%;
          transition: border 0.2s;
        }
        .form-input:focus, .form-textarea:focus { border-color: var(--accent); }
        .form-input.err, .form-textarea.err { border-color: #e11d48; }
        .form-textarea { resize: vertical; min-height: 110px; line-height: 1.6; }
        .form-error { font-size: 11.5px; color: #e11d48; }
        .submit-btn {
          width: 100%;
          padding: 13px;
          background: var(--accent);
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 700;
          font-family: var(--font-body);
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 4px;
        }
        .submit-btn:hover:not(:disabled) {
          background: var(--accent-hover);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(232, 90, 42, 0.3);
        }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .success-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 20px;
          text-align: center;
          gap: 12px;
        }
        .footer-line {
          text-align: center;
          padding-top: 36px;
          border-top: 1.5px solid var(--border);
          font-size: 13px;
          color: var(--muted-soft);
        }
        .footer-line span { color: var(--accent); font-weight: 600; }
        @media (max-width: 900px) {
          .contact-section { padding: 72px 24px 80px; }
          .contact-grid { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="contact-section" ref={sectionRef} id="contact">
        <div className="contact-inner">
          <div style={fadeUp(0)}>
            <div className="section-eyebrow">Contact</div>
            <h2 className="section-heading">Let&apos;s <em>connect</em></h2>
            <p className="section-lede">
              Open to internships, collaborations, and interesting projects.
            </p>
          </div>

          <div className="contact-grid">
            <div className="contact-left" style={fadeUp(0.08)}>
              <div className="avail-card">
                <p style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700, color: "var(--text)" }}>
                  <span className="avail-dot" />
                  Currently Available
                </p>
                <p style={{ margin: 0, fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>
                  Looking for opportunities in AI, backend, or full-stack.
                </p>
              </div>

              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card"
                >
                  <div className="social-icon">{s.icon}</div>
                  <div>
                    <div className="social-label">{s.label}</div>
                    <div className="social-handle">{s.handle}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="contact-form" style={fadeUp(0.14)}>
              {status === "sent" ? (
                <div className="success-state">
                  <h3 style={{
                    fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800,
                    color: "var(--text)", margin: 0,
                  }}>
                    Message Sent!
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--muted)", margin: 0 }}>
                    Thanks — I&apos;ll get back to you soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setForm(INITIAL); setStatus("idle"); }}
                    style={{
                      marginTop: 8, padding: "10px 20px",
                      background: "var(--accent)", color: "#fff", border: "none",
                      borderRadius: 6, fontWeight: 700, cursor: "pointer",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <p style={{
                    fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 800,
                    color: "var(--text)", margin: "0 0 20px",
                  }}>
                    Send a Message
                  </p>
                  <div className="form-row">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Name</label>
                      <input
                        className={`form-input${errors.name ? " err" : ""}`}
                        placeholder="Your name"
                        value={form.name}
                        onChange={handleChange("name")}
                      />
                      {errors.name && <span className="form-error">{errors.name}</span>}
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className={`form-input${errors.email ? " err" : ""}`}
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={handleChange("email")}
                      />
                      {errors.email && <span className="form-error">{errors.email}</span>}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input
                      className="form-input"
                      placeholder="What's this about?"
                      value={form.subject}
                      onChange={handleChange("subject")}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea
                      className={`form-textarea${errors.message ? " err" : ""}`}
                      placeholder="Tell me about your project or opportunity..."
                      value={form.message}
                      onChange={handleChange("message")}
                    />
                    {errors.message && <span className="form-error">{errors.message}</span>}
                  </div>
                  <button type="submit" className="submit-btn" disabled={status === "sending"}>
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="footer-line" style={fadeUp(0.28)}>
            Designed & built by <span>Harsh Solanki</span> · {new Date().getFullYear()}
          </div>
        </div>
      </section>
    </>
  );
}
