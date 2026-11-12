import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// База знаний для ответов (эмуляция ИИ без затрат на API)
const KNOWLEDGE_BASE = [
  { keywords: ['цена', 'стоимость', 'сколько стоит', 'бюджет'], answer: 'Стоимость зависит от сложности. Лендинг — от 80к ₽, магазин — от 250к ₽. Точную цену можно рассчитать в нашем конфигураторе ниже!' },
  { keywords: ['сроки', 'долго', 'когда будет готово'], answer: 'Лендинг делаем за 7 дней, магазин — за месяц. Веб-приложения — от 2 месяцев. Всегда соблюдаем дедлайны.' },
  { keywords: ['telegram', 'бот', 'mini app', 'тг'], answer: 'Да, мы разрабатываем Telegram Mini Apps! Это тренд 2026 года. Можем сделать магазин, сервис или бота прямо внутри мессенджера.' },
  { keywords: ['дизайн', 'фигма', 'ui', 'ux'], answer: 'У нас есть отдельное направление UI/UX. Делаем дизайн-системы, прототипы и адаптивные макеты в Figma перед разработкой.' },
  { keywords: ['поддержка', 'баги', 'гарантия'], answer: 'Предоставляем гарантию 3 месяца после запуска. Также есть пакеты техподдержки 24/7 с мониторингом серверов.' },
  { keywords: ['привет', 'здравствуй', 'hi', 'hello'], answer: 'Привет! 👋 Я AI-ассистент CodeFuture. Спроси меня о ценах, сроках, Telegram-приложениях или помогу выбрать услугу.' },
];

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Привет! 👋 Я AI-ассистент CodeFuture. Спроси меня о ценах, сроках или услугах.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const findAnswer = (query) => {
    const lowerQuery = query.toLowerCase();
    for (const item of KNOWLEDGE_BASE) {
      if (item.keywords.some(kw => lowerQuery.includes(kw))) {
        return item.answer;
      }
    }
    return 'Хороший вопрос! Для точного ответа лучше заполнить конфигуратор проекта или оставить заявку. Мы свяжемся с вами в течение часа! 😊';
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Эмуляция задержки "мышления" ИИ
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const aiResponse = findAnswer(userMsg.text);
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
  };

  return (
    <>
      {/* Плавающая кнопка */}
      <motion.button
        className="ai-fab"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        {isOpen ? '✕' : '🤖'}
      </motion.button>

      {/* Окно чата */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ai-chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="ai-header">
              <span>🤖 AI-Консультант</span>
              <small>CodeFuture Assistant</small>
            </div>
            
            <div className="ai-messages">
              {messages.map((msg, i) => (
                <motion.div 
                  key={i} 
                  className={`message ${msg.role}`}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  {msg.text}
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div 
                  className="message ai typing-indicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span></span><span></span><span></span>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            <div className="ai-input-area">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Спросите о ценах, сроках..."
                disabled={isTyping}
              />
              <button onClick={handleSend} disabled={!input.trim() || isTyping}>➤</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}