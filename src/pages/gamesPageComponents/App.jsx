import React, { useState } from "react";
import { ArrowLeft, Home, Play } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { gamesData } from "./gamesData.js";

const Button = ({ children, className = "", ...props }) => (
  <button {...props} className={`px-4 py-2 font-bold rounded-full transition-transform transform hover:scale-105 ${className}`}>
    {children}
  </button>
);

const GameZoneHeader = () => {
  return (
    <div className="text-center mb-16">
      <h2 className="text-5xl font-bold text-aml-dark mb-4">Nossos Jogos</h2>
      <div className="w-24 h-1 bg-gradient-to-r from-aml-primary to-aml-action mx-auto mb-6"></div>
      <p className="text-xl text-aml-dark max-w-2xl mx-auto">
        Divirta-se com nossa coleção de jogos educativos e culturais.
      </p>
    </div>
  );
};

const GameCard = ({ game, onPlayClick }) => {
  return (
    <div 
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col"
      onClick={() => onPlayClick(game)}
    >
      <div className="relative h-48 bg-aml-secondary overflow-hidden">
        {game.image ? (
          <img src={game.image} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl text-white">{game.icon}</div>
        )}
        
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-2xl font-bold text-aml-dark mb-2">{game.title}</h3>
        <p className="text-aml-dark/80 mb-4 text-sm flex-grow">{game.description}</p>
        <Button
          className="w-full bg-aml-action text-white py-3 mt-auto flex items-center justify-center"
        >
          <Play className="w-4 h-4 mr-2" />
          Jogar Agora
        </Button>
      </div>
    </div>
  );
};

const GameZonePage = ({ onGameSelect }) => {
  return (
    <section className="relative py-20 bg-aml-light min-h-screen">
       <div 
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        style={{ 
          backgroundImage: "url('/images/fundos/Folhas-Fundo.png')", 
          backgroundRepeat: 'repeat', 
          backgroundSize: 'auto', 
          opacity: 0.1 
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 container mx-auto px-6">
        <GameZoneHeader />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {gamesData.map((game) => (
            <GameCard key={game.id} game={game} onPlayClick={onGameSelect} />
          ))}
        </div>
      </div>
    </section>
  );
};

function GameApp() {
  const [currentGame, setCurrentGame] = useState(null);
  const { navigateToHome } = useApp();

  const handleGameSelect = (game) => {
    setCurrentGame(game);
  };

  const handleBackToGames = () => {
    setCurrentGame(null);
  };

  if (currentGame) {
    const GameComponent = currentGame.component;

    return (
      <div className="relative min-h-screen bg-aml-light">
        <div 
          className="absolute inset-0 w-full h-full z-0 pointer-events-none"
          style={{ 
            backgroundImage: "url('/images/fundos/Folhas-Fundo.png')", 
            backgroundRepeat: 'repeat', 
            backgroundSize: 'auto', 
            opacity: 0.1 
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 container mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <Button
              onClick={handleBackToGames}
              className="bg-aml-secondary text-white flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar aos Jogos
            </Button>
            <Button
              onClick={navigateToHome}
              className="bg-aml-accent text-white flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Início
            </Button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-6xl mx-auto">
            <GameComponent />
          </div>
        </div>
      </div>
    );
  }

  return <GameZonePage onGameSelect={handleGameSelect} />;
}

export default GameApp;
