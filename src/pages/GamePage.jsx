import React from "react";
import GameApp from "./gamesPageComponents/App.jsx";
import Header from "./pagesComponents/Header.jsx";
import Footer from "./pagesComponents/Footer.jsx";

// Página Principal
const GamePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <GameApp />
      <Footer />
    </div>
  );
};

export default GamePage;
