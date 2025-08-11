import React from 'react';

// Componente Footer
const Footer = ({ setCurrentPage }) => {
  const scrollToSection = (sectionId) => {
    setCurrentPage('home');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              MinhaMarca
            </h3>
            <p className="text-gray-400 mb-4">
              Inovação e qualidade em cada projeto. Transformando ideias em realidade.
            </p>
            <div className="flex space-x-4">
              <button className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-xl">📘</button>
              <button className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-xl">📷</button>
              <button className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-xl">🐦</button>
              <button className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-xl">💼</button>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection('home')} className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Início</button></li>
              <li><button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Sobre Nós</button></li>
              <li><button onClick={() => scrollToSection('items')} className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Produtos</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Contato</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Serviços</h4>
            <ul className="space-y-2">
              <li><button className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Desenvolvimento Web</button></li>
              <li><button className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Consultoria</button></li>
              <li><button className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Suporte Técnico</button></li>
              <li><button className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Treinamentos</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Contato</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📍 Rua das Flores, 123</li>
              <li>📞 (11) 9999-9999</li>
              <li>📧 contato@minhamarca.com</li>
              <li>🕒 Seg-Sex: 9h às 18h</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 MinhaMarca. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};


export default Footer;