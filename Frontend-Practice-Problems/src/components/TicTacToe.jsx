import React, { useState } from "react";
import "./TicTacToe.scss";

const initialBoard = new Array(9).fill(null);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

function TicTacToe() {
  const [board, setBoard] = useState(initialBoard);
  const [isNextX, setIsNextX] = useState("X");

  const winner = calculateWinner(board);
  const isDraw = board.every((cell) => cell !== null) && !winner;
  const currentPlayer = isNextX ? "X" : "O";

  const playTurn = (index) => {
    if (board[index] || winner) return;
    const nextBoard = [...board];
    nextBoard[index] = currentPlayer;
    setBoard(nextBoard);
    setIsNextX(!isNextX);
  };

  const handleReset = () => {
    setBoard(initialBoard);
    setIsNextX(true);
  };

  const getStatusMessage = () => {
    if (winner) return `Winner: ${winner}`;
    if (isDraw) return "It's a Draw!";
    return `Next player: ${currentPlayer}`;
  };
  
  return (
    <div className="container">
      <h3 aria-aria-live="polite">{getStatusMessage()}</h3>
      <div className="board">
        {board.map((value, i) => {
          return (
            <button keu={i} onClick={() => playTurn(i)} className="cell">
              {value}
            </button>
          );
        })}
      </div>
      <button className="reset-btn" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

export default TicTacToe;
