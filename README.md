# A Menina Do Lugar

Uma aplicação web React que combina uma loja de livros culturais com uma zona de jogos educativos.

## 🚀 Funcionalidades

### 📚 Sistema de Livros

- **4 livros temáticos:** Cafurna, Viçosa, Coruripe e Muquém
- Navegação entre produtos com React Router
- Páginas individuais com detalhes dos livros
- Sistema de preços variados

### 🎮 Zona de Jogos (6 jogos completos)

1. **Jogo da Velha** - IA inteligente usando algoritmo Minimax
2. **Labirinto** - Geração procedural usando backtracking
3. **Snake Game** - Jogo clássico da cobra
4. **2048** - Puzzle matemático popular
5. **Simon Says** - Jogo de memória com cores
6. **Quebra-Cabeça Deslizante** - Puzzle 4x4 com 15 peças

## 🛠️ Melhorias Implementadas

### 🔧 Arquitetura e Performance

- **React Router DOM** para navegação entre páginas
- **Context API** para gerenciamento de estado global
- **Hooks personalizados** para otimização de performance
- **Error Boundary** para tratamento de erros
- **Loading states** para melhor UX

### 🎯 Sistema de Navegação

- Navegação SPA com React Router
- URLs amigáveis (`/`, `/games`, `/item/:id`)
- Navegação programática com hooks
- Loading states durante transições

### 📊 Gerenciamento de Estado

- Context API centralizado
- Persistência de scores no localStorage
- Estado compartilhado entre componentes
- Reducer pattern para ações complexas

### 🎮 Otimizações dos Jogos

- Hooks de performance (debounce, throttle)
- Memoização de funções custosas
- Otimização de re-renders
- Sistema de scores centralizado

### 🎨 UI/UX Melhorias

- Loading spinner durante navegações
- Error boundary com fallback elegante
- Animações suaves e transições
- Design responsivo aprimorado

## 🚀 Como Executar

1. **Instalar dependências:**

   ```bash
   npm install
   ```

2. **Executar em desenvolvimento:**

   ```bash
   npm run dev
   ```

3. **Build para produção:**
   ```bash
   npm run build
   ```

## 📁 Estrutura do Projeto

```
src/
├── App.jsx                    # Ponto de entrada com roteamento
├── context/
│   └── AppContext.jsx         # Context API global
├── components/
│   ├── LoadingSpinner.jsx     # Componente de loading
│   └── ErrorBoundary.jsx      # Tratamento de erros
├── hooks/
│   ├── useGameScore.js        # Hook para scores
│   └── useGamePerformance.js  # Hook para performance
├── config/
│   └── constants.js           # Constantes centralizadas
├── pages/
│   ├── MainPage.jsx           # Página principal
│   ├── GamePage.jsx           # Página de jogos
│   ├── ItemPage.jsx           # Página de item individual
│   └── components/            # Componentes de página
└── gamesPageComponents/
    ├── App.jsx                # Gerenciador de jogos
    └── components/games/      # Jogos individuais
```

## 🎯 Tecnologias Utilizadas

- **React 19.1.0** - Framework principal
- **React Router DOM 6.28.0** - Roteamento
- **Tailwind CSS 3.4.3** - Estilização
- **Vite 7.0.4** - Build tool
- **Lucide React** - Ícones
- **Radix UI** - Componentes de UI

## 🔧 Configurações

### Performance

- Debounce delay: 150ms
- Throttle limit: 100ms
- Loading delay: 300ms

### Jogos

- Snake: 20x20 grid, velocidade 150ms
- Maze: 15x15 grid, geração procedural
- Sliding Puzzle: 4x4 grid, 15 peças

## 📝 Próximas Melhorias

- [ ] Testes automatizados
- [ ] PWA (Progressive Web App)
- [ ] Internacionalização
- [ ] Temas escuro/claro
- [ ] Mais jogos temáticos
- [ ] Sistema de conquistas

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.



