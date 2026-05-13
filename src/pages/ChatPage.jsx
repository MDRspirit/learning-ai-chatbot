import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Send, 
  Brain, 
  Trash2, 
  BookOpen, 
  Award, 
  Zap, 
  ChevronLeft,
  User,
  Bot,
  Loader2
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { chatWithAI } from '../services/geminiService';
import './ChatPage.css';

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('mdr_chat_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('EXPLAIN');
  const [subject, setSubject] = useState('General Studies');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    localStorage.setItem('mdr_chat_history', JSON.stringify(messages));
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithAI(newMessages, mode, subject);
      setMessages([...newMessages, { role: 'bot', content: response }]);
    } catch (error) {
      setMessages([...newMessages, { role: 'bot', content: "I'm sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear your study session?')) {
      setMessages([]);
      localStorage.removeItem('mdr_chat_history');
    }
  };

  return (
    <div className="chat-container">
      {/* Sidebar */}
      <aside className="chat-sidebar glass">
        <div className="sidebar-header" onClick={() => navigate('/')}>
          <Brain className="logo-icon" />
          <span>MDRLearning</span>
        </div>

        <div className="sidebar-content">
          <div className="sidebar-group">
            <label>Current Subject</label>
            <select 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)}
              className="glass-input"
            >
              <option>General Studies</option>
              <option>Computer Science</option>
              <option>Physics</option>
              <option>Mathematics</option>
              <option>Biology</option>
              <option>Economics</option>
            </select>
          </div>

          <div className="sidebar-group">
            <label>Learning Mode</label>
            <div className="mode-selector">
              <button 
                className={`mode-btn ${mode === 'EXPLAIN' ? 'active' : ''}`}
                onClick={() => setMode('EXPLAIN')}
              >
                <BookOpen size={18} /> Explain
              </button>
              <button 
                className={`mode-btn ${mode === 'QUIZ' ? 'active' : ''}`}
                onClick={() => setMode('QUIZ')}
              >
                <Award size={18} /> Quiz
              </button>
              <button 
                className={`mode-btn ${mode === 'SUMMARY' ? 'active' : ''}`}
                onClick={() => setMode('SUMMARY')}
              >
                <Zap size={18} /> Summary
              </button>
            </div>
          </div>
        </div>

        <button className="clear-btn" onClick={clearHistory}>
          <Trash2 size={18} /> Clear Session
        </button>
      </aside>

      {/* Main Chat Area */}
      <main className="chat-main">
        <header className="chat-header glass">
          <div className="header-info">
            <button className="back-btn" onClick={() => navigate('/')}>
              <ChevronLeft size={24} />
            </button>
            <div>
              <h2>{mode.charAt(0) + mode.slice(1).toLowerCase()} Mode</h2>
              <p>{subject}</p>
            </div>
          </div>
        </header>

        <div className="messages-area">
          {messages.length === 0 ? (
            <div className="welcome-screen">
              <div className="welcome-icon">
                <Brain size={48} />
              </div>
              <h3>Ready to study?</h3>
              <p>Choose a mode and subject on the left, then ask me anything!</p>
              <div className="suggestions">
                <button onClick={() => setInput("Explain the theory of relativity")}>Explain Relativity</button>
                <button onClick={() => setInput("Give me a quiz on basic Python")}>Python Quiz</button>
                <button onClick={() => setInput("Summarize the causes of World War I")}>WWI Summary</button>
              </div>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`message-wrapper ${msg.role}`}>
                <div className="avatar">
                  {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className="message-bubble glass">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="message-wrapper bot">
              <div className="avatar">
                <Bot size={20} />
              </div>
              <div className="message-bubble glass loading">
                <Loader2 className="spinner" size={20} />
                <span>Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <footer className="chat-input-area">
          <form onSubmit={handleSend} className="input-container glass">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask your ${mode.toLowerCase()} tutor something...`}
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !input.trim()}>
              <Send size={20} />
            </button>
          </form>
        </footer>
      </main>
    </div>
  );
};

export default ChatPage;
