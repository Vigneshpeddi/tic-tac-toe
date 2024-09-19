import React, { useState, useEffect } from "react";
import axios from 'axios';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [gameId, setGameId] = useState(null);
  useEffect(() => {
    const createGame = async () => {
      const response = await axios.post('http://localhost:3000/api/game');
      setGameId(response.data.id);
      setBoard(response.data.board);
      setWinner(response.data.winner);
    }
    createGame();
  }, []);
  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = board.slice();
    newBoard[index] = 'X';
    setBoard(newBoard);
    checkWinner(newBoard);
    updateGame(newBoard);
  }
  const checkWinner = (squares) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinner(squares[a]);
        break;
      }
    }
  };
  const updateGame = async (newBoard) => {
    await axios.put(`http://localhost:3000/api/game/${gameId}`, {
      board: newBoard,
      winner
    });
  };
  const renderSquare = (index) => {
    return (
        <button className="square" onClick={() => handleClick(index)}>
          {board[index]}
        </button>
    );
  };
  return (
      <div className="game">
        <div className="status">{winner ? `Winner: ${winner}` : 'Next player: X'}</div>
        <div className="board">
          {[0, 1, 2].map((row) => (
              <div key={row} className="board-row">
                {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
              </div>
          ))}
        </div>
      </div>
  );
}
export default App;