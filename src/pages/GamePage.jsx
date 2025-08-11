import React from 'react';
import GameApp from "./gamesPageComponents/GamePageMain.jsx";
import Header from './pagesComponents/Header.jsx';
import Footer from './pagesComponents/Footer.jsx';
// Página Principal
const GamePage = () => {
  return (
    <div className="min-h-screen">
      <Header currentPage="game" setCurrentPage={() => {}} />
        <GameApp/>
      <Footer setCurrentPage={() => {}} />
    </div>
  );
};

export default GamePage;
