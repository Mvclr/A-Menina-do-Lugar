import React from 'react';
import { Book, Gamepad2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleScrollToBooks = () => {
    const booksSection = document.getElementById('items');
    if (booksSection) {
      booksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="relative bg-cover bg-center text-white py-32 px-6" 
      style={{ backgroundImage: "url('/images/fundos/Fundo_AML.png')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 container mx-auto flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4 text-aml-primary">
            Bem-vindo ao mundo de "A Menina do Lugar"
          </h1>
          <p className="text-lg md:text-xl mb-8 text-aml-light">
            Explore histórias, cultura e jogos divertidos de Alagoas. Uma aventura educativa espera por você!
          </p>
          <div className="flex justify-center lg:justify-start space-x-4">
            <button 
              onClick={handleScrollToBooks}
              className="bg-aml-primary hover:bg-yellow-500 text-aml-dark font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
            >
              <Book className="mr-2" /> Ver Livros
            </button>
            <button 
              onClick={() => navigate('/games')}
              className="bg-aml-secondary hover:bg-blue-700 text-aml-light font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
            >
              <Gamepad2 className="mr-2" /> Jogar Agora
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <img 
            src="/images/meninas/Menina-Coruripe.png" 
            alt="A Menina do Lugar" 
            className="w-2/3 md:w-1/2 lg:w-3/4"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
