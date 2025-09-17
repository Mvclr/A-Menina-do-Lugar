import Maze from "./components/games/Maze";
import SimonSays from "./components/games/SimonSays";
import SlidingPuzzle from "./components/games/SlidingPuzzle";
import WordSearch from "./components/games/WordSearch";
import CafurnaBoardGame from "./components/games/CafurnaBoardGame";
import CoruripeBoardGame from "./components/games/CoruripeBoardGame";
import MuquemBoardGame from "./components/games/MuquemBoardGame";
import VicosaBoardGame from "./components/games/VicosaBoardGame";


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
    component: Maze,
  },
  {
    id: 6,
    title: "Simon Says",
    description:
      "Memorize e repita a sequência de cores. Até onde você consegue ir?",
    
    category: "Memória",
    icon: "🎵",
    image: null, // No specific image
    component: SimonSays,
  },
  {
    id: 7,
    title: "Quebra-Cabeça",
    description:
      "Reorganize as peças numeradas em ordem. Um clássico dos quebra-cabeças!",
    
    category: "Puzzle",
    icon: "🧩",
    image: null, // No specific image
    component: SlidingPuzzle,
  },
  {
    id: 8,
    title: "Caça-Palavras",
    description: "Encontre as palavras escondidas no meio de um monte de letras.",
    difficulty: "Fácil",
    category: "Puzzle",
    icon: "🔍",
    image: null, // No specific image
    component: WordSearch,
  },
];