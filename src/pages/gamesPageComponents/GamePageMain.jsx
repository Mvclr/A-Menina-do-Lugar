import React from "react";

// Dados dos jogos disponíveis
const gamesData = [
  {
    id: 1,
    title: "Jogo da Velha",
    description:
      "Clássico jogo da velha 3x3. Jogue contra o computador e tente fazer uma linha!",
    difficulty: "Fácil",
    category: "Estratégia",
    icon: "⭕",
    color: "from-blue-500 to-purple-600",
  },
  {
    id: 2,
    title: "Labirinto",
    description:
      "Encontre a saída do labirinto! Use as setas do teclado para navegar.",
    difficulty: "Médio",
    category: "Puzzle",
    icon: "🏃",
    color: "from-green-500 to-blue-500",
  },
  {
    id: 3,
    title: "Snake Game",
    description:
      "Colete as maçãs e cresça sem bater nas paredes ou em você mesmo!",
    difficulty: "Médio",
    category: "Arcade",
    icon: "🐍",
    color: "from-yellow-500 to-red-500",
  },
  {
    id: 4,
    title: "2048",
    description:
      "Combine números iguais para chegar ao 2048! Use as setas para mover.",
    difficulty: "Difícil",
    category: "Puzzle",
    icon: "🔢",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 5,
    title: "Simon Says",
    description:
      "Memorize e repita a sequência de cores. Até onde você consegue ir?",
    difficulty: "Médio",
    category: "Memória",
    icon: "🎵",
    color: "from-pink-500 to-red-500",
  },
  {
    id: 6,
    title: "Quebra-Cabeça",
    description:
      "Reorganize as peças numeradas em ordem. Um clássico dos quebra-cabeças!",
    difficulty: "Médio",
    category: "Puzzle",
    icon: "🧩",
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: 7,
    title: "Cafurna-Game",
    description:
      "Reorganize as peças numeradas em ordem. Um clássico dos quebra-cabeças!",
    difficulty: "Médio",
    category: "Puzzle",
    icon: "🧩",
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: 8,
    title: "Coruripe-Game",
    description:
      "Reorganize as peças numeradas em ordem. Um clássico dos quebra-cabeças!",
    difficulty: "Médio",
    category: "Puzzle",
    icon: "🧩",
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: 9,
    title: "Muquém-Game",
    description:
      "Reorganize as peças numeradas em ordem. Um clássico dos quebra-cabeças!",
    difficulty: "Médio",
    category: "Puzzle",
    icon: "🧩",
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: 10,
    title: "Viçosa-Game",
    description:
      "Reorganize as peças numeradas em ordem. Um clássico dos quebra-cabeças!",
    difficulty: "Médio",
    category: "Puzzle",
    icon: "🧩",
    color: "from-indigo-500 to-blue-500",
  }
];

// Componente Header da página
const GameZoneHeader = () => {
  return (
    <div className="text-center mb-16">
      <h2 className="text-5xl font-bold text-gray-800 mb-6">
        Nossos{" "}
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Jogos
        </span>
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Divirta-se com nossa coleção de jogos clássicos redesenhados para a web.
      </p>
    </div>
  );
};

// Componente Card do Jogo
const GameCard = ({ game }) => {
  const handlePlayClick = () => {
    alert(`Iniciando ${game.title}...`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer">
      <div
        className={`h-32 bg-gradient-to-br ${game.color} flex items-center justify-center relative overflow-hidden`}
      >
        <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
          {game.icon}
        </div>
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-lg px-3 py-1 rounded-full text-white text-sm font-medium">
          {game.difficulty}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800">{game.title}</h3>
          <span className="text-sm px-3 py-1 bg-gray-100 rounded-full text-gray-600">
            {game.category}
          </span>
        </div>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {game.description}
        </p>
        <button
          onClick={handlePlayClick}
          className={`w-full bg-gradient-to-r ${game.color} text-white py-3 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
        >
          Jogar Agora
        </button>
      </div>
    </div>
  );
};

// Componente principal da aplicação
const GameZonePage = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-lime-100 to-green-100 overflow-hidden">
      {/* Overlay de folhas */}
      <div
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/src/Images/Folhas-Fundo.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          opacity: 0.25,
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 container mx-auto px-6">
        <GameZoneHeader />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {gamesData.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
        <div className="text-center mt-16">
          <div className="bg-white/50 backdrop-blur-lg rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              🎮 Sobre os Jogos
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Nossa coleção inclui jogos clássicos como Jogo da Velha,
              Labirinto, Snake, 2048, Simon Says e Quebra-Cabeça. Cada jogo
              oferece um desafio único e horas de diversão. Clique em "Jogar
              Agora" para começar sua aventura!
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">6</div>
                <div className="text-sm text-gray-600">Jogos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-sm text-gray-600">Grátis</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">∞</div>
                <div className="text-sm text-gray-600">Diversão</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">⭐</div>
                <div className="text-sm text-gray-600">Premium</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameZonePage;
