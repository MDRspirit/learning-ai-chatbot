import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '../LanguageContext';
import { locales } from '../locales';
import './Chatbot.css';

export default function Chatbot() {
  const { lang } = useLanguage();
  const t = locales[lang].chatbot;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Set initial greeting based on language
  useEffect(() => {
    setMessages([{ id: 1, text: t.greeting, sender: "ai" }]);
  }, [lang, t.greeting]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMsg = { id: Date.now(), text: inputValue, sender: "user" };
    setMessages((prev) => [...prev, newUserMsg]);
    const currentInput = inputValue;
    setInputValue("");
    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        setTimeout(() => {
          setMessages((prev) => [...prev, { 
            id: Date.now() + 1, 
            text: t.apiKeyMissing, 
            sender: "ai" 
          }]);
          setIsTyping(false);
        }, 1000);
        return;
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const modelsToTry = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-flash-latest"];
      let responseText = "";
      let lastError = null;

      for (const modelName of modelsToTry) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName });
          const prompt = `${t.prompt} ${currentInput}`;
          const result = await model.generateContent(prompt);
          responseText = result.response.text();
          if (responseText) break; // Success!
        } catch (err) {
          console.warn(`Model ${modelName} failed, trying next...`, err);
          lastError = err;
          // Continue to next model if it's a 503/server error
          continue;
        }
      }

      if (responseText) {
        setMessages((prev) => [...prev, { id: Date.now() + 1, text: responseText, sender: "ai" }]);
      } else {
        throw lastError || new Error("All models failed");
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages((prev) => [...prev, { id: Date.now() + 1, text: t.error, sender: "ai" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button 
        id="chatbot-toggle"
        className={`chatbot-toggle ${isOpen ? 'hidden' : ''}`} 
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare size={24} />
      </button>

      <div className={`chatbot-window glass-panel ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-header-title">
            <Bot size={20} className="text-gradient" />
            <span>{t.title}</span>
          </div>
          <button className="chatbot-close" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.sender}`}>
              <div className="message-avatar">
                {msg.sender === 'ai' ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className={`message-bubble ${msg.sender === 'ai' ? 'markdown-content' : ''}`}>
                {msg.sender === 'ai' ? (
                  <ReactMarkdown>{msg.text || ''}</ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message ai">
              <div className="message-avatar">
                <Bot size={16} />
              </div>
              <div className="message-bubble typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chatbot-input" onSubmit={handleSend}>
          <input 
            type="text" 
            placeholder={t.placeholder} 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="btn-send" disabled={!inputValue.trim() || isTyping}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  );
}
