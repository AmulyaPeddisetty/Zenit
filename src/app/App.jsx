import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../components/Button";
import Cursor from "../components/Cursor";
import HeroVisual from "../components/HeroVisual";
import Loader from "../components/Loader";
import Playground from "../components/Playground";
import ProjectRow from "../components/ProjectRow";
import { siteConfig } from "../config/site";
import "../App.css";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ──────────────────────────────────────────────────── */
const projects = [
  {
    number: "01",
    title: "NEXUS SAAS",
    category: "Cloud Dashboard & Analytics",
    description:
      "Real-time web platform for tracking business metrics, user retention, and team productivity.",
    year: "2026",
    visual: "aura",
  },
  {
    number: "02",
    title: "VERDE STORE",
    category: "E-Commerce & Digital Storefront",
    description:
      "Modern online shopping platform with smooth product customizer and fast checkout system.",
    year: "2026",
    visual: "nova",
  },
  {
    number: "03",
    title: "LUMEN STUDIO",
    category: "Creative Agency Portfolio",
    description:
      "Interactive website showcasing brand identity, 3D motion graphics, and digital campaigns.",
    year: "2026",
    visual: "form",
  },
  {
    number: "04",
    title: "PULSE HEALTH",
    category: "Telehealth & Doctor Booking",
    description:
      "Patient-first portal for online doctor appointments, medical records, and digital prescriptions.",
    year: "2025",
    visual: "aura",
  },
];

const processSteps = [
  [
    "01",
    "DISCOVER",
    "We find the signal inside the noise: your audience, ambition, and the idea worth building.",
  ],
  [
    "02",
    "DESIGN",
    "We turn that signal into a visual system with a point of view, a rhythm, and a reason to exist.",
  ],
  [
    "03",
    "DEVELOP",
    "We make it real, responsive, and fast, then polish every interaction until it feels inevitable.",
  ],
];

const services = [
  "Brand Strategy",
  "Creative Direction",
  "Web Design",
  "Web Development",
  "Motion Design",
  "Digital Experiences",
];

const navLinks = [
  ["01", "WORK", "#work"],
  ["02", "ABOUT", "#about"],
  ["03", "SERVICES", "#services"],
  ["04", "CONTACT", "#contact"],
];

