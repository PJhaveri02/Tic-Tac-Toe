import { useState, useRef } from 'react';
import { Player, PlayerSymbol } from '../Interfaces/Player';
import { Square } from './Square';

interface Props {
  playerOne: Player;
  playerTwo: Player;
  setPlayerOne: React.Dispatch<React.SetStateAction<Player>>;
  setPlayerTwo: React.Dispatch<React.SetStateAction<Player>>;
  gameOver: boolean;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Board: React.FC<Props> = ({
  playerOne,
  playerTwo,
  setPlayerOne,
  setPlayerTwo,
  gameOver,
  setGameOver,
}) => {
  const [squares, setSquares] = useState<string[] | null[]>(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const waitForUpdateScore = useRef(false);

  const handleClick = (i: number) => {
    const squaresTemp = squares.slice();

    if (calculateWinner() || squares[i]) {
      setSquares(Array(9).fill(null));
      setGameOver(false);
      return;
    }

    squaresTemp[i] = xIsNext ? playerOne.playerSymbol : playerTwo.playerSymbol;

    setSquares(squaresTemp);
    setXisNext((prev) => !prev);
  };

  const renderSquare = (i: number) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  const determineStatus = (): string => {
    const nextPlayerText = `Next Player: ${
      xIsNext ? playerOne.playerSymbol : playerTwo.playerSymbol
    }`;
    if (gameOver) return nextPlayerText;
    const winner = calculateWinner();
    return winner ? `Winner: ${winner}` : nextPlayerText;
  };

  const calculateWinner = (): string | null => {
    if (gameOver || waitForUpdateScore.current) {
      return null;
    }

    const winningMoves = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningMoves.length; i++) {
      const [a, b, c] = winningMoves[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        if (squares[a] === playerOne.playerSymbol) {
          console.log('a');
          updatePlayer(PlayerSymbol.X);
        } else {
          updatePlayer(PlayerSymbol.Y);
        }
        return squares[a];
      }
    }

    return null;
  };

  const updatePlayer = (playerSymbol: PlayerSymbol) => {
    waitForUpdateScore.current = true;
    if (playerSymbol === playerOne.playerSymbol) {
      setPlayerOne((prevPlayer) => ({
        ...prevPlayer,
        score: prevPlayer.score + 1,
      }));
    } else {
      setPlayerTwo((prevPlayer) => ({ ...prevPlayer, score: prevPlayer.score + 1 }));
    }
    setGameOver(true);
    waitForUpdateScore.current = false;
  };

  return (
    <div>
      <div className='status'>
        <h3>{determineStatus()}</h3>
      </div>
      <div className='board-row'>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className='board-row'>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className='board-row'>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};
