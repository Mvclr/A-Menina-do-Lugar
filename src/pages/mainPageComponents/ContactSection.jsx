import React, { useState } from 'react';

// Componente Contato
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="relative z-20 py-20 bg-gradient-to-br from-lime-100 to-green-100 text-black ">
      <div
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/src/Images/Folhas-Fundo.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          opacity: 0.25
        }}
        aria-hidden="true"
      />
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            Entre em <span className="bg-gradient-to-r from-gray-400 to-blue-500 bg-clip-text text-transparent">Contato</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-400 to-blue-500 mx-auto mb-8"></div>
          <p className="text-xl text-blue-800 max-w-2xl mx-auto">
            Estamos aqui para ajudar. Entre em contato conosco!
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-blue-400 text-blue-950 rounded-full flex items-center justify-center">
                📍
              </div>
              <div>
                <h3 className="text-xl font-bold">Endereço</h3>
                <p className="text-blue-800">Rua das Flores, 123 - Centro</p>
                <p className="text-blue-800">São Paulo, SP - 01000-000</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-blue-400 text-blue-950 rounded-full flex items-center justify-center">
                📞
              </div>
              <div>
                <h3 className="text-xl font-bold">Telefone</h3>
                <p className="text-blue-800">(11) 9999-9999</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-blue-400 text-blue-950 rounded-full flex items-center justify-center">
                📧
              </div>
              <div>
                <h3 className="text-xl font-bold">Email</h3>
                <p className="text-blue-800">contato@minhamarca.com</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/20 border border-black/30 rounded-lg text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
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
                  className="w-full px-4 py-3 bg-white/20 border border-black/30 rounded-lg text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
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
                  className="w-full px-4 py-3 bg-white/20 border border-black/30 rounded-lg text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 resize-none"
                ></textarea>
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-gray-500 to-blue-400 text-blue-950 py-3 rounded-lg font-bold hover:from-yellow-400 hover:to-orange-500 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Enviar Mensagem
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ContactSection;