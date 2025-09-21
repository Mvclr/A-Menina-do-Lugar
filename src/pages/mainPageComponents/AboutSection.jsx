import React from "react";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative py-20 bg-aml-light dark:bg-aml-darker"
    >
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
          <h2 className="text-5xl font-bold text-aml-dark dark:text-aml-light mb-4">Sobre Nós</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <p className="text-xl text-aml-dark/80 dark:text-aml-light/80 leading-relaxed">
              O projeto "A Menina do Lugar" é uma plataforma digital e educacional que busca promover a educação patrimonial através de jogos e livros interativos.
            </p>
            <p className="text-xl text-aml-dark/80 dark:text-aml-light/80 leading-relaxed">
              Nossa metodologia envolve a adaptação de jogos de tabuleiro, quebra-cabeças e outros materiais para o formato digital, além da criação de livros ilustrados interativos, com o objetivo de proporcionar uma experiência lúdica e educativa.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-aml-secondary dark:text-aml-primary">4</div>
                <div className="text-sm text-aml-dark dark:text-aml-light">Livros</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-aml-accent">4</div>
                <div className="text-sm text-aml-dark dark:text-aml-light">Cidades</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-aml-action">5</div>
                <div className="text-sm text-aml-dark dark:text-aml-light">Jogos</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="/images/meninas/Menina-Muquém.PNG"
              alt="A Menina do Lugar"
              className="rounded-2xl shadow-2xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
