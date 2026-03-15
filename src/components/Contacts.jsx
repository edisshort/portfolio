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
    handle: "Harsh",
    href: "https://github.com/edisshort",
    color: "#fff",
    bg: "rgba(255,255,255,0.06)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    handle: "Harsh Solanki",
    href: "https://www.linkedin.com/in/harsh-solanki-37211128b/",
    color: "#0A66C2",
    bg: "rgba(10,102,194,0.1)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    handle: "harshsolanki2203@gmail.com",
    href: "mailto:harshsolanki2203@gmail.com",
    color: "#B19EEF",
    bg: "rgba(177,158,239,0.08)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const fadeUp = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
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
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus("sending");
    // Simulate send — replace with EmailJS / Formspree / your API
    setTimeout(() => setStatus("sent"), 1800);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Space+Grotesk:wght@400;600;700&display=swap');

        .contact-section {
          width: 100%;
          padding: 100px 48px 120px;
          font-family: 'DM Sans', sans-serif;
        }
        .contact-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 56px;
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

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 24px;
          align-items: start;
        }

        /* Left panel */
        .contact-left {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .social-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 20px;
          background: rgba(10,4,28,0.5);
          border: 1px solid rgba(177,158,239,0.12);
          border-radius: 16px;
          backdrop-filter: blur(16px);
          text-decoration: none;
          transition: all 0.25s ease;
          cursor: pointer;
        }
        .social-card:hover {
          border-color: rgba(177,158,239,0.3);
          transform: translateX(6px);
        }
        .social-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: all 0.25s;
        }
        .social-label {
          font-size: 13px;
          color: rgba(177,158,239,0.6);
          margin-bottom: 2px;
          font-weight: 500;
          letter-spacing: 0.02em;
        }
        .social-handle {
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          font-family: 'Space Grotesk', sans-serif;
        }
        .social-arrow {
          margin-left: auto;
          color: rgba(177,158,239,0.3);
          transition: all 0.25s;
          flex-shrink: 0;
        }
        .social-card:hover .social-arrow {
          color: rgba(177,158,239,0.7);
          transform: translateX(4px);
        }

        /* Availability card */
        .avail-card {
          padding: 20px 24px;
          background: linear-gradient(135deg, rgba(82,39,255,0.15), rgba(177,158,239,0.08));
          border: 1px solid rgba(82,39,255,0.3);
          border-radius: 16px;
          backdrop-filter: blur(16px);
        }
        .avail-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 10px #22c55e;
          display: inline-block;
          margin-right: 8px;
          animation: pulse-green 2s ease-in-out infinite;
        }
        @keyframes pulse-green {
          0%, 100% { box-shadow: 0 0 6px #22c55e; }
          50% { box-shadow: 0 0 14px #22c55e; }
        }

        /* Form */
        .contact-form {
          background: rgba(10,4,28,0.5);
          border: 1px solid rgba(177,158,239,0.13);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 36px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 7px;
          margin-bottom: 16px;
        }
        .form-label {
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(177,158,239,0.6);
          font-weight: 500;
        }
        .form-input, .form-textarea {
          background: rgba(177,158,239,0.05);
          border: 1px solid rgba(177,158,239,0.15);
          border-radius: 12px;
          padding: 12px 16px;
          color: #fff;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border 0.2s ease, background 0.2s ease;
          width: 100%;
          box-sizing: border-box;
        }
        .form-input::placeholder, .form-textarea::placeholder {
          color: rgba(177,158,239,0.3);
        }
        .form-input:focus, .form-textarea:focus {
          border-color: rgba(82,39,255,0.6);
          background: rgba(82,39,255,0.08);
        }
        .form-input.err, .form-textarea.err {
          border-color: rgba(255,100,100,0.5);
        }
        .form-textarea {
          resize: vertical;
          min-height: 130px;
          line-height: 1.65;
        }
        .form-error {
          font-size: 11.5px;
          color: rgba(255,120,120,0.85);
          margin-top: -4px;
        }
        .submit-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #5227FF, #7B5CF0);
          color: #fff;
          border: none;
          border-radius: 12px;
          font-size: 14.5px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          letter-spacing: 0.02em;
          margin-top: 8px;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(82,39,255,0.45);
        }
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Success state */
        .success-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          text-align: center;
          gap: 16px;
        }

        /* Footer */
        .footer-line {
          text-align: center;
          padding-top: 48px;
          border-top: 1px solid rgba(177,158,239,0.08);
          font-size: 13px;
          color: rgba(177,158,239,0.4);
          line-height: 1.8;
        }
        .footer-line span { color: rgba(177,158,239,0.65); }

        @media (max-width: 900px) {
          .contact-section { padding: 80px 24px 100px; }
          .contact-grid { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
          .section-title { font-size: 32px; }
        }
      `}</style>

      <section className="contact-section" ref={sectionRef} id="contact">
        <div className="contact-inner">

          {/* Heading */}
          <div style={fadeUp(0)}>
            <div className="section-label">Contact</div>
            <h2 className="section-title">Let's <span>Connect</span></h2>
            <p className="section-sub">
              Open to internships, collaborations, and interesting projects. Drop a message!
            </p>
          </div>

          <div className="contact-grid">

            {/* LEFT — socials + availability */}
            <div className="contact-left" style={fadeUp(0.1)}>

              {/* Availability */}
              <div className="avail-card">
                <p style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 600, color: "#fff" }}>
                  <span className="avail-dot" />
                  Currently Available
                </p>
                <p style={{ margin: 0, fontSize: 14, color: "rgba(177,158,239,0.65)", lineHeight: 1.65 }}>
                  Looking for internship opportunities in AI, backend, or full-stack development.
                  
                </p>
              </div>

              {/* Social links */}
              {socials.map((s, i) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateX(0)" : "translateX(-20px)",
                    transition: `opacity 0.6s ease ${0.15 + i * 0.08}s, transform 0.6s ease ${0.15 + i * 0.08}s`,
                  }}
                >
                  <div className="social-icon" style={{ background: s.bg, color: s.color }}>
                    {s.icon}
                  </div>
                  <div>
                    <div className="social-label">{s.label}</div>
                    <div className="social-handle">{s.handle}</div>
                  </div>
                  <span className="social-arrow">
                    <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>

            {/* RIGHT — form */}
            <div className="contact-form" style={fadeUp(0.2)}>
              {status === "sent" ? (
                <div className="success-state">
                  <div style={{ fontSize: 56 }}>🎉</div>
                  <h3 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 22, fontWeight: 700, color: "#fff", margin: 0,
                  }}>
                    Message Sent!
                  </h3>
                  <p style={{ fontSize: 14, color: "rgba(177,158,239,0.65)", margin: 0, maxWidth: 320, lineHeight: 1.7 }}>
                    Thanks for reaching out! I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setForm(INITIAL); setStatus("idle"); }}
                    style={{
                      marginTop: 8,
                      padding: "10px 24px",
                      background: "rgba(82,39,255,0.2)",
                      border: "1px solid rgba(177,158,239,0.25)",
                      borderRadius: 50, color: "#B19EEF",
                      fontSize: 13, cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      transition: "all 0.2s",
                    }}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <p style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 17, fontWeight: 600, color: "#fff",
                    margin: "0 0 24px",
                  }}>
                    Send a Message
                  </p>

                  {/* Name + Email row */}
                  <div className="form-row">
                    <div>
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
                    </div>
                    <div>
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
                  </div>

                  {/* Subject */}
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input
                      className="form-input"
                      placeholder="What's this about?"
                      value={form.subject}
                      onChange={handleChange("subject")}
                    />
                  </div>

                  {/* Message */}
                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea
                      className={`form-textarea${errors.message ? " err" : ""}`}
                      placeholder="Tell me about your project, opportunity, or just say hi..."
                      value={form.message}
                      onChange={handleChange("message")}
                    />
                    {errors.message && <span className="form-error">{errors.message}</span>}
                  </div>

                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ animation: "spin 1s linear infinite" }}>
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </>
                    )}
                  </button>
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </form>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="footer-line" style={fadeUp(0.4)}>
            <p>Designed & built by <span>Harsh Solanki</span> · {new Date().getFullYear()}</p>
            <p style={{ marginTop: 4 }}>Built with <span>React</span> · <span>Vite</span> · <span>LiquidEther</span> · ☕</p>
          </div>

        </div>
      </section>
    </>
  );
}