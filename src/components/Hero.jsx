import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { locales } from '../locales';
import './Hero.css';

export default function Hero() {
  const { lang } = useLanguage();
  const t = locales[lang].hero;

  return (
    <section className="hero">
      <div className="bg-blob blob-cyan"></div>
      <div className="bg-blob blob-purple"></div>
      
      <div className="container hero-container">
        <div className="hero-badge animate-float">
          <Sparkles size={16} className="text-gradient" />
          <span>{t.badge}</span>
        </div>
        
        <h1 className="hero-title">
          {t.title1} <br />
          <span className="text-gradient">{t.title2}</span>
        </h1>
        
        <p className="hero-subtitle">
          {t.subtitle}
        </p>
        
        <div className="hero-actions">
          <a href="#programs" className="btn-primary">
            {t.explore} <ArrowRight size={20} />
          </a>
          <button className="btn-secondary" onClick={() => document.getElementById('chatbot-toggle')?.click()}>
            {t.talk}
          </button>
        </div>
        
        <div className="hero-stats glass-panel">
          <div className="stat">
            <span className="stat-number">98%</span>
            <span className="stat-label">{t.stat1}</span>
          </div>
          <div className="stat">
            <span className="stat-number">5k+</span>
            <span className="stat-label">{t.stat2}</span>
          </div>
          <div className="stat">
            <span className="stat-number">3</span>
            <span className="stat-label">{t.stat3}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
