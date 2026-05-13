import React from 'react';
import { useLanguage } from '../LanguageContext';
import { locales } from '../locales';
import './Testimonials.css';

export default function Testimonials() {
  const { lang } = useLanguage();
  const t = locales[lang].testimonials;

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <h2 className="section-title text-gradient">{t.title}</h2>
        <div className="testimonials-grid">
          {t.items.map((item, index) => (
            <div key={index} className="testimonial-card glass-panel">
              <p className="testimonial-text">"{item.text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  {item.name.charAt(0)}
                </div>
                <div className="author-info">
                  <h4 className="author-name">{item.name}</h4>
                  <p className="author-role">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
