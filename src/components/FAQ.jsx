import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { locales } from '../locales';
import './FAQ.css';

export default function FAQ() {
  const { lang } = useLanguage();
  const t = locales[lang].faq;
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq">
      <div className="container">
        <h2 className="section-title text-gradient">{t.title}</h2>
        <div className="faq-list">
          {t.items.map((item, index) => (
            <div key={index} className={`faq-item glass-panel ${activeIndex === index ? 'active' : ''}`} onClick={() => toggleFAQ(index)}>
              <div className="faq-question">
                <span>{item.q}</span>
                {activeIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              {activeIndex === index && (
                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
