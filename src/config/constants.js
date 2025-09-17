// Configurações de navegação
export const ROUTES = {
  HOME: "/",
  GAMES: "/games",
  ITEM: "/item/:id",
};

// Configurações de jogos
export const GAME_CONFIG = {
  SNAKE: {
    BOARD_SIZE: 20,
    INITIAL_SNAKE: [{ x: 10, y: 10 }],
    INITIAL_DIRECTION: { x: 0, y: -1 },
    GAME_SPEED: 150,
  },
  MAZE: {
    MAZE_SIZE: 15,
    CELL_TYPES: {
      WALL: 1,
      PATH: 0,
      PLAYER: 2,
      EXIT: 3,
      VISITED: 4,
    },
  },
  SLIDING_PUZZLE: {
    BOARD_SIZE: 4,
    EMPTY_TILE: 16,
  },
};

// Configurações de localStorage
export const STORAGE_KEYS = {
  SNAKE_HIGH_SCORE: "snakeHighScore",
  MAZE_BEST_MOVES: "mazeBestMoves",
  GAME_2048_BEST_SCORE: "2048BestScore",
  SIMON_BEST_SCORE: "simonBestScore",
  PUZZLE_BEST_MOVES: "puzzleBestMoves",
};

// Configurações de performance
export const PERFORMANCE_CONFIG = {
  DEBOUNCE_DELAY: 150,
  THROTTLE_LIMIT: 100,
  LOADING_DELAY: 300,
};

// Configurações de UI
export const UI_CONFIG = {
  ANIMATION_DURATION: 300,
  HOVER_SCALE: 1.05,
  TRANSITION_DURATION: 200,
};



