import React from 'react';
import Modal from './Modal';
import { useLanguage } from '../LanguageContext';
import { locales } from '../locales';
import { useNavigate } from 'react-router-dom';

export default function AuthModals({ isOpen, onClose, type, onSwitch }) {
  const { lang } = useLanguage();
  const t = locales[lang].auth[type];
  const navigate = useNavigate();

  if (!t) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    navigate('/dashboard');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t.title}>
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>{t.subtitle}</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {type === 'register' && (
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>{t.name}</label>
            <input type="text" required className="chatbot-input" style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--border-glass)', padding: '12px', borderRadius: '8px', color: 'white' }} />
          </div>
        )}
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>{t.email}</label>
          <input type="email" required className="chatbot-input" style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--border-glass)', padding: '12px', borderRadius: '8px', color: 'white' }} />
        </div>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>{t.pass}</label>
          <input type="password" required className="chatbot-input" style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--border-glass)', padding: '12px', borderRadius: '8px', color: 'white' }} />
        </div>
        <button type="submit" className="btn-primary" style={{ marginTop: '12px', width: '100%', justifyContent: 'center' }}>
          {t.btn}
        </button>
      </form>
      <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.9rem' }}>
        <span style={{ color: 'var(--text-muted)' }}>{type === 'login' ? t.noAccount : t.hasAccount} </span>
        <button onClick={onSwitch} style={{ background: 'transparent', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', fontWeight: '600' }}>
          {t.action}
        </button>
      </div>
    </Modal>
  );
}
