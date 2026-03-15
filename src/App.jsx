import LiquidEther from "./components/LiquidEther";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Hackathon from "./components/Hackathon";
import Contact from "./components/Contacts";

export default function App() {
  return (
    <div style={{ width: "100vw", minHeight: "100vh", background: "#08041A", position: "relative", overflowX: "hidden", overflowY: "auto" }}>

      {/* ── FIXED: LiquidEther stays behind everything always ── */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}>
        <LiquidEther
          mouseForce={20}
          cursorSize={100}
          isViscous
          viscous={30}
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          isBounce={false}
          resolution={0.5}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* ── FIXED: Dark vignette overlay ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1,
        background: "radial-gradient(ellipse at center, rgba(8,4,26,0.1) 0%, rgba(8,4,26,0.5) 100%)",
        pointerEvents: "none",
      }} />

      {/* ── FIXED: Navbar ── */}
      <Navbar />

      {/* ── SCROLLABLE content ── */}
      <div style={{ position: "relative", zIndex: 10 }}>

        {/* Hero — full viewport height */}
        <section id="hero" style={{ width: "100%", height: "100vh", position: "relative" }}>
          <Hero />
        </section>
        
        <section id="about">
          <About />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="certifications">
          <Certifications />
        </section>  

          <section id="hackathon">  
          <Hackathon />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </div>
    </div>
  );
}