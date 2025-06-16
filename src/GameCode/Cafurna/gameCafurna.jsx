import React, { useState } from "react";
import { Button } from "../../components/ui/button.jsx";
import { Card } from "../../components/ui/card.jsx";
import styles from "./game.module.css";
import diceStyles from "../diceStyles.module.css";
const boardSize = 30;

const events = {
  3: {
    type: "wait",
    message: "Cafurna está em casa, Tinoco chegou e bagunçou tudo! FIQUE 1 RODADA SEM JOGAR.",
    turns: 1
  },
  5: {
    type: "advance",
    message: "Lua ficou encantada com o nome Cafurna. AVANCE 2 CASAS!",
    move: 2
  },
  8: {
    type: "wait",
    message: "Elas ficaram observando a Jaqueira, símbolo de resistência. FIQUE 1 RODADA SEM JOGAR.",
    turns: 1
  },
  10: {
    type: "advance",
    message: "Lua está encantada com a mata. AVANCE 1 CASA!",
    move: 1
  },
  12: {
    type: "wait",
    message: "Brincaram tanto que perderam a hora! FIQUE 1 RODADA SEM JOGAR.",
    turns: 1
  },
  15: {
    type: "back",
    message: "Tinoco assustou Lua! VOLTE 1 CASA.",
    move: -1
  },
  17: {
    type: "advance",
    message: "Conversaram bastante na casa da avó. AVANCE 3 CASAS!",
    move: 3
  },
  20: {
    type: "bonus",
    message: "Lua ganhou um presente mágico. JOGUE NOVAMENTE!"
  },
  22: {
    type: "back",
    message: "Chegou a hora de lavar os pratos. VOLTE 1 CASA.",
    move: -1
  },
  24: {
    type: "goto",
    message: "Hora de dançar o Toré! AVANCE PARA O TORÉ!",
    to: 27
  }
};


function CafurnaGame() {
  const [position, setPosition] = useState(1);
  const [message, setMessage] = useState("");
  const [waitingTurns, setWaitingTurns] = useState(0);
  const [lastRoll, setLastRoll] = useState(null);
  const [isRolling, setIsRolling] = useState(false);


  const rollDice = () => Math.floor(Math.random() * 6) + 1;
  const resetGame = () => {
    setPosition(1);
    setMessage("");
    setWaitingTurns(0);
    setLastRoll(null);
  };
  const handleReset = () => {
    resetGame();
  };
  
  const handlePlay = () => {
  if (waitingTurns > 0) {
    setWaitingTurns(waitingTurns - 1);
    setMessage("Esperando rodada...");
    return;
  }

  // Reinicia animação
  setIsRolling(false); // remove classe
  setTimeout(() => setIsRolling(true), 10); // adiciona classe com delay mínimo

  const roll = rollDice();
  setLastRoll(roll);
  let newPosition = position + roll;

  if (newPosition >= boardSize) {
    setMessage("Parabéns! Você chegou na casa da vovó!");
    setPosition(boardSize);
    return;
  }

  const event = events[newPosition];
  if (event) {
    if (event.type === "wait") {
      setWaitingTurns(event.turns);
      setMessage(event.message);
    } else if (event.type === "advance") {
      newPosition += event.move;
      setMessage(event.message);
    } else if (event.type === "back") {
      newPosition = event.to;
      setMessage(event.message);
    } else if (event.type === "condition") {
      if (!event.condition(roll)) {
        setMessage(event.message + " Você não pode andar!");
        return;
      } else {
        setMessage(event.message + " Você conseguiu negociar!");
      }
    } else if (event.type === "bonus") {
      setMessage(event.message);
      return;
    }
  } else {
    setMessage(`Avançou ${roll} casas.`);
  }

  setPosition(newPosition);
};


  return (



    <div className={styles.container}>
    
      <Card className={styles.card}>
  <h1 className={styles.title}>Jogo Cafurna</h1>
  <img src="src/assets/Jogos/Jogo_Cafurna.png" alt="Tabuleiro" width={1000} height={500} className={styles.boardImage}/>
  <p>Casa atual: {position}</p>
  <p>Resultado do dado: {lastRoll ?? "-"}</p>
  <div className={styles.status}>{message}</div>

  {/* 🎲 Dado 3D */}
  <div className={diceStyles.diceContainer}>
    <div className={`${diceStyles.dice} ${isRolling ? diceStyles.spin : ""}`}>
      <div className={diceStyles.face + " " + diceStyles.front}>{lastRoll ?? "?"}</div>
      <div className={diceStyles.face + " " + diceStyles.back}>{lastRoll ?? "?"}</div>
      <div className={diceStyles.face + " " + diceStyles.right}>{lastRoll ?? "?"}</div>
      <div className={diceStyles.face + " " + diceStyles.left}>{lastRoll ?? "?"}</div>
      <div className={diceStyles.face + " " + diceStyles.top}>{lastRoll ?? "?"}</div>
      <div className={diceStyles.face + " " + diceStyles.bottom}>{lastRoll ?? "?"}</div>
    </div>
  </div>

  {/* Botões */}
  <div>
    {position < boardSize && <Button onClick={handlePlay}>Jogar dado</Button>}
    <button onClick={handleReset}>Reiniciar jogo</button>
  </div>
</Card>

    </div>
  );
}


export default CafurnaGame;