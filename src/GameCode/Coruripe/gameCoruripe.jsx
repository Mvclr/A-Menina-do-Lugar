import React, { useState } from "react";
import { Button } from "../../components/ui/button.jsx";
import { Card } from "../../components/ui/card.jsx";
import styles from "./game.module.css";
import diceStyles from "../diceStyles.module.css";
const boardSize = 30;

const events = {
  3: { type: "wait", message: "A escadaria da igreja da matriz é tão linda que você se distraiu enquanto a observava.", turns: 1 },
  6: { type: "advance", message: "Você comprou um chapéu para se proteger do sol e pode andar mais rápido.", move: 3 },
  9: { type: "condition", message: "Você chegou na feira, mas o leite de coco está caro. Negocie com o feirante e na próxima rodada só avance se tirar um número menor que 4.", condition: roll => roll < 4 },
  13: { type: "wait", message: "A Mestra Maria do Padeiro está cantando uma música de baiana.", turns: 1 },
  15: { type: "wait", message: "A alça da sacola rompeu e as compras caíram no chão.", turns: 1 },
  18: { type: "advance", message: "Que sorte! As artesãs consertaram sua sacola.", move: 2 },
  21: { type: "wait", message: "Você parou para admirar a paisagem do Farol de Coruripe.", turns: 1 },
  24: { type: "advance", message: "Você pegou carona na jangada.", move: 2 },
  26: { type: "back", message: "Você esqueceu o coco ralado! Volte para a casa 9.", to: 9 },
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
  <img src="src/assets/Jogos/Jogo_Coruripe.png" alt="Tabuleiro" width={1000} height={500} className={styles.boardImage}/>
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



