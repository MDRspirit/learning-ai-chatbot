import React from 'react';
import Modal from './Modal';
import { useLanguage } from '../LanguageContext';
import { locales } from '../locales';
import { CheckCircle2 } from 'lucide-react';

export default function CurriculumModal({ isOpen, onClose, programId }) {
  const { lang } = useLanguage();
  const t = locales[lang].programs;

  const program = t[programId === 'fullstack' ? 'p1' : programId === 'data-eng' ? 'p2' : 'p3'];

  if (!program) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={program.title}>
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>{program.desc}</p>
      <h4 style={{ marginBottom: '16px', color: 'var(--text-main)' }}>Syllabus:</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {program.curriculum.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <CheckCircle2 size={18} className="text-gradient" />
            <span>{item}</span>
          </div>
        ))}
      </div>
      <button className="btn-primary" style={{ marginTop: '32px', width: '100%', justifyContent: 'center' }}>
        Enroll in this Program
      </button>
    </Modal>
  );
}
