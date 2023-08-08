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

  const onSquareClick = (i) => {
    let valuesCopy = values.slice();
    valuesCopy[i] = "X";
    setValues(valuesCopy);
    console.log("lcikce");
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
    </>
  );
}
