import React, { useState } from 'react';

// Componente Header
const Header = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-gray-800 text-white shadow-2xl sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentPage('home')}
            className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-gray-300 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
          >
            A Menina Do Lugar
          </button>
          
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('items')}
              className="hover:text-yellow-400 transition-colors duration-300 text-lg font-medium"
            >
              Livros
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="hover:text-yellow-400 transition-colors duration-300 text-lg font-medium"
            >
              Contato
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="hover:text-yellow-400 transition-colors duration-300 text-lg font-medium"
            >
              Jogos
            </button>
          </nav>

          <button 
            className="md:hidden text-2xl hover:text-yellow-400 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2 animate-fade-in">
            <button
              onClick={() => scrollToSection('home')}
              className="block py-2 hover:text-yellow-400 transition-colors duration-300 w-full text-left"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block py-2 hover:text-yellow-400 transition-colors duration-300 w-full text-left"
            >
              Sobre Nós
            </button>
            <button
              onClick={() => scrollToSection('items')}
              className="block py-2 hover:text-yellow-400 transition-colors duration-300 w-full text-left"
            >
              Produtos
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block py-2 hover:text-yellow-400 transition-colors duration-300 w-full text-left"
            >
              Contato
            </button>
            
          </nav>
        )}
      </div>
    </header>
  );
};


export default Header;
