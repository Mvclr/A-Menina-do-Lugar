import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const casasEspeciais = {
  3: { acao: 'espere', texto: 'Você ficou admirando a escadaria da Matriz. Espere 1 rodada.' },
  5: { acao: 'avancar', valor: 3, texto: 'Você comprou um chapéu! Avance 3 casas.' },
  9: { acao: 'condicional', texto: 'Negocie o leite de coco! Só avança se tirar menos que 4.' },
  13: { acao: 'espere', texto: 'Mestra Maria do Cordeiro está cantando. Espere 1 rodada.' },
  15: { acao: 'espere', texto: 'Sacola rompeu! Espere 1 rodada.' },
  18: { acao: 'avancar', valor: 2, texto: 'Você encontrou artesãs! Avance 2 casas.' },
  21: { acao: 'espere', texto: 'Parou para admirar o farol. Espere 1 rodada.' },
  24: { acao: 'avancar', valor: 2, texto: 'Pegou carona na jangada! Avance 2 casas.' },
  26: { acao: 'voltar', valor: 9, texto: 'Esqueceu o coco ralado! Volte para a casa 17.' }
};

const JogoCocada = () => {
  const [posicao, setPosicao] = useState(1);
  const [mensagem, setMensagem] = useState('');
  const [esperarRodada, setEsperarRodada] = useState(false);

  const rolarDado = () => {
    if (esperarRodada) {
      setMensagem('Você perdeu a rodada!');
      setEsperarRodada(false);
      return;
    }

    const dado = Math.floor(Math.random() * 6) + 1;
    let novaPosicao = posicao + dado;
    setMensagem(`Você tirou ${dado}!`);

    if (novaPosicao >= 30) {
      setPosicao(30);
      setMensagem('Parabéns! Você chegou na casa da vovó!');
      return;
    }

    const evento = casasEspeciais[novaPosicao];
    if (evento) {
      switch (evento.acao) {
        case 'espere':
          setMensagem(evento.texto);
          setEsperarRodada(true);
          break;
        case 'avancar':
          novaPosicao += evento.valor;
          setMensagem(evento.texto);
          break;
        case 'voltar':
          novaPosicao = evento.valor;
          setMensagem(evento.texto);
          break;
        case 'condicional':
          if (dado < 4) {
            setMensagem('Você negociou bem! Pode avançar.');
          } else {
            novaPosicao = posicao; // não avança
            setMensagem('Leite de coco caro! Espere a próxima rodada.');
          }
          break;
        default:
          break;
      }
    }

    setPosicao(novaPosicao);
  };

  return (
    <div className="p-4 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Jogo da Cocada</h1>
      <p className="text-lg mb-2">Você está na casa {posicao}</p>
      <Button onClick={rolarDado}>Rolar Dado</Button>
      <p className="mt-4 text-blue-700 font-semibold">{mensagem}</p>
      {posicao === 30 && <p className="text-green-600 font-bold">Você ganhou!</p>}
    </div>
  );
};

export default JogoCocada;
