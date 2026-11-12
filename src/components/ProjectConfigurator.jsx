import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const SERVICES = [
  { id: 'landing', name: 'Лендинг', basePrice: 80000, time: '7 дней' },
  { id: 'shop', name: 'Интернет-магазин', basePrice: 250000, time: '30 дней' },
  { id: 'corp', name: 'Корпоративный сайт', basePrice: 150000, time: '50 дней' },
  { id: 'app', name: 'Веб-приложение (SPA)', basePrice: 400000, time: '60 дней' },
];

const ADDONS = [
  { id: 'design', name: 'Индивидуальный дизайн', price: 50000 },
  { id: 'seo', name: 'Базовое SEO', price: 30000 },
  { id: 'admin', name: 'Админ-панель', price: 70000 },
  { id: 'support', name: 'Техподдержка (3 мес)', price: 45000 },
];

export function ProjectConfigurator() {
  const [selectedService, setSelectedService] = useState(null);
  const [addons, setAddons] = useState([]);
  const [contact, setContact] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const pdfRef = useRef();

  // Загрузка сохраненного состояния из localStorage
  useEffect(() => {
    const saved = localStorage.getItem('dc_configurator');
    if (saved) {
      const parsed = JSON.parse(saved);
      setSelectedService(parsed.selectedService);
      setAddons(parsed.addons || []);
      setContact(parsed.contact || { name: '', email: '' });
    }
  }, []);

  // Сохранение состояния при каждом изменении
  useEffect(() => {
    localStorage.setItem('dc_configurator', JSON.stringify({
      selectedService, addons, contact
    }));
  }, [selectedService, addons, contact]);

  const toggleAddon = (id) => {
    setAddons(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    if (!selectedService) return 0;
    const service = SERVICES.find(s => s.id === selectedService);
    const addonsTotal = addons.reduce((sum, id) => {
      const addon = ADDONS.find(a => a.id === id);
      return sum + (addon?.price || 0);
    }, 0);
    return service.basePrice + addonsTotal;
  };

  const validate = () => {
    const newErrors = {};
    if (!selectedService) newErrors.service = 'Выберите тип проекта';
    if (!contact.name.trim()) newErrors.name = 'Введите имя';
    if (!contact.email.trim() || !/\S+@\S+\.\S+/.test(contact.email)) 
      newErrors.email = 'Введите корректный email';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generatePDF = async () => {
    if (!validate()) return;
    
    const element = pdfRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`KP_CodeFuture_${contact.name}.pdf`);
    setIsSubmitted(true);
  };

  const total = calculateTotal();
  const selectedSvc = SERVICES.find(s => s.id === selectedService);

  return (
    <section className="configurator" id="calculator">
      <div className="container">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Конфигуратор проекта
        </motion.h2>
        
        <div className="configurator-grid" ref={pdfRef}>
          {/* Левая колонка - Выбор */}
          <div className="config-left">
            <div className="config-section">
              <h3>1. Тип проекта</h3>
              <div className="service-grid">
                {SERVICES.map(service => (
                  <button
                    key={service.id}
                    className={`service-btn ${selectedService === service.id ? 'active' : ''}`}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <span className="service-name">{service.name}</span>
                    <span className="service-time">{service.time}</span>
                  </button>
                ))}
              </div>
              {errors.service && <span className="error">{errors.service}</span>}
            </div>

            <div className="config-section">
              <h3>2. Дополнительные опции</h3>
              <div className="addons-list">
                {ADDONS.map(addon => (
					// Вместо обычного <label> используем motion.label для плавности
					<motion.label 
					  key={addon.id} 
					  className="addon-item"
					  whileHover={{ scale: 1.02 }}
					  whileTap={{ scale: 0.98 }}
					>
					  <input 
						type="checkbox" 
						checked={addons.includes(addon.id)}
						onChange={() => toggleAddon(addon.id)}
					  />
					  <span>{addon.name} (+{addon.price.toLocaleString()} ₽)</span>
					</motion.label>
                ))}
              </div>
            </div>

            <div className="config-section">
              <h3>3. Контакты</h3>
              <div className="contact-inputs">
                <div className="input-group">
                  <input 
                    type="text" 
                    placeholder="Ваше имя"
                    value={contact.name}
                    onChange={(e) => setContact({...contact, name: e.target.value})}
                    className={errors.name ? 'error-input' : ''}
                  />
                  {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="input-group">
                  <input 
                    type="email" 
                    placeholder="Email"
                    value={contact.email}
                    onChange={(e) => setContact({...contact, email: e.target.value})}
                    className={errors.email ? 'error-input' : ''}
                  />
                  {errors.email && <span className="error">{errors.email}</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Правая колонка - Итог */}
          <div className="config-right">
            <div className="summary-card">
              <h3>Ваш проект</h3>
              
              <AnimatePresence mode="wait">
                {selectedSvc ? (
                  <motion.div 
                    key="details"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="summary-details"
                  >
                    <div className="summary-row">
                      <span>Тип:</span>
                      <strong>{selectedSvc.name}</strong>
                    </div>
                    <div className="summary-row">
                      <span>Срок:</span>
                      <strong>{selectedSvc.time}</strong>
                    </div>
                    
                    {addons.length > 0 && (
                      <div className="summary-addons">
                        <span>Дополнительно:</span>
                        {addons.map(id => {
                          const addon = ADDONS.find(a => a.id === id);
                          return (
                            <div key={id} className="addon-row">
                              <span>{addon.name}</span>
                              <span>+{addon.price.toLocaleString()} ₽</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    
                    <div className="summary-total">
                      <span>Итого:</span>
                      <strong>{total.toLocaleString()} ₽</strong>
                    </div>
                  </motion.div>
                ) : (
                  <motion.p 
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="empty-state"
                  >
                    Выберите тип проекта для расчета
                  </motion.p>
                )}
              </AnimatePresence>

              {!isSubmitted ? (
                <button 
                  className="btn-primary full-width"
                  onClick={generatePDF}
                  disabled={!selectedService}
                >
                  Получить КП (PDF)
                </button>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="success-message"
                >
                  ✅ КП сформировано и скачано!<br/>
                  Мы свяжемся с вами в течение часа.
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}