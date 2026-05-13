import React from 'react';
import { Code2, Globe, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useTheme } from '../ThemeContext';
import { locales } from '../locales';
import './Header.css';

export default function Header({ onLogin, onApply }) {
  const { lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = locales[lang].header;

  return (
    <header className="header glass-nav">
      <div className="container header-container">
        <div className="logo-section">
          <Code2 className="logo-icon text-gradient" size={32} />
          <span className="logo-text">MDR<span className="text-gradient">Camp</span></span>
        </div>
        <nav className="nav-links">
          <a href="#programs">{t.programs}</a>
          <a href="#testimonials">{t.testimonials}</a>
          <a href="#faq">{t.faq}</a>
        </nav>
        <div className="header-actions">
          <button className="btn-secondary" onClick={toggleTheme} style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Toggle Theme">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button className="btn-secondary" onClick={toggleLang} style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={18} />
            {lang.toUpperCase()}
          </button>
          <button className="btn-secondary" onClick={onLogin}>{t.login}</button>
          <button className="btn-primary" onClick={onApply}>{t.apply}</button>
        </div>
      </div>
    </header>
  );
}
