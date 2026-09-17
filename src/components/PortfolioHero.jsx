import { useEffect, useRef } from "react";
import LetterSwapForward from "./LetterSwapForward";

function PixelEntrance() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const width = 440, height = 540, size = 5;
    canvas.width = width; canvas.height = height;
    // Fixed grid, varied timing: the pixels assemble without drifting off-grid.
    const cells = [];
    for (let y = 0; y < height; y += size) {
      for (let x = 0; x < width; x += size) {
        const noise = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
        cells.push({ x, y, at: 100 + (y / height) * 650 + (noise - Math.floor(noise)) * 650 });
      }
    }
    let frame, start;
    canvas.style.display = "block";
    const draw = (now) => {
      start ??= now;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#101312";
      cells.forEach(({ x, y, at }) => { if (now - start < at) ctx.fillRect(x, y, size, size); });
      if (now - start < 1450) frame = requestAnimationFrame(draw);
      else canvas.style.display = "none";
    };
    frame = requestAnimationFrame(draw);
    const stop = () => { if (preference.matches) { cancelAnimationFrame(frame); canvas.style.display = "none"; } };
    preference.addEventListener("change", stop);
    return () => { cancelAnimationFrame(frame); preference.removeEventListener("change", stop); };
  }, []);
  return <canvas className="pixel-entrance" ref={ref} aria-hidden="true" />;
}

export default function PortfolioHero({ t, language, onLanguage }) {
  const pt = language === "pt";
  return (
    <section className="portfolio-hero pixel-hero" id="home">
      <div className="intro-card pixel-card">
        <PixelEntrance />
        <header className="card-header">
          <a className="identity" href="#home" aria-label="Pedro Samuel">
            <img src="/Logo.png" alt="" />
            <span>pedro samuel.</span>
          </a>
          <div className="language-switch" role="group" aria-label={pt ? "Idioma" : "Language"}>
            {["pt", "en"].map((lang) => (
              <button key={lang} type="button" lang={lang === "pt" ? "pt-BR" : "en"}
                aria-pressed={language === lang} onClick={() => onLanguage(lang)}>
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </header>
        <div className="pull-card-body">
          <span className="card-star" aria-hidden="true">✽</span>
          <h1 className="welcome-title">
            <span>{pt ? "Bem-vindo" : "Welcome"}</span>
            <span>{pt ? "ao meu" : "to my"}</span>
            <LetterSwapForward key={language} label={pt ? "Portfólio" : "Portfolio"} />
          </h1>
          <p className="card-role">
            {pt ? "FRONT-END · BACK-END · UM POUCO DE MIM" : "FRONT-END · BACK-END · A LITTLE ABOUT ME"}
          </p>
        </div>
      </div>
      <nav className="pixel-nav" aria-label={pt ? "Navegação principal" : "Main navigation"}>
        {["work", "about", "contact"].map((id, i) => <a key={id} href={`#${id}`}><span className="nav-index" aria-hidden="true">0{i + 1}</span><span>{t.nav[i]}</span><span className="nav-direction" aria-hidden="true">↓</span></a>)}
      </nav>

    </section>
  );
}