/* ─── Component ─────────────────────────────────────────────── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  /* Lock scroll when menu is open */
  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    return () => document.body.classList.remove("menu-is-open");
  }, [menuOpen]);

  /* GSAP scroll animations */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document
        .querySelectorAll(".reveal")
        .forEach((el) => el.classList.add("is-visible"));
      return undefined;
    }

    const ctx = gsap.context(() => {
      /* Initial Hero page reveal animation on load */
      const heroTl = gsap.timeline({ delay: 0.6 });
      heroTl
        .fromTo(
          ".site-nav",
          { y: -40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }
        )
        .fromTo(
          ".hero-meta span",
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out" },
          "-=0.6"
        )
        .fromTo(
          ".hero-copy .eyebrow",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          ".hero-copy h1",
          { opacity: 0, y: 50, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power4.out" },
          "-=0.4"
        )
        .fromTo(
          [".hero-description", ".hero-copy .button-link"],
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.7"
        )
        .fromTo(
          ".hero-visual",
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
          "-=0.9"
        )
        .fromTo(
          ".hero-footer",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.6"
        );

      /* Reveal elements on scroll (animates on both down & up scroll) */
      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.95,
            delay: Number(el.dataset.revealDelay || 0),
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              end: "bottom 10%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

      /* Hero visual parallax */
      gsap.to(".hero-visual", {
        rotation: 8,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      /* Playground field parallax */
      gsap.to(".playground-field", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: ".playground",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      /* Smart Nav header reveal on scroll up & shrink on scroll down */
      ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          const nav = document.querySelector(".site-nav");
          if (!nav) return;
          const scrollY = self.scroll();

          if (scrollY > 100) {
            if (self.direction === 1) {
              /* Scrolling DOWN -> hide nav bar */
              nav.classList.add("nav-hidden");
            } else if (self.direction === -1) {
              /* Scrolling UP -> reveal nav bar smoothly */
              nav.classList.remove("nav-hidden");
            }
          } else {
            nav.classList.remove("nav-hidden");
          }

          nav.style.setProperty("--nav-h", scrollY > 60 ? "56px" : "76px");
          nav.classList.toggle("scrolled", scrollY > 60);
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <Loader />
      <Cursor />

      {/* ── Navigation ── */}
      <header className="site-nav">
        <a className="brand" href="#top" aria-label="ZENIT Studio home">
          ZENIT<span>®</span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks.map(([, label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <div className="nav-status">
          <i aria-hidden="true" />
          {siteConfig.availability}
        </div>

        <button
          id="menu-toggle"
          className="menu-button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        >
          {menuOpen ? "CLOSE" : "MENU"}
          <b aria-hidden="true">{menuOpen ? "×" : "↗"}</b>
        </button>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      <nav
        className={`mobile-navigation${menuOpen ? " is-open" : ""}`}
        id="mobile-navigation"
        aria-label="Mobile navigation"
      >
        <span>INDEX / 2026</span>
        {navLinks.map(([number, label, href]) => (
          <a key={label} href={href} onClick={closeMenu}>
            <small>{number}</small>
            {label}
            <em>↗</em>
          </a>
        ))}
      </nav>

      <main id="top">
        {/* ══ HERO ══════════════════════════════════════════════ */}
        <section className="hero-section" aria-label="Hero">
          <div className="hero-meta">
            <span>INDEPENDENT DIGITAL STUDIO</span>
            <span>PORTFOLIO / 2026</span>
          </div>

          <div className="hero-copy">
            <p className="eyebrow">STRATEGY / DESIGN / DEVELOPMENT</p>
            <h1>
              WE BUILD
              <br />
              <em>DIGITAL</em>
              <br />
              EXPERIENCES
              <br />
              <span>THAT MOVE.</span>
            </h1>
            <p className="hero-description">
              Strategy, design and development for ambitious brands, products
              and ideas.
            </p>
            <Button href="#work">
              EXPLORE THE WORK <span>↗</span>
            </Button>
          </div>

          <HeroVisual />

          <div className="hero-footer">
            <span>SCROLL TO EXPLORE</span>
            <span>
              01 / 05 <b>↓</b>
            </span>
          </div>
        </section>

        {/* ══ ABOUT ═════════════════════════════════════════════ */}
        <section className="about-section section-shell" id="about">
          <div className="section-index">
            <span>01</span>
            <span>ABOUT</span>
          </div>

          <div className="about-layout">
            <h2 className="reveal">
              WE DESIGN DIGITAL
              <br />
              <em>EXPERIENCES</em> THAT
              <br />
              MAKE BRANDS HARD
              <br />
              TO IGNORE.
            </h2>

            <div className="about-side reveal" data-reveal-delay="0.1">
              <p>
                Small team. Big attention to detail. We work at the
                intersection of clear thinking, expressive design, and
                thoughtful technology.
              </p>
              <div className="stats">
                <div>
                  <strong>2026</strong>
                  <span>BUILD YEAR</span>
                </div>
                <div>
                  <strong>
                    12<span>+</span>
                  </strong>
                  <span>PROJECTS</span>
                </div>
                <div>
                  <strong>08</strong>
                  <span>EXPERIMENTS</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ WORK ══════════════════════════════════════════════ */}
        <section className="work-section section-shell" id="work">
          <div className="section-index">
            <span>02</span>
            <span>SELECTED WORK</span>
            <span>04 PROJECTS</span>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <ProjectRow key={project.number} project={project} />
            ))}
          </div>
        </section>

        {/* ══ PROCESS ═══════════════════════════════════════════ */}
        <section className="process-section section-shell" id="process">
          <div className="section-index">
            <span>03</span>
            <span>PROCESS</span>
          </div>

          <div className="process-intro reveal">
            <h2>
              FROM FIRST
              <br />
              <em>THOUGHT</em> TO
              <br />
              FINAL FORM.
            </h2>
            <p data-reveal-delay="0.12">
              A considered process keeps the work sharp. Three stages, one
              clear direction.
            </p>
          </div>

          <div className="process-list">
            {processSteps.map(([number, title, text], index) => (
              <article
                className="process-step reveal"
                data-reveal-delay={index * 0.08}
                key={number}
              >
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                <div className="process-glyph" aria-hidden="true">
                  <i />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ══ PLAYGROUND ════════════════════════════════════════ */}
        <section className="playground section-shell">
          <div className="section-index">
            <span>04</span>
            <span>PLAYGROUND</span>
            <span>MOVE YOUR CURSOR</span>
          </div>

          <div className="playground-layout">
            <div className="reveal">
              <p className="eyebrow">A SMALL DIGITAL STUDY</p>
              <h2>
                DESIGN IS
                <br />
                <em>NOT STATIC.</em>
              </h2>
              <p className="playground-copy">
                The best interfaces respond. This is where we test motion,
                depth, and the tiny moments that make a screen feel alive.
              </p>
            </div>

            <div className="reveal" data-reveal-delay="0.12">
              <Playground />
            </div>
          </div>
        </section>

        {/* ══ SERVICES ══════════════════════════════════════════ */}
        <section className="services-section section-shell" id="services">
          <div className="section-index">
            <span>05</span>
            <span>SERVICES</span>
          </div>

          <div className="services-heading reveal">
            <h2>
              WHAT WE
              <br />
              <em>MAKE.</em>
            </h2>
            <p data-reveal-delay="0.12">
              Selected capabilities for teams who care about how their
              digital work feels.
            </p>
          </div>

          <div className="services-list">
            {services.map((service, index) => (
              <a
                className="service-row reveal"
                data-reveal-delay={index * 0.06}
                href="#contact"
                key={service}
                aria-label={`Learn more about ${service}`}
              >
                <span>0{index + 1}</span>
                <h3>{service}</h3>
                <b aria-hidden="true">↗</b>
              </a>
            ))}
          </div>
        </section>

        {/* ══ TESTIMONIAL ═══════════════════════════════════════ */}
        <section
          className="testimonial-section section-shell"
          aria-label="Client testimonial"
        >
          <div className="section-index">
            <span>06</span>
            <span>NOTE FROM A COLLABORATOR</span>
          </div>

          <div className="testimonial-content reveal">
            <span className="quote-mark" aria-hidden="true">
              "
            </span>
            <blockquote>
              They brought structure to an idea that was still finding its
              shape. The final experience feels unmistakably ours.
            </blockquote>
            <div>
              <strong>Amulya</strong>
              <span>Creative Lead, India</span>
            </div>
          </div>
        </section>

        {/* ══ CONTACT CTA ═══════════════════════════════════════ */}
        <section className="closing-section" id="contact" aria-label="Contact">
          <div className="closing-orbit" aria-hidden="true" />
          <p>HAVE AN IDEA WORTH EXPLORING?</p>
          <h2>
            LET'S BUILD
            <br />
            <em>SOMETHING</em>
            <br />
            DIFFERENT.
          </h2>
          <Button
            href={`mailto:${siteConfig.email}`}
            primary
            data-cursor="OPEN"
          >
            START A CONVERSATION <span>↗</span>
          </Button>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-mark">
            ZENIT<sup>®</sup>
          </div>
          <p>
            Independent digital craft
            <br />
            for what comes next.
          </p>
        </div>

        <div className="footer-grid">
          <div>
            <span>INDEX</span>
            <a href="#top">HOME</a>
            <a href="#work">WORK</a>
            <a href="#about">ABOUT</a>
            <a href="#contact">CONTACT</a>
          </div>
          <div>
            <span>ELSEWHERE</span>
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              INSTAGRAM ↗
            </a>
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LINKEDIN ↗
            </a>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </div>
          <div className="footer-note">
            <span>BUILT WITH</span>
            <strong>REACT / GSAP</strong>
            <strong>AND A LOT OF CARE.</strong>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 ZENIT STUDIO</span>
          <span>NO TEMPLATE / JUST PRACTICE</span>
        </div>
      </footer>
    </>
  );
}
