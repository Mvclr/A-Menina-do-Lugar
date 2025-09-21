import React, { useState } from 'react';

const Quiz = ({ quizData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  if (showScore) {
    return (
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Quiz Finalizado!</h2>
        <p className="text-lg dark:text-gray-300">Sua pontuação: {score} de {quizData.questions.length}</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">{quizData.title}</h2>
      <div className="mb-6">
        <h3 className="text-lg font-semibold dark:text-gray-200">{quizData.questions[currentQuestion].questionText}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quizData.questions[currentQuestion].answerOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(option.isCorrect)}
            className="w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-200"
          >
            {option.answerText}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
