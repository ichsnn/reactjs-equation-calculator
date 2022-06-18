import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Solution from "../components/Solution";

const Home = () => {
  const defaultRow = 3;
  const defaultCol = 4;
  const [row, setRow] = useState(defaultRow);
  const [col, setCol] = useState(defaultCol);
  const [matriks, setMatriks] = useState(
    Array.from({ length: row }, () => Array.from({ length: col }, () => 0))
  );
  const [tempMatriks, setTempMatriks] = useState(
    Array.from({ length: row }, () => Array.from({ length: col }, () => 0))
  );
  const [showSolution, setShowSolution] = useState(false);

  const handleRowChange = (rowValue) => {
    setRow(rowValue);
  };

  const handleColChange = (colValue) => {
    setCol(colValue);
  };

  const handleMatriksSubmit = () => {
    setMatriks(matriks);
    setShowSolution(true);
  };

  const handleMatriksChange = (matriksValue, row, col) => {
    const copy = [...matriks];
    copy[row][col] = matriksValue;
    setTempMatriks(copy);
  };

  useEffect(() => {
    setMatriks(tempMatriks);
  }, [matriks, tempMatriks]);

  useEffect(() => {
    const array = Array.from({ length: row }, () =>
      Array.from({ length: col }, () => 0)
    );
    setMatriks(array);
  }, [row, col]);

  return (
    <div className="container mx-auto p-4 max-w-md">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-center mb-4">
          Gauss Calculator
        </h1>
        <p>
          This calculator will help you to solve a system of linear equations
          using Gauss-Jordan elimination.
        </p>
      </div>
      <div className="mb-4">
        <MatriksSizeInput
          onColChange={handleColChange}
          onRowChange={handleRowChange}
          defaultRow={defaultRow}
          defaultCol={defaultCol}
        />
      </div>
      <div>
        <MatriksInput
          row={row}
          col={col}
          onMatriksSubmit={handleMatriksSubmit}
          onMatriksChange={handleMatriksChange}
        />
      </div>
      <div>{showSolution ? <Solution matriks={matriks} /> : null}</div>
    </div>
  );
};
export default Home;

function MatriksSizeInput(props) {
  const [row, setRow] = useState(props.defaultRow);
  const [col, setCol] = useState(props.defaultCol);

  const handleRowIncrease = (e) => {
    if (row < 6) {
      setRow(row + 1);
    }
  };

  const handleRowDecrease = (e) => {
    if (row > 2) {
      setRow(row - 1);
    }
  };

  const handleColIncrease = (e) => {
    if (col < 6) setCol(col + 1);
  };

  const handleColDecrease = (e) => {
    if (col > 2) setCol(col - 1);
  };

  useEffect(() => {
    props.onColChange(col);
    props.onRowChange(row);
  });

  return (
    <div className="flex gap-2 justify-between">
      <h2 className="text-xl font-bold">Input Your Matriks : </h2>
      <form className="flex flex-col gap-2 items-center">
        <div className="flex gap-2">
          <SizeInput
            onValueIncrease={handleRowIncrease}
            onValueDecrease={handleRowDecrease}
            value={row}
            name="row"
            label="Row"
          />
          <div className="font-bold">×</div>
          <SizeInput
            onValueIncrease={handleColIncrease}
            onValueDecrease={handleColDecrease}
            value={col}
            name="col"
            label="Col"
          />
        </div>
      </form>
    </div>
  );
}

function SizeInput(props) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        <div className="flex flex-col">
          <button
            type="button"
            onClick={props.onValueDecrease}
            className="border font-semibold aspect-square border-slate-300 inline-flex items-center justify-center w-6 text-slate-300 hover:text-slate-700"
          >
            -
          </button>
        </div>
        <input
          className="bg-white-300 border font-semibold border-slate-300 focus:outline-sky-600 text-center w-[3ch]"
          id={props.name}
          inputMode={"numeric"}
          pattern={"[0-9]*"}
          name={props.name}
          min={2}
          max={6}
          value={props.value}
          contentEditable
          disabled
          required
        />
        <div className="flex flex-col">
          <button
            type="button"
            onClick={props.onValueIncrease}
            className="border font-semibold aspect-square border-slate-300 inline-flex items-center justify-center w-6 text-slate-300 hover:text-slate-700"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

function RenderBoxInput(props) {
  const MatriksBoxRender = [];
  for (let i = 0; i < props.row; i++) {
    const MatriksColumn = [];
    for (let j = 0; j < props.col; j++) {
      MatriksColumn.push(
        <MatriksCol
          key={j}
          name={`matriks[${i}][${j}]`}
          onValueChange={props.onValueChange}
          row={i}
          col={j}
        />
      );
    }
    MatriksBoxRender.push(<MatriksRow key={i}>{MatriksColumn}</MatriksRow>);
  }
  return <div>{MatriksBoxRender}</div>;
}

function MatriksInput(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onMatriksSubmit();
  };

  const handleMatriksChange = (matriksValue, row, col) => {
    props.onMatriksChange(matriksValue, row, col);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <RenderBoxInput
            row={props.row}
            col={props.col}
            onValueChange={handleMatriksChange}
          />
        </div>
        <div className="flex flex-col gap-2 justify-end">
          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 active:ring-4 text-white font-semibold px-4 py-1 rounded-md w-full"
          >
            Solve
          </button>
          <button
            type="reset"
            className="bg-red-600 hover:bg-red-700 active:ring-4 text-white font-semibold px-4 py-1 rounded-md w-full"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

function MatriksRow(props) {
  return <div className="flex w-full">{props.children}</div>;
}

function MatriksCol(props) {
  const handleChange = (e) => {
    console.log(props);
    props.onValueChange(+e.target.value, props.row, props.col);
  };
  return (
    <input
      className="flex-1 flex pl-2 border border-slate-300 w-full focus:outline-sky-600 text-center"
      type="number"
      name={props.name}
      id={props.name}
      title={props.name}
      required
      defaultValue={0}
      onChange={handleChange}
    />
  );
}
