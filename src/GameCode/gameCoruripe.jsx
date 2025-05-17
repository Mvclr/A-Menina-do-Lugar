import React, { useState } from "react";
import { Button } from "../components/ui/button.jsx";
import { Card } from "../components/ui/card.jsx";
import styles from "./game.module.css";

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

export default function CocadaGame() {
  const [position, setPosition] = useState(1);
  const [message, setMessage] = useState("");
  const [waitingTurns, setWaitingTurns] = useState(0);
  const [lastRoll, setLastRoll] = useState(null);

  const rollDice = () => Math.floor(Math.random() * 6) + 1;

  const handlePlay = () => {
    if (waitingTurns > 0) {
      setWaitingTurns(waitingTurns - 1);
      setMessage("Esperando rodada...");
      return;
    }

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
      }
    } else {
      setMessage(`Avançou ${roll} casas.`);
    }

    setPosition(newPosition);
  };

  return (



    <div className={styles.container}>
      
      <Card className={styles.card}>
        <h1 className={styles.title}>Jogo Coruripe</h1>
        <img src="src/assets/Jogos/Jogo_Coruripe.png" alt="Tabuleiro" width={1000} height={500} className={styles.boardImage} />
        <p>Casa atual: {position}</p>
        <p>Resultado do dado: {lastRoll ?? "-"}</p>
        {/* Replace motion.div with div if not using Framer Motion */}
        <div className={styles.status}> 
          {message}
        </div>
        {position < boardSize && <Button onClick={handlePlay}>Jogar dado</Button>}
        <button>Reiniciar jogo</button>
      </Card>
      
    </div>
  );
}