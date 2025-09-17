import { createContext, useContext, useReducer } from "react";

// Dados dos itens
const itemsData = [
    {
      id: 1,
      name: "Cafurna",
      image: "/images/capas/CafurnaCapa.png",
      description:
        "Nos juntamos a Lua para descobrir um pouco sobre a cultura dessa cidade encantadora!",
      pdfUrl: "/pdfs/Livro-Cafurna.pdf",
      meninaImg: "/images/meninas/Menina-Cafurna.png",
      gameId: 1, // Tabuleiro de Cafurna
    },
    {
      id: 2,
      name: "Viçosa",
      image: "/images/capas/VicosaCapa.png",
      description:
        "Nos juntamos a Rodrigo para descobrir um pouco sobre a cultura dessa cidade encantadora onde mora sua avó!",
      pdfUrl: "/pdfs/Livro-Viçosa.pdf",
      meninaImg: "/images/meninas/Menina-Viçosa.PNG",
      gameId: 4, // Tabuleiro de Viçosa
    },
    {
      id: 3,
      name: "Coruripe",
      image: "/images/capas/CoruripeCapa.png",
      description:
        "Nos juntamos a Lua para descobrir um pouco sobre a cultura dessa cidade encantadora onde mora sua tia Ju!",
      pdfUrl: "/pdfs/Livro-Coruripe.pdf",
      meninaImg: "/images/meninas/Menina-Coruripe.png",
      gameId: 2, // Tabuleiro de Coruripe
    },
    {
      id: 4,
      name: "Muquém",
      image: "/images/capas/MuquemCapa.png",
      description:
        "Nos juntamos a Lua para descobrir um pouco sobre a cultura dessa cidade encantadora onde mora sua prima Tita!",
      pdfUrl: "/pdfs/Livro-Muquem.pdf",
      meninaImg: "/images/meninas/Menina-Muquém.PNG",
      gameId: 3, // Tabuleiro de Muquém
    },
  ];

// Initial State
export const initialState = {
  currentPage: "home",
  selectedItem: null,
  items: itemsData,
  loading: false,
  error: null,
  gameScores: { /* ... game scores initial state ... */ },
};

// Actions
export const ACTIONS = {
  SET_CURRENT_PAGE: "SET_CURRENT_PAGE",
  SET_SELECTED_ITEM: "SET_SELECTED_ITEM",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  UPDATE_GAME_SCORE: "UPDATE_GAME_SCORE",
  LOAD_GAME_SCORES: "LOAD_GAME_SCORES",
};

// Reducer
export function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case ACTIONS.SET_SELECTED_ITEM:
      return { ...state, selectedItem: action.payload };
    // ... other cases
    default:
      return state;
  }
}

// Context
const AppContext = createContext();

// Custom Hook
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

export default AppContext;
