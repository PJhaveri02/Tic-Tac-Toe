import { useState } from 'react';
import { Board } from './Components/Board';
import { Player, PlayerSymbol } from './Interfaces/Player';

export const Game = () => {
  const [playerOne, setPlayerOne] = useState<Player>({ playerSymbol: PlayerSymbol.X, score: 0 });
  const [playerTwo, setPlayerTwo] = useState<Player>({ playerSymbol: PlayerSymbol.Y, score: 0 });
  const [gameOver, setGameOver] = useState(false);

  return (
    <div>
      <h1>Tic-Tac-Toe</h1>
      <Board
        playerOne={playerOne}
        playerTwo={playerTwo}
        setPlayerOne={setPlayerOne}
        setPlayerTwo={setPlayerTwo}
        gameOver={gameOver}
        setGameOver={setGameOver}
      />
      <h3>Scores:</h3>
      <div>Player One: {playerOne.score}</div>
      <div>Player Two: {playerTwo.score}</div>
    </div>
  );
};
