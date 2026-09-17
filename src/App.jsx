import { useEffect, useState } from "react";
import { motion as Motion, useReducedMotion } from "motion/react";
import "./App.css";
import PortfolioHero from "./components/PortfolioHero";
import { LinkPreview } from "./components/LinkPreview";
import { copy, projects, links } from "./data/content";
function Reveal({ children, className = "" }) {
  const reduced = useReducedMotion();
  return (
    <Motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Motion.div>
  );
}
function ClosingArtwork() {
  const reduced = useReducedMotion();
  return (
    <div className="closing-art" aria-hidden="true">
      <Motion.img
        className="closing-knight"
        src="/images/knight-art.png"
        alt=""
        width="941"
        height="1672"
        loading="lazy"
        initial={reduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
export default function App() {
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem("pedro-language") === "en" ? "en" : "pt";
    } catch {
      return "pt";
    }
  });
  const t = copy[language];
  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
    document.title =
      language === "pt"
        ? "Pedro Samuel | Desenvolvedor Fullstack"
        : "Pedro Samuel | Fullstack Developer";
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.summary);
    try {
      localStorage.setItem("pedro-language", language);
    } catch {
      /* Preference storage is optional. */
    }
  }, [language, t.summary]);
  return (
    <>
      <a className="skip-link" href="#work">
        {t.skip}
      </a>
      <main className="portfolio">
        <PortfolioHero t={t} language={language} onLanguage={setLanguage} />
        <section className="work-section narrow" id="work">
          <Reveal>
            <p className="eyebrow">
              {language === "pt" ? "ALGUMAS COISAS QUE EU CONSTRUO" : "A FEW THINGS I BUILD"}
            </p>
            <h2>{language === "pt" ? "Projetos Open-Sources" : "Open-Source Projects"}</h2>
          </Reveal>
          <div className="project-list">
            {projects.map((project, index) => (
              <Reveal key={project.slug}>
                <a
                  className="project-row"
                  href={`https://github.com/PsSave/${project.slug}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="project-number">0{index + 1}</span>
                  <div>
                    <h3>{project.name}</h3>
                    <p>{project.short[language === "pt" ? 0 : 1]}</p>
                    <small>{project.tags.join(" · ")}</small>
                  </div>
                  <span aria-hidden="true">↗</span>
                </a>
              </Reveal>
            ))}
          </div>
          <a className="quiet-link" href={links.github} target="_blank" rel="noreferrer">
            {t.all} ↗
          </a>
        </section>
        <section className="about-section narrow" id="about">
          <Reveal>
            <p className="eyebrow">
              {language === "pt" ? "UM POUCO SOBRE MIM" : "A LITTLE ABOUT ME"}
            </p>
            <h2>
              <LinkPreview url={links.linkedin} imageSrc="/profile_img.jpg" isStatic className="font-bold italic">
                Pedro Samuel
              </LinkPreview>
              <span className="red-star">✽</span>
            </h2>
            <p>
              {language === "pt"
                ? "Desenvolvedor fullstack em Bauru. Gosto de criar coisas úteis e cuidar dos detalhes."
                : "Fullstack developer in Bauru. I like building useful things and caring about the details."}
            </p>
            <p>
              {language === "pt" ? "Hoje, na" : "Currently at"}{" "}
              <LinkPreview url={links.gravta} imageSrc="/images/gravta.png" isStatic className="font-bold italic">
                Gravta ↗
              </LinkPreview>
              .<br />
              {language === "pt" ? "Depois do código," : "After coding,"}{" "}
              <LinkPreview url={links.office} imageSrc="/images/the-office.jpg" isStatic className="font-bold italic">
                The Office
              </LinkPreview>
              .
            </p>
            <div className="small-stack">
              React · TypeScript · Node.js
              <br />
              Python · Java · React Native
            </div>
          </Reveal>
        </section>
        <section className="contact-section" id="contact">
          <ClosingArtwork />
          <div className="contact-main narrow">
            <Reveal>
              <h2>{language === "pt" ? "Tem uma ideia?" : "Have an idea?"}</h2>
              <a className="pill" href={links.email}>
                <span>{t.email}</span>
                <span className="button-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </Reveal>
            <div className="closing-breath" aria-hidden="true" />
            <div className="social-links">
              {["linkedin", "github", "instagram"].map((key) => (
                <a key={key} href={links[key]} target="_blank" rel="noreferrer">
                  {key === "linkedin" ? "LinkedIn" : key === "github" ? "GitHub" : "Instagram"} ↗
                </a>
              ))}
            </div>
            <a className="email-address" href={links.email}>
              pedrosviki1265@gmail.com
            </a>
            <footer>
              <span>Pedro Samuel</span>
              <a href="#home">{t.back} ↑</a>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}
