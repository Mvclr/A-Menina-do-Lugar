import React from 'react';
// Componente Sobre Nós
const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-lime-100 to-green-100">
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
      <div className="relative z-10 container mx-auto px-6">
          <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Sobre <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Nós</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISICING ELIGENDI.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto sed, aliquid omnis ipsum quibusdam reiciendis, ipsa alias, nemo incidunt rem maiores quasi id praesentium iure officia. Quam dolores maiores officia?
            </p>
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-3xl font-bold text-blue-600">5</div>
                <div className="text-sm text-gray-600">Livros</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-3xl font-bold text-purple-600">5</div>
                <div className="text-sm text-gray-600">Cidades</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-3xl font-bold text-green-600">3</div>
                <div className="text-sm text-gray-600">Jogos Temáticos</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="src/Images/Fundo_AML.png" 
              alt="Nossa equipe"
              className="rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 w-full"
            />
          </div>
        </div>
      </div>
      </div>
      
    </section>
  );
};
export default AboutSection;