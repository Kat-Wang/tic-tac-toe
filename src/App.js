import { useState } from "react";

function Square({ value, onClick }) {
  console.log({ onClick });
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Board({ xTurn, currentSquares, handlePlay }) {
  const onSquareClick = (i) => {
    if (currentSquares[i] || calculateWinner(currentSquares)) {
      return;
    }

    const valuesCopy = currentSquares.slice();

    if (xTurn) {
      valuesCopy[i] = "X";
    } else {
      valuesCopy[i] = "O";
    }
    handlePlay(valuesCopy);
  };

  const winner = calculateWinner(currentSquares);

  let status;

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xTurn ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={currentSquares[0]} onClick={() => onSquareClick(0)} />
        <Square value={currentSquares[1]} onClick={() => onSquareClick(1)} />
        <Square value={currentSquares[2]} onClick={() => onSquareClick(2)} />
      </div>
      <div className="board-row">
        <Square value={currentSquares[3]} onClick={() => onSquareClick(3)} />
        <Square value={currentSquares[4]} onClick={() => onSquareClick(4)} />
        <Square value={currentSquares[5]} onClick={() => onSquareClick(5)} />
      </div>
      <div className="board-row">
        <Square value={currentSquares[6]} onClick={() => onSquareClick(6)} />
        <Square value={currentSquares[7]} onClick={() => onSquareClick(7)} />
        <Square value={currentSquares[8]} onClick={() => onSquareClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [xTurn, setXTurn] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function onPlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXTurn(!xTurn);
  }

  function jumpTo(nextMove) {
    //todo
  }

  const moves = history.map((squares, move) => {
    let description;

    if (move > 0) {
      description = "Go to move: " + move;
    } else {
      description = "Go to game start";
    }

    <li>
      <button onClick={() => jumpTo(move)}>{description}</button>
    </li>;
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xTurn={xTurn}
          currentSquares={currentSquares}
          handlePlay={onPlay}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
