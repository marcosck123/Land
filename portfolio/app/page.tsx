"use client";

import styles from "./page.module.css";

const techs = [
  { icon: "🌐", name: "HTML" },
  { icon: "🎨", name: "CSS" },
  { icon: "⚡", name: "JS" },
  { icon: "☕", name: "Java" },
  { icon: "🐍", name: "Python" },
  { icon: "⚛", name: "React" },
  { icon: "▲", name: "Next.js" },
];

const projects = [
  {
    tag: "Em construção",
    name: "Portfolio Website",
    desc: "Site pessoal com projetos e trajetória. Design responsivo com Next.js e Tailwind.",
    langs: ["Next.js", "Tailwind"],
  },
  {
    tag: "Em construção",
    name: "Task Manager App",
    desc: "Gerenciador de tarefas com React, foco em UX limpa e organização intuitiva.",
    langs: ["React", "CSS"],
  },
  {
    tag: "Em construção",
    name: "Python Automations",
    desc: "Scripts de automação e estudos de algoritmos e estruturas de dados.",
    langs: ["Python"],
  },
  {
    tag: "Em construção",
    name: "Landing Page UI",
    desc: "Landing page responsiva com foco em design e micro-interações em JS puro.",
    langs: ["HTML", "CSS", "JS"],
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      {/* NAV */}
      <nav className={styles.nav}>
        <span className={styles.navName}>Marcos Langner</span>
        <div className={styles.navLinks}>
          <a href="#stack">Stack</a>
          <a href="#sobre">Sobre</a>
          <a href="#projetos">Projetos</a>
          <a href="https://github.com/marcosck123" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </nav>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.eyebrow}>Desenvolvedor Full Stack</div>
          <h1 className={styles.heroTitle}>
            Marcos<br /><em>Eduardo</em><br />Langner
          </h1>
          <p className={styles.heroDesc}>
            Iniciante com paixão genuína por construir interfaces e sistemas. Cada linha de código é um passo rumo ao próximo nível.
          </p>
        </div>
        <div className={styles.heroRight}>
          <div className={styles.statusPill}>
            <span className={styles.statusDot} />
            Disponível para oportunidades
          </div>
          <p className={styles.heroQuote}>
            &ldquo;Sou iniciante na programação, buscando minha oportunidade como dev.&rdquo;
          </p>
          <a
            className={styles.githubBtn}
            href="https://github.com/marcosck123"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            github.com/marcosck123
          </a>
        </div>
      </section>

      <div className={styles.divider} />

      {/* STACK */}
      <section className={styles.stackSection} id="stack">
        <div className={styles.sectionLabel}>Stack &amp; tecnologias</div>
        <div className={styles.stackGrid}>
          {techs.map((t) => (
            <div key={t.name} className={styles.techCard}>
              <span className={styles.techIcon}>{t.icon}</span>
              <span className={styles.techName}>{t.name}</span>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.divider} />

      {/* ABOUT */}
      <section className={styles.aboutSection} id="sobre">
        <div>
          <h2 className={styles.aboutTitle}>
            Uma jornada que está<br /><em>apenas começando</em>
          </h2>
          <p className={styles.aboutText}>
            Meu nome é Marcos Eduardo Matias Langner, de Vilhena, Rondônia. Estou construindo minha base como desenvolvedor Full Stack, estudando as principais tecnologias do mercado com dedicação e consistência.
          </p>
          <p className={styles.aboutText}>
            Acredito que o início de uma carreira em tecnologia é sobre curiosidade, persistência e a disposição de aprender todos os dias — e é exatamente isso que me move.
          </p>
          <a
            className={styles.ctaGhost}
            href="https://github.com/marcosck123"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver GitHub →
          </a>
        </div>
        <div className={styles.aboutRight}>
          {[
            { num: "7", label: "tecnologias em estudo" },
            { num: "∞", label: "disposição para aprender" },
            { num: "100%", label: "open to work" },
          ].map((f) => (
            <div key={f.label} className={styles.factItem}>
              <div className={styles.factNum}>{f.num}</div>
              <div className={styles.factLabel}>{f.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.divider} />

      {/* PROJECTS */}
      <section className={styles.projectsSection} id="projetos">
        <div className={styles.sectionLabel}>Próximos projetos</div>
        <div className={styles.projectGrid}>
          {projects.map((p) => (
            <a
              key={p.name}
              className={styles.projectCard}
              href="https://github.com/marcosck123"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.projectTag}>{p.tag}</div>
              <div className={styles.projectName}>{p.name}</div>
              <div className={styles.projectDesc}>{p.desc}</div>
              <div className={styles.projectLangs}>
                {p.langs.map((l) => (
                  <span key={l} className={styles.langTag}>{l}</span>
                ))}
              </div>
              <span className={styles.projectArrow}>→</span>
            </a>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className={styles.contactSection}>
        <div>
          <div className={styles.contactTitle}>Vamos conversar?</div>
          <div className={styles.contactSub}>Aberto a oportunidades, freelas e colaborações</div>
        </div>
        <div className={styles.contactBtns}>
          <a className={styles.btnOutline} href="https://github.com/marcosck123" target="_blank" rel="noopener noreferrer">
            Ver GitHub
          </a>
          <a className={styles.btnOutline} href="mailto:?subject=Oportunidade%20para%20Marcos%20Langner">
            Entrar em contato
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <span className={styles.footerCopy}>© 2025 Marcos Langner</span>
        <span className={styles.footerLoc}>Vilhena, Rondônia — Brasil</span>
      </footer>
    </div>
  );
}
