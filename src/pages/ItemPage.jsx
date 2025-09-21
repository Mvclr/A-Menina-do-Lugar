import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { BookOpen, Gamepad2, ArrowLeft, HelpCircle } from "lucide-react";

import Header from "./pagesComponents/Header.jsx";
import Footer from "./pagesComponents/Footer.jsx";
import Quiz from "./ItemPageComponents/Quiz.jsx";

import { gamesData } from "./gamesPageComponents/gamesData.js";
import { quizData } from "../config/quizData.js";

const ItemPage = () => {
  const { id } = useParams();
  const { items, selectedItem } = useApp();
  const [isGameVisible, setGameVisible] = useState(false);
  const [isPdfVisible, setPdfVisible] = useState(false);
  const [isQuizVisible, setQuizVisible] = useState(false);

  const item = selectedItem || items.find((item) => item.id === parseInt(id));

  if (!item) {
    return <Navigate to="/" replace />;
  }

  const gameData = gamesData.find(game => game.id === item.gameId);
  const currentQuizData = quizData[item.id];

  const GameComponent = gameData ? gameData.component : null;

  const showGame = () => setGameVisible(true);
  const hideGame = () => setGameVisible(false);
  const showPdf = () => setPdfVisible(true);
  const hidePdf = () => setPdfVisible(false);
  const showQuiz = () => setQuizVisible(true);
  const hideQuiz = () => setQuizVisible(false);

  return (
    <div className="min-h-screen bg-aml-light dark:bg-aml-darker flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-6 py-12">
        {isGameVisible && GameComponent ? (
          <div>
            <button onClick={hideGame} className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium">
              <ArrowLeft size={20} />
              Voltar
            </button>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 md:p-8">
              <GameComponent />
            </div>
          </div>
        ) : isPdfVisible ? (
          <div>
            <button onClick={hidePdf} className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium">
              <ArrowLeft size={20} />
              Voltar
            </button>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
              <iframe src={item.pdfUrl} title={`PDF do livro ${item.name}`} className="w-full h-screen border-none"></iframe>
            </div>
          </div>
        ) : isQuizVisible ? (
          <div>
            <button onClick={hideQuiz} className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium">
              <ArrowLeft size={20} />
              Voltar
            </button>
            <Quiz quizData={currentQuizData} />
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-200 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {item.name}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
              Explore a história original, divirta-se com o jogo e teste seus conhecimentos com o quiz!
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div onClick={showPdf} className="text-left cursor-pointer">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 group h-full">
                  <img src={item.image} alt={item.name} className="w-full h-64 object-fill" />
                  <div className="p-6 flex flex-col">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">{item.name}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">{item.description}</p>
                    <span className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-3 group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300 mt-auto">
                      <BookOpen size={20} />
                      Ler Livro
                    </span>
                  </div>
                </div>
              </div>

              {gameData && (
                <div onClick={showGame} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group h-full text-left">
                  <div className={`h-64 bg-gray-900 flex items-center justify-center relative overflow-hidden`}>
                    <div className="text-8xl text-white group-hover:scale-110 transition-transform duration-300">
                      {gameData.icon}
                    </div>
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-lg px-3 py-1 rounded-full text-white text-sm font-medium">
                      {gameData.difficulty}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">{gameData.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">{gameData.description}</p>
                    <span className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-3 group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300 mt-auto">
                      <Gamepad2 size={20} />
                      Jogar Agora
                    </span>
                  </div>
                </div>
              )}

              <div onClick={showQuiz} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group h-full text-left">
                 <div className={`h-64 bg-gray-900 flex items-center justify-center relative overflow-hidden`}>
                  <div className="text-8xl text-white group-hover:scale-110 transition-transform duration-300">
                    <HelpCircle size={80} />
                  </div>
                </div>
                <div className="p-6 flex flex-col">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">Quiz Rápido</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">Teste seus conhecimentos sobre a história de {item.name}!</p>
                  <span className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-3 group-hover:from-green-400 group-hover:to-teal-400 transition-all duration-300 mt-auto">
                    <HelpCircle size={20} />
                    Fazer o Quiz
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ItemPage;
