import React, { useReducer, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppContext, { initialState, appReducer, ACTIONS } from "./AppContext"; // Import from the new file

// Provider
export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, initialState);
    const navigate = useNavigate();
    const location = useLocation();
  
    // Carregar scores salvos do localStorage
    useEffect(() => {
      const loadScores = () => {
        try {
          const scores = {
            ticTacToe: { player: 0, computer: 0 },
            snake: {
              highScore: parseInt(localStorage.getItem("snakeHighScore") || "0"),
            },
            maze: {
              bestMoves: parseInt(localStorage.getItem("mazeBestMoves") || "999"),
            },
            game2048: {
              bestScore: parseInt(localStorage.getItem("2048BestScore") || "0"),
            },
            simonSays: {
              bestScore: parseInt(localStorage.getItem("simonBestScore") || "0"),
            },
            slidingPuzzle: {
              bestMoves: parseInt(
                localStorage.getItem("puzzleBestMoves") || "999"
              ),
            },
          };
          dispatch({ type: ACTIONS.LOAD_GAME_SCORES, payload: scores });
        } catch (error) {
          console.error("Erro ao carregar scores:", error);
        }
      };
  
      loadScores();
    }, []);

    // Atualizar tema
    useEffect(() => {
      if (state.theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }, [state.theme]);
  
    // Atualizar página atual baseado na rota
    useEffect(() => {
      const path = location.pathname;
      if (path === "/") {
        dispatch({ type: ACTIONS.SET_CURRENT_PAGE, payload: "home" });
      } else if (path === "/games") {
        dispatch({ type: ACTIONS.SET_CURRENT_PAGE, payload: "games" });
      } else if (path.startsWith("/item/")) {
        dispatch({ type: ACTIONS.SET_CURRENT_PAGE, payload: "item" });
      }
    }, [location.pathname]);
  
    // Funções de navegação
    const navigateToHome = () => {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      navigate("/");
      setTimeout(() => {
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      }, 300);
    };
  
    const navigateToGames = () => {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      navigate("/games");
      setTimeout(() => {
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      }, 300);
    };
  
    const navigateToItem = (itemId) => {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const item = state.items.find((item) => item.id === itemId);
      if (item) {
        dispatch({ type: ACTIONS.SET_SELECTED_ITEM, payload: item });
        navigate(`/item/${itemId}`);
      }
      setTimeout(() => {
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      }, 300);
    };
  
    const updateGameScore = (game, scores) => {
      dispatch({ type: ACTIONS.UPDATE_GAME_SCORE, payload: { game, scores } });
    };
  
    const scrollToSection = (sectionId) => {
      if (state.currentPage !== "home") {
        navigateToHome();
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    const toggleTheme = () => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      dispatch({ type: ACTIONS.SET_THEME, payload: newTheme });
    };
  
    const value = {
      ...state,
      navigateToHome,
      navigateToGames,
      navigateToItem,
      updateGameScore,
      scrollToSection,
      toggleTheme,
    };
  
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}