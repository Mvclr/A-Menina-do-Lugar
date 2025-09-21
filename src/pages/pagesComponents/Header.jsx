import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Sun, Moon } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { navigateToHome, navigateToGames, scrollToSection, theme, toggleTheme } = useApp();

  const handleScrollToSection = (sectionId) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  const handleGamesClick = () => {
    navigateToGames();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-aml-dark text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <button
            onClick={navigateToHome}
            className="text-2xl font-bold text-aml-primary hover:scale-105 transition-transform duration-300"
          >
            A Menina Do Lugar
          </button>

          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => handleScrollToSection("items")}
              className="hover:text-aml-primary transition-colors duration-300 font-medium"
            >
              Livros
            </button>
            <button
              onClick={() => handleScrollToSection("contact")}
              className="hover:text-aml-primary transition-colors duration-300 font-medium"
            >
              Contato
            </button>
            <button
              onClick={handleGamesClick}
              className="bg-aml-primary text-aml-dark font-bold px-5 py-2 rounded-full hover:bg-yellow-500 transition-colors duration-300"
            >
              Jogos
            </button>
            <button onClick={toggleTheme} className="text-white">
              {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
            </button>
          </nav>

          <button
            className="md:hidden text-2xl hover:text-aml-primary transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            &#9776;
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2">
            <button onClick={navigateToHome} className="block w-full text-left py-2 rounded-md px-3 hover:bg-aml-secondary">Início</button>
            <button onClick={() => handleScrollToSection("about")} className="block w-full text-left py-2 rounded-md px-3 hover:bg-aml-secondary">Sobre Nós</button>
            <button onClick={() => handleScrollToSection("items")} className="block w-full text-left py-2 rounded-md px-3 hover:bg-aml-secondary">Livros</button>
            <button onClick={() => handleScrollToSection("contact")} className="block w-full text-left py-2 rounded-md px-3 hover:bg-aml-secondary">Contato</button>
            <button onClick={handleGamesClick} className="block w-full text-left py-2 rounded-md px-3 hover:bg-aml-secondary">Jogos</button>
            <button onClick={toggleTheme} className="block w-full text-left py-2 rounded-md px-3 hover:bg-aml-secondary">
              {theme === "light" ? "Modo Escuro" : "Modo Claro"}
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;