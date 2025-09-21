import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';

const Notification = ({ message, type, onHide }) => {
  if (!message) return null;
  
  const baseClasses = "fixed top-5 right-5 p-4 rounded-lg shadow-lg text-white transition-opacity duration-300 z-50";
  const typeClasses = type === 'success' ? 'bg-aml-accent' : 'bg-aml-action';
  
  setTimeout(onHide, 5000);
  
  return (
    <div className={`${baseClasses} ${typeClasses}`}>
      <span>{message}</span>
      <button onClick={onHide} className="ml-4 font-bold">X</button>
    </div>
  );
};

const ContactSection = () => {
  const form = useRef();

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

  const hideNotification = () => setNotification({ show: false, message: '', type: '' });

  const showNotification = (message, type) => setNotification({ show: true, message, type });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showNotification("Por favor, digite seu nome.", "error");
      return;
    }
    if (!validateEmail(formData.email)) {
      showNotification("Por favor, insira um endereço de email válido.", "error");
      return;
    }
    if (!formData.message.trim()) {
      showNotification("Por favor, digite sua mensagem.", "error");
      return;
    }

    setIsLoading(true);

    const serviceID = "service_uvgcn0l";
    const templateID = "template_788r12o";
    const publicKey = "MRfnyFzpAWcGYAjKD";

    emailjs.sendForm(serviceID, templateID, form.current, publicKey)
      .then((response) => {
        showNotification("Mensagem enviada com sucesso!", "success");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        showNotification("Falha ao enviar a mensagem.", "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {notification.show && <Notification message={notification.message} type={notification.type} onHide={hideNotification} />}
      <section id="contact" className="relative py-20 bg-aml-light dark:bg-aml-darker">
        <div 
          className="absolute inset-0 w-full h-full z-0 pointer-events-none dark:opacity-25"
          style={{ 
            backgroundImage: "url('/images/fundos/Folhas-Fundo.png')", 
            backgroundRepeat: 'repeat', 
            backgroundSize: 'auto', 
            opacity: 0.3 
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-aml-dark dark:text-aml-light mb-4">Entre em Contato</h2>
          </div>
          <div className="max-w-2xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-aml-primary transition-all duration-300"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Seu email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-aml-primary transition-all duration-300"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Sua mensagem"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-aml-primary transition-all duration-300 resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-aml-primary text-aml-dark py-3 rounded-lg font-bold hover:bg-yellow-500 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;