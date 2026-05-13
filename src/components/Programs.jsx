import React from 'react';
import { Terminal, Database, Palette } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { locales } from '../locales';
import './Programs.css';

export default function Programs({ onOpenCurriculum }) {
  const { lang } = useLanguage();
  const t = locales[lang].programs;

  const programsData = [
    {
      id: 'fullstack',
      title: t.p1.title,
      description: t.p1.desc,
      icon: <Terminal size={32} className="text-gradient" />,
      color: 'cyan'
    },
    {
      id: 'data-eng',
      title: t.p2.title,
      description: t.p2.desc,
      icon: <Database size={32} className="text-gradient" />,
      color: 'purple'
    },
    {
      id: 'ui-ux',
      title: t.p3.title,
      description: t.p3.desc,
      icon: <Palette size={32} className="text-gradient" />,
      color: 'pink'
    }
  ];

  return (
    <section id="programs" className="programs">
      <div className="container">
        <div className="programs-header">
          <h2 className="programs-title text-gradient">{t.title}</h2>
          <p className="programs-subtitle">{t.subtitle}</p>
        </div>
        
        <div className="programs-grid">
          {programsData.map((program) => (
            <div key={program.id} className="program-card glass-panel">
              <div className="program-icon-wrapper">
                {program.icon}
              </div>
              <h3 className="program-card-title">{program.title}</h3>
              <p className="program-card-desc">{program.description}</p>
              <button className="btn-secondary program-btn" onClick={() => onOpenCurriculum(program.id)}>{t.btn}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
