import GeneratedMaze from "./components/games/GeneratedMaze";
// import SimonSays from "./components/games/SimonSays";
// import SlidingPuzzle from "./components/games/SlidingPuzzle";
// import WordSearch from "./components/games/WordSearch";
import CafurnaBoardGame from "./components/games/CafurnaBoardGame";
import CoruripeBoardGame from "./components/games/CoruripeBoardGame";
import MuquemBoardGame from "./components/games/MuquemBoardGame";
import VicosaBoardGame from "./components/games/VicosaBoardGame";
import CoruripeJigsaw from "./components/games/CoruripeJigsaw";
import MuquemJigsaw from "./components/games/MuquemJigsaw";
import VicosaJigsaw from "./components/games/VicosaJigsaw";
import CafurnaJigsaw from "./components/games/CafurnaJigsaw";


export const gamesData = [
  {
    id: 1,
    title: "Tabuleiro de Cafurna",
    description: "Um jogo de tabuleiro divertido pela terra de Cafurna.",
    difficulty: "Fácil",
    category: "Tabuleiro",
    icon: "🎲",
    image: "/images/jogos/cafurna/CafurnaJogoTabuleiro.png",
    component: CafurnaBoardGame,
  },
  {
    id: 2,
    title: "Tabuleiro de Coruripe",
    description: "Um jogo de tabuleiro divertido pela terra de Coruripe.",
    difficulty: "Fácil",
    category: "Tabuleiro",
    icon: "🎲",
    image: "/images/jogos/coruripe/CoruripeJogoTabuleiro.png",
    component: CoruripeBoardGame,
  },
  {
    id: 3,
    title: "Tabuleiro de Muquém",
    description: "Um jogo de tabuleiro divertido pela terra de Muquém.",
    difficulty: "Fácil",
    category: "Tabuleiro",
    icon: "🎲",
    image: "/images/jogos/muquem/MuquemJogoTabuleiro.png",
    component: MuquemBoardGame,
  },
  {
    id: 4,
    title: "Tabuleiro de Viçosa",
    description: "Um jogo de tabuleiro divertido pela terra de Viçosa.",
    difficulty: "Fácil",
    category: "Tabuleiro",
    icon: "🎲",
    image: "/images/jogos/vicosa/VicosaJogoTabuleiro.png",
    component: VicosaBoardGame,
  },
  {
    id: 5,
    title: "Labirinto de Coruripe",
    description:
      "Encontre a saída do labirinto! Use as setas do teclado para navegar.",
    
    category: "Puzzle",
    icon: "🏃",
    image: "/images/jogos/coruripe/CoruripeLabirinto.png",
    component: GeneratedMaze,
  },
  // {
  //   id: 6,
  //   title: "Simon Says",
  //   description:
  //     "Memorize e repita a sequência de cores. Até onde você consegue ir?",
    
  //   category: "Memória",
  //   icon: "🎵",
  //   image: null, // No specific image
  //   component: SimonSays,
  // },
  // {
  //   id: 7,
  //   title: "Quebra-Cabeça",
  //   description:
  //     "Reorganize as peças numeradas em ordem. Um clássico dos quebra-cabeças!",
    
  //   category: "Puzzle",
  //   icon: "🧩",
  //   image: null, // No specific image
  //   component: SlidingPuzzle,
  // },
  // {
  //   id: 8,
  //   title: "Caça-Palavras",
  //   description: "Encontre as palavras escondidas no meio de um monte de letras.",
  //   difficulty: "Fácil",
  //   category: "Puzzle",
  //   icon: "🔍",
  //   image: null, // No specific image
  //   component: WordSearch,
  // },
  {
    id: 9,
    title: "Quebra-Cabeça de Coruripe",
    description: "Monte o quebra-cabeça da imagem de Coruripe.",
    difficulty: "Médio",
    category: "Puzzle",
    icon: "🧩",
    image: "/images/jogos/coruripe/QuebraCabecaCoruripe.png",
    component: CoruripeJigsaw,
  },
  {
    id: 10,
    title: "Quebra-Cabeça de Muquém",
    description: "Monte o quebra-cabeça da imagem de Muquém.",
    difficulty: "Médio",
    category: "Puzzle",
    icon: "🧩",
    image: "/images/jogos/muquem/QuebraCabecaMuquem.png",
    component: MuquemJigsaw,
  },
  {
    id: 11,
    title: "Quebra-Cabeça de Viçosa",
    description: "Monte o quebra-cabeça da imagem de Viçosa.",
    difficulty: "Médio",
    category: "Puzzle",
    icon: "🧩",
    image: "/images/jogos/vicosa/QuebraCabecaCoruripe.jpeg",
    component: VicosaJigsaw,
  },
  {
    id: 12,
    title: "Quebra-Cabeça de Cafurna",
    description: "Monte o quebra-cabeça da imagem de Cafurna.",
    difficulty: "Médio",
    category: "Puzzle",
    icon: "🧩",
    image: "/images/jogos/cafurna/QuebraCabecaCafurna.png",
    component: CafurnaJigsaw,
  },
];
