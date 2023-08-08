import { useState } from "react";

function Square({ value, onClick }) {
  console.log({ onClick });
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

export default function Board() {
  // return "hello world";
  const [values, setValues] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);

  let status;
  if (calculateWinner(values)) {
    status = "Winner: " + calculateWinner(values);
  } else {
    status = "Next Player: " + (xTurn ? "X" : "O");
  }

  const onSquareClick = (i) => {
    if (values[i] || calculateWinner(values)) {
      return;
    }
    let valuesCopy = values.slice();

    if (xTurn) {
      valuesCopy[i] = "X";
    } else {
      valuesCopy[i] = "O";
    }
    setValues(valuesCopy);
    setXTurn(!xTurn);
  };

  return (
    <>
      <div className="board-row">
        <Square value={values[0]} onClick={() => onSquareClick(0)} />
        <Square value={values[1]} onClick={() => onSquareClick(1)} />
        <Square value={values[2]} onClick={() => onSquareClick(2)} />
      </div>
      <div className="board-row">
        <Square value={values[3]} onClick={() => onSquareClick(3)} />
        <Square value={values[4]} onClick={() => onSquareClick(4)} />
        <Square value={values[5]} onClick={() => onSquareClick(5)} />
      </div>
      <div className="board-row">
        <Square value={values[6]} onClick={() => onSquareClick(6)} />
        <Square value={values[7]} onClick={() => onSquareClick(7)} />
        <Square value={values[8]} onClick={() => onSquareClick(8)} />
      </div>
      <div className="status">{status}</div>
    </>
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
