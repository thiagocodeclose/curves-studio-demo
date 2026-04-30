// @ts-nocheck
'use client';
import { useEffect, useState } from 'react';
import { siteData } from '@/lib/site-data';

const css = `
  :root {
    --cv-bg: #FDF6F0;
    --cv-surface: #FFF8F4;
    --cv-card: #FFFFFF;
    --cv-primary: #E05C7A;
    --cv-coral: #FF8B70;
    --cv-accent: #F7C5D0;
    --cv-text: #2C1B1E;
    --cv-muted: #9B7B82;
    --cv-border: rgba(224,92,122,0.15);
    --font-display: var(--font-nunito), 'Nunito', sans-serif;
    --font-body: var(--font-nunito-sans), 'Nunito Sans', sans-serif;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: var(--font-body); background: var(--cv-bg); color: var(--cv-text); overflow-x: hidden; }

  /* NAV */
  .cv-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2.5rem; height: 68px;
    transition: background 0.3s, box-shadow 0.3s;
  }
  .cv-nav.scrolled { background: rgba(253,246,240,0.97); backdrop-filter: blur(12px); box-shadow: 0 1px 0 var(--cv-border); }
  .cv-logo { font-family: var(--font-display); font-size: 1.4rem; font-weight: 800; color: var(--cv-text); text-decoration: none; }
  .cv-logo span { color: var(--cv-primary); }
  .cv-nav-links { display: flex; gap: 2rem; list-style: none; }
  .cv-nav-links a { font-size: 0.8rem; font-weight: 600; letter-spacing: 0.04em; color: var(--cv-muted); text-decoration: none; transition: color 0.2s; }
  .cv-nav-links a:hover { color: var(--cv-primary); }
  .cv-nav-cta { background: var(--cv-primary); color: #fff; font-family: var(--font-display); font-size: 0.78rem; font-weight: 700; border: none; padding: 0.65rem 1.5rem; border-radius: 999px; cursor: pointer; transition: opacity 0.2s; }
  .cv-nav-cta:hover { opacity: 0.88; }

  /* HERO */
  .cv-hero { position: relative; min-height: 100vh; display: flex; align-items: center; overflow: hidden; }
  .cv-hero-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .cv-hero-overlay { position: absolute; inset: 0; background: linear-gradient(120deg, rgba(253,246,240,0.92) 0%, rgba(253,246,240,0.7) 50%, rgba(253,246,240,0.3) 100%); }
  .cv-hero-content { position: relative; z-index: 2; padding: 6rem 2.5rem 4rem; max-width: 680px; }
  .cv-hero-pill { display: inline-block; background: var(--cv-accent); color: var(--cv-primary); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; padding: 0.35rem 1rem; border-radius: 999px; margin-bottom: 1.5rem; }
  .cv-hero-title { font-family: var(--font-display); font-size: clamp(2.8rem, 8vw, 6.5rem); font-weight: 800; line-height: 1.0; color: var(--cv-text); margin-bottom: 1.5rem; }
  .cv-hero-title em { color: var(--cv-primary); font-style: normal; }
  .cv-hero-sub { font-size: 1.05rem; font-weight: 300; color: rgba(44,27,30,0.65); line-height: 1.75; max-width: 440px; margin-bottom: 2.5rem; }
  .cv-hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
  .cv-btn-primary { background: var(--cv-primary); color: #fff; font-family: var(--font-display); font-size: 0.88rem; font-weight: 700; border: none; padding: 1rem 2.5rem; border-radius: 999px; cursor: pointer; transition: opacity 0.2s; }
  .cv-btn-primary:hover { opacity: 0.88; }
  .cv-btn-ghost { background: transparent; color: var(--cv-text); font-family: var(--font-display); font-size: 0.88rem; font-weight: 600; border: 2px solid rgba(44,27,30,0.18); padding: 1rem 2rem; border-radius: 999px; cursor: pointer; transition: border-color 0.2s; }
  .cv-btn-ghost:hover { border-color: var(--cv-primary); color: var(--cv-primary); }

  /* STATS */
  .cv-stats { display: grid; grid-template-columns: repeat(4,1fr); background: var(--cv-primary); }
  .cv-stat { padding: 1.75rem 1.5rem; text-align: center; border-right: 1px solid rgba(255,255,255,0.15); }
  .cv-stat:last-child { border-right: none; }
  .cv-stat-value { font-family: var(--font-display); font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 800; color: #fff; }
  .cv-stat-label { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.65); margin-top: 0.2rem; }

  /* SECTION */
  .cv-section { padding: 5.5rem 2.5rem; max-width: 1200px; margin: 0 auto; }
  .cv-section-tinted { background: var(--cv-surface); padding: 5.5rem 0; }
  .cv-section-tinted-inner { max-width: 1200px; margin: 0 auto; padding: 0 2.5rem; }
  .cv-eyebrow { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--cv-primary); margin-bottom: 0.5rem; }
  .cv-heading { font-family: var(--font-display); font-size: clamp(2.2rem, 5.5vw, 4rem); font-weight: 800; color: var(--cv-text); line-height: 1.1; margin-bottom: 1rem; }
  .cv-heading em { color: var(--cv-primary); font-style: normal; }
  .cv-body { font-size: 0.95rem; font-weight: 300; color: rgba(44,27,30,0.55); line-height: 1.75; max-width: 500px; }

  /* CLASSES */
  .cv-classes { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; margin-top: 3rem; }
  .cv-class { background: var(--cv-card); border: 1px solid var(--cv-border); border-radius: 16px; padding: 2rem 1.75rem; transition: box-shadow 0.25s, transform 0.25s; }
  .cv-class:hover { box-shadow: 0 8px 32px rgba(224,92,122,0.12); transform: translateY(-3px); }
  .cv-class-icon { font-size: 1.75rem; margin-bottom: 1rem; }
  .cv-class-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem; }
  .cv-class-name { font-family: var(--font-display); font-size: 1.15rem; font-weight: 700; color: var(--cv-text); }
  .cv-class-badges { display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 0.75rem; }
  .cv-badge { font-size: 0.62rem; font-weight: 600; letter-spacing: 0.06em; background: var(--cv-accent); color: var(--cv-primary); padding: 0.2rem 0.65rem; border-radius: 999px; }
  .cv-class-desc { font-size: 0.85rem; font-weight: 300; color: rgba(44,27,30,0.5); line-height: 1.65; }

  /* COMMUNITY */
  .cv-community { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; margin-top: 3rem; }
  .cv-comm-card { border: 1px solid var(--cv-border); border-radius: 12px; padding: 2rem; text-align: center; }
  .cv-comm-icon { font-size: 2rem; margin-bottom: 0.75rem; }
  .cv-comm-label { font-family: var(--font-display); font-size: 1rem; font-weight: 700; color: var(--cv-text); margin-bottom: 0.4rem; }
  .cv-comm-desc { font-size: 0.82rem; font-weight: 300; color: rgba(44,27,30,0.5); line-height: 1.6; }

  /* PRICING */
  .cv-pricing { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 3rem; }
  .cv-plan { border: 2px solid var(--cv-border); border-radius: 16px; padding: 2.5rem 2rem; position: relative; }
  .cv-plan.featured { border-color: var(--cv-primary); }
  .cv-plan-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--cv-primary); color: #fff; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.1em; padding: 0.3rem 1rem; border-radius: 999px; white-space: nowrap; }
  .cv-plan-name { font-family: var(--font-display); font-size: 1.3rem; font-weight: 800; color: var(--cv-text); margin-bottom: 0.75rem; text-align: center; margin-top: 0.5rem; }
  .cv-plan-price { font-family: var(--font-display); font-size: 3.5rem; font-weight: 800; color: var(--cv-primary); text-align: center; line-height: 1; }
  .cv-plan-period { font-size: 0.75rem; font-weight: 400; color: var(--cv-muted); text-align: center; margin-bottom: 2rem; }
  .cv-plan-features { list-style: none; display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 2rem; }
  .cv-plan-features li { font-size: 0.88rem; font-weight: 400; color: rgba(44,27,30,0.6); display: flex; gap: 0.6rem; align-items: flex-start; }
  .cv-plan-features li::before { content: '♥'; color: var(--cv-primary); font-size: 0.65rem; margin-top: 0.3rem; flex-shrink: 0; }
  .cv-btn-plan { width: 100%; background: transparent; color: var(--cv-primary); font-family: var(--font-display); font-size: 0.82rem; font-weight: 700; border: 2px solid var(--cv-primary); padding: 0.85rem; border-radius: 999px; cursor: pointer; transition: background 0.2s, color 0.2s; }
  .cv-btn-plan:hover, .cv-btn-plan.solid { background: var(--cv-primary); color: #fff; }

  /* CTA */
  .cv-cta { background: linear-gradient(135deg, var(--cv-primary) 0%, var(--cv-coral) 100%); padding: 6rem 2.5rem; text-align: center; }
  .cv-cta-title { font-family: var(--font-display); font-size: clamp(2.5rem, 7vw, 5.5rem); font-weight: 800; color: #fff; line-height: 1.05; margin-bottom: 1.25rem; }
  .cv-cta-sub { font-size: 1.05rem; font-weight: 300; color: rgba(255,255,255,0.8); margin-bottom: 2.75rem; }
  .cv-btn-white { background: #fff; color: var(--cv-primary); font-family: var(--font-display); font-size: 0.88rem; font-weight: 700; border: none; padding: 1.1rem 3rem; border-radius: 999px; cursor: pointer; transition: opacity 0.2s; }
  .cv-btn-white:hover { opacity: 0.9; }

  /* FOOTER */
  .cv-footer { background: var(--cv-text); padding: 3rem 2.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem; }
  .cv-footer-logo { font-family: var(--font-display); font-size: 1.25rem; font-weight: 800; color: #fff; }
  .cv-footer-logo span { color: var(--cv-accent); }
  .cv-footer-info { font-size: 0.75rem; font-weight: 300; color: rgba(255,255,255,0.45); line-height: 1.7; margin-top: 0.35rem; }
  .cv-footer-copy { font-size: 0.7rem; color: rgba(255,255,255,0.2); }

  .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.65s ease, transform 0.65s ease; }
  .reveal.visible { opacity: 1; transform: none; }

  @media (max-width: 768px) {
    .cv-nav-links { display: none; }
    .cv-stats { grid-template-columns: repeat(2,1fr); }
    .cv-community { grid-template-columns: 1fr; }
    .cv-footer { flex-direction: column; text-align: center; }
  }
`;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((e) => {
      e.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('visible'); io.unobserve(x.target); } });
    }, { threshold: 0.1 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function CurvesPage() {
  const [scrolled, setScrolled] = useState(false);
  useReveal();
  const d = siteData;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <style>{css}</style>

      <nav className={`cv-nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="cv-logo">Curves<span>&</span>Co</a>
        <ul className="cv-nav-links">
          <li><a href="#classes">Classes</a></li>
          <li><a href="#community">Community</a></li>
          <li><a href="#pricing">Pricing</a></li>
        </ul>
        <button className="cv-nav-cta">Join the Movement</button>
      </nav>

      {/* HERO — video */}
      <section className="cv-hero">
        <video className="cv-hero-video" autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80">
          <source src="https://www.pexels.com/download/video/3769120/?fps=25.0&h=1080&w=1920" type="video/mp4" />
        </video>
        <div className="cv-hero-overlay" />
        <div className="cv-hero-content">
          <div className="cv-hero-pill">Nashville's #1 Women's Studio</div>
          <h1 className="cv-hero-title">Strong is<br />the new<br /><em>beautiful.</em></h1>
          <p className="cv-hero-sub">A fitness community built for every body. HIIT, strength, dance, and more — in a space where you'll feel celebrated, not judged.</p>
          <div className="cv-hero-actions">
            <button className="cv-btn-primary">Start Free Week</button>
            <button className="cv-btn-ghost">See All Classes</button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="cv-stats">
        {d.stats.map((s) => (
          <div key={s.label} className="cv-stat">
            <div className="cv-stat-value">{s.value}</div>
            <div className="cv-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* CLASSES */}
      <section className="cv-section" id="classes">
        <p className="cv-eyebrow reveal">What We Offer</p>
        <h2 className="cv-heading reveal" style={{ transitionDelay: '0.1s' }}>Find your<br /><em>favorite class.</em></h2>
        <p className="cv-body reveal" style={{ transitionDelay: '0.2s' }}>Six formats, one studio — every class is designed to challenge you, delight you, and keep you coming back.</p>
        <div className="cv-classes">
          {d.classes.map((c, i) => (
            <div key={c.name} className="cv-class reveal" style={{ transitionDelay: `${0.07 * i}s` }}>
              <div className="cv-class-icon">{c.icon}</div>
              <div className="cv-class-header">
                <span className="cv-class-name">{c.name}</span>
              </div>
              <div className="cv-class-badges">
                <span className="cv-badge">{c.duration}</span>
                <span className="cv-badge">{c.level}</span>
              </div>
              <p className="cv-class-desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMMUNITY */}
      <div className="cv-section-tinted" id="community">
        <div className="cv-section-tinted-inner">
          <p className="cv-eyebrow reveal">More Than a Gym</p>
          <h2 className="cv-heading reveal" style={{ transitionDelay: '0.1s' }}>A real<br /><em>community.</em></h2>
          <p className="cv-body reveal" style={{ transitionDelay: '0.2s' }}>Membership is more than classes. It's being part of a group that shows up for each other — every single week.</p>
          <div className="cv-community">
            {d.community.map((c, i) => (
              <div key={c.label} className="cv-comm-card reveal" style={{ transitionDelay: `${0.1 * i}s` }}>
                <div className="cv-comm-icon">{c.icon}</div>
                <div className="cv-comm-label">{c.label}</div>
                <div className="cv-comm-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PRICING */}
      <section className="cv-section" id="pricing">
        <p className="cv-eyebrow reveal">Pricing</p>
        <h2 className="cv-heading reveal" style={{ transitionDelay: '0.1s' }}>Flexible plans,<br /><em>real results.</em></h2>
        <div className="cv-pricing">
          {d.pricing.map((p, i) => (
            <div key={p.name} className={`cv-plan reveal ${p.highlight ? 'featured' : ''}`} style={{ transitionDelay: `${0.1 * i}s` }}>
              {p.highlight && <div className="cv-plan-badge">Most Popular</div>}
              <div className="cv-plan-name">{p.name}</div>
              <div className="cv-plan-price">{p.price}</div>
              <div className="cv-plan-period">{p.period}</div>
              <ul className="cv-plan-features">
                {p.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <button className={`cv-btn-plan ${p.highlight ? 'solid' : ''}`}>Get Started</button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="cv-cta">
        <h2 className="cv-cta-title">Your first week.<br />On us.</h2>
        <p className="cv-cta-sub">Come try any class — zero pressure, zero commitment. Just show up.</p>
        <button className="cv-btn-white">Claim Free Week →</button>
      </div>

      {/* FOOTER */}
      <footer className="cv-footer">
        <div>
          <div className="cv-footer-logo">Curves<span>&</span>Co</div>
          <div className="cv-footer-info">{d.gym.address}<br />{d.gym.phone} · {d.gym.email}</div>
        </div>
        <div className="cv-footer-copy">© {new Date().getFullYear()} {d.gym.name}. Powered by Koriva.</div>
      </footer>
    </>
  );
}
