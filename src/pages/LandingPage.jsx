import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Zap, Brain, MessageSquare, ChevronRight, Award } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <nav className="navbar glass">
        <div className="logo">
          <Brain className="logo-icon" />
          <span>MDRLearning</span>
        </div>
        <button className="btn-primary" onClick={() => navigate('/chat')}>Get Started</button>
      </nav>

      <main className="hero-section">
        <div className="hero-content fade-in">
          <div className="badge glass">AI-Powered Study Assistant</div>
          <h1 className="gradient-text">Master Any Subject with Your AI Tutor</h1>
          <p className="hero-description">
            Experience a personalized learning journey. Whether you need complex concepts explained, 
            interactive quizzes, or quick summaries, MDRLearning is your 24/7 academic companion.
          </p>
          <div className="hero-actions">
            <button className="btn-primary large" onClick={() => navigate('/chat')}>
              Start Learning Now <ChevronRight size={20} />
            </button>
            <button className="btn-secondary glass">View Features</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-card glass fade-in">
            <div className="visual-header">
              <div className="dot red"></div>
              <div className="dot yellow"></div>
              <div className="dot green"></div>
            </div>
            <div className="visual-body">
              <div className="chat-bubble bot">Hello! I'm your AI Tutor. What are we studying today?</div>
              <div className="chat-bubble user">Can you explain Quantum Physics like I'm 10?</div>
              <div className="chat-bubble bot">Imagine the world is made of tiny LEGO bricks that can be in two places at once...</div>
            </div>
          </div>
        </div>
      </main>

      <section className="features-section">
        <div className="section-header">
          <h2>Everything you need to excel</h2>
          <p>Tailored modes designed for different learning styles.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card glass">
            <div className="feature-icon-wrapper p-explain">
              <MessageSquare className="feature-icon" />
            </div>
            <h3>Explain Mode</h3>
            <p>Get clear, intuitive explanations for even the most complex academic topics.</p>
          </div>
          <div className="feature-card glass">
            <div className="feature-icon-wrapper p-quiz">
              <Award className="feature-icon" />
            </div>
            <h3>Quiz Mode</h3>
            <p>Test your knowledge with AI-generated questions and get instant feedback.</p>
          </div>
          <div className="feature-card glass">
            <div className="feature-icon-wrapper p-summary">
              <Zap className="feature-icon" />
            </div>
            <h3>Summary Mode</h3>
            <p>Turn long lectures or textbooks into concise, structured study notes.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2026 MDRLearning. Empowering students with AI.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
