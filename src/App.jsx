import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedCounter } from './components/AnimatedCounter'
import { ProjectConfigurator } from './components/ProjectConfigurator' // ✅ Импорт конфигуратора
import { useTheme } from './hooks/useTheme' // ✅ Импорт хука темы
import { AIAssistant } from './components/AIAssistant';
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(null);
  
  // ✅ Инициализация темы
  const { theme, toggleTheme } = useTheme();

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    }
  };

  // ✅ Обновленный массив услуг с Telegram Mini Apps
  const services = [
    { 
      title: "Web Development", 
      desc: "React, Next.js, Node.js, Python", 
      icon: "💻", 
      details: "SPA, SSR, PWA, микросервисы, высоконагруженные системы" 
    },
    { 
      title: "Telegram Mini Apps", 
      desc: "TMA, Web Apps, боты, платежи", 
      icon: "✈️", 
      details: "Разработка нативных приложений внутри Telegram, интеграция с API" 
    },
    { 
      title: "Mobile Apps", 
      desc: "iOS & Android нативная разработка", 
      icon: "📱", 
      details: "Кроссплатформенная разработка, публикация в сторах" 
    },
    { 
      title: "UI/UX Design", 
      desc: "Figma, прототипирование, UX-аудит", 
      icon: "🎨", 
      details: "Дизайн-системы, пользовательские сценарии, адаптивные макеты" 
    },
    { 
      title: "DevOps & Cloud", 
      desc: "AWS, Docker, CI/CD, мониторинг", 
      icon: "☁️", 
      details: "Настройка серверов, автоматизация деплоя, Kubernetes" 
    },
	{ 
      title: "SEO & SMM", 
      desc: "Продвижение, контент, аналитика", 
      icon: "📈", 
      details: "Техническая оптимизация, семантическое ядро, ведение соцсетей, таргет" 
    }
  ];
  const scrollToConfigurator = () => {
    const element = document.getElementById('calculator');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  return (
    <div className="app">
      {/*Header */}
      <header className="header">
        <div className="container header-content">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="logo"
          >
            D<span>Creator</span>
          </motion.div>
          
          <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
            <a href="#services" onClick={() => setIsMenuOpen(false)}>Услуги</a>
            <a href="#stack" onClick={() => setIsMenuOpen(false)}>Технологии</a>
            <a href="#process" onClick={() => setIsMenuOpen(false)}>Процесс</a>
            <a href="#calculator" onClick={() => setIsMenuOpen(false)}>Конфигуратор</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)}>О нас</a>
          </nav>

          <div className="header-actions">
            {/* Кнопка переключения темы */}
            <motion.button
              className="theme-toggle"
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Переключить тему"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </motion.button>

            {/* Кнопка мобильного меню */}
            <button 
              className={`menu-btn ${isMenuOpen ? 'active' : ''}`} 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Меню"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Premium Hero Section */}
      <section className="hero">
        {/* Декоративные плавающие элементы */}
		  <div className="hero-decoration hero-badge-1">
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
			Быстрый деплой
		  </div>
		  <div className="hero-decoration hero-badge-2">
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
			Безопасность
		  </div>
        
        <div className="container hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2, duration: 0.8 }}
            className="hero-text-block"
          >
            <div className="hero-label">DCreator Development Studio</div>
            <h1>
              Разработка будущего<br />
              <span className="gradient-text">уже сегодня</span>
            </h1>
            <p>
              Создаем сложные веб-приложения, Telegram Mini Apps и цифровые продукты. 
              От идеи до production-ready решения за 30 дней.
            </p>
            
            <div className="hero-actions">
			  <motion.button 
				className="btn-primary btn-glow"
				onClick={scrollToConfigurator} // ✅ Добавили обработчик клика
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
			  >
				Обсудить проект <span className="arrow">→</span>
			  </motion.button>
              
              <motion.a 
                href="#services"
                className="btn-secondary"
                whileHover={{ x: 5 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Смотреть услуги
              </motion.a>
            </div>

            {/* Блок социального доказательства */}
			  <motion.div 
				className="hero-trust"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1 }}
			  >
				<div className="trust-icon">
				  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
					<circle cx="9" cy="7" r="4"></circle>
					<path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
					<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
				  </svg>
				</div>
				<div className="trust-text">
				  <strong>50+ успешных кейсов</strong>
				  <span>в портфолио студии</span>
				</div>
			  </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <div className="container">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            Наши услуги
          </motion.h2>
          <motion.div 
            className="cards-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {services.map((service, index) => (
              <motion.div 
                key={index}
                className={`card ${activeService === index ? 'active' : ''}`}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                onHoverStart={() => setActiveService(index)}
                onHoverEnd={() => setActiveService(null)}
              >
                <div className="icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <AnimatePresence>
                  {activeService === index && (
                    <motion.div 
                      className="card-details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{service.details}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section (Seamless Integration) */}
      <section className="stats" id="stats">
        <div className="container">
          <motion.div 
            className="stats-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.div className="stat-item" variants={fadeInUp}>
              <div className="stat-number"><AnimatedCounter end={50} suffix="+" /></div>
              <div className="stat-label">Завершенных проектов</div>
            </motion.div>            
            <motion.div className="stat-item" variants={fadeInUp}>
              <div className="stat-number"><AnimatedCounter end={5} /></div>
              <div className="stat-label">Лет на рынке</div>
            </motion.div>
            <motion.div className="stat-item" variants={fadeInUp}>
              <div className="stat-number"><AnimatedCounter end={98} suffix="%" /></div>
              <div className="stat-label">Довольных клиентов</div>
            </motion.div>   
          </motion.div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="process" id="process">
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Как мы работаем
          </motion.h2>
          <div className="timeline">
            {[
              { step: '01', title: 'Брифинг', desc: 'Изучаем задачу, формируем ТЗ и смету' },
              { step: '02', title: 'Дизайн', desc: 'Прототипы, UI-кит, согласование макетов' },
              { step: '03', title: 'Разработка', desc: 'Код, интеграции, промежуточные демо' },
              { step: '04', title: 'Тестирование', desc: 'QA, багфиксинг, нагрузочное тестирование' },
              { step: '05', title: 'Запуск', desc: 'Деплой, настройка аналитики, обучение' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                className="timeline-item"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="timeline-step">{item.step}</div>
                <div className="timeline-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>	  
	{/* Tech Stack Section */}
      <section className="tech-stack" id="stack">
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Технологический стек
          </motion.h2>
          <div className="stack-grid">
            {['React', 'TypeScript', 'Node.js', 'Python', 'Docker', 'AWS', 'Figma', 'Git'].map((tech, i) => (
              <motion.div 
                key={tech}
                className="stack-item"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -5, borderColor: 'var(--primary)' }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <ProjectConfigurator />

      {/* About Section */}
      <section className="about" id="about">
        <div className="container about-content">
          <motion.div 
            className="about-text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2>Почему DCreator?</h2>
            <p>Мы не просто пишем код — мы решаем бизнес-задачи. Наша команда состоит из senior-разработчиков с опытом от 5 лет.</p>
            <ul className="about-list">
              <li>✅ Прозрачная отчетность каждые 3 дня</li>
              <li>✅ Гарантия качества и тестирование</li>
              <li>✅ Поддержка после запуска 24/7</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      {/* Full Professional Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo">Code<span>Future</span></div>
              <p>Разрабатываем цифровые продукты, которые решают бизнес-задачи. От идеи до production-ready решения.</p>
            </div>
            
            <div className="footer-col">
              <h4>Услуги</h4>
              <a href="#services">Web Development</a>
              <a href="#services">Telegram Mini Apps</a>
              <a href="#services">Mobile Apps</a>
              <a href="#services">UI/UX Design</a>
			  <a href="#services">DevOps & Cloud</a>
            </div>
            
            <div className="footer-col">
              <h4>Компания</h4>
              <a href="#about">О нас</a>
              <a href="#stack">Технологии</a>
              <a href="#calculator">Конфигуратор</a>
              <a href="#stats">Кейсы</a>
            </div>
            
            <div className="footer-col">
              <h4>Контакты</h4>
              <a href="mailto:hello@DCreator.dev">hello@DCreator.dev</a>
              <a href="#">Telegram</a>
              <a href="#">GitHub</a>
              <a href="#">LinkedIn</a>
            </div>
          </div>
          
          <div className="footer-bottom">
            © 2026 DCreator by DCreator. All rights reserved.
          </div>
        </div>
      </footer>
	        <AIAssistant />
    </div>
  )
}

export default App// FORCE REBUILD: REAL D CREATOR CODE 
