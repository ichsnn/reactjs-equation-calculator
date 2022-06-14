import React from "react";
import { useState } from "react";

const Home = () => {
  const defaultRow = 3;
  const defaultCol = 4;
  const [row, setRow] = useState(defaultRow);
  const [col, setCol] = useState(defaultCol);

  const handleRowChange = (rowValue) => {
    setRow(rowValue);
  };

  const handleColChange = (colValue) => {
    setCol(colValue);
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-3xl font-bold mb-6">Gauss Calculator</h1>
      <div className="mb-4">
        <MatriksSizeInput
          onColChange={handleColChange}
          onRowChange={handleRowChange}
          defaultRow={defaultRow}
          defaultCol={defaultCol}
        />
      </div>
      <div>
        <MatriksInput row={row} col={col} />
      </div>
    </div>
  );
};
export default Home;

function MatriksSizeInput(props) {
  const [row, setRow] = useState(props.defaultRow);
  const [col, setCol] = useState(props.defaultCol);
  const handleRowChange = (e) => {
    setRow(e.target.value);
  };

  const handleColChange = (e) => {
    setCol(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRowChange(row);
    props.onColChange(col);
  };

  const handleReset = (e) => {
    setRow(props.defaultRow);
    setCol(props.defaultCol);
    props.onRowChange(props.defaultRow);
    props.onColChange(props.defaultCol);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="flex flex-col gap-2"
    >
      <div className="flex gap-6">
        <SizeInput
          onValueChange={handleRowChange}
          defaultValue={props.defaultRow}
          name="row"
          label="Row"
        />
        <SizeInput
          onValueChange={handleColChange}
          defaultValue={props.defaultCol}
          name="col"
          label="Col"
        />
      </div>
    </form>
  );
}

function SizeInput(props) {
  const handleDecrease = (e) => {
    console.log(props.row)
  };

  const handleIncrease = (e) => {
    console.log(props.row)
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={props.name} className="font-semibold">
        {props.label} :{" "}
      </label>
      <div className="flex">
        <div className="flex flex-col">
          <button
            type="button"
            onClick={handleDecrease}
            className="border font-semibold aspect-square border-slate-300 inline-flex items-center justify-center w-6"
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
          defaultValue={props.defaultValue}
          contentEditable
          onChange={props.onValueChange}
          disabled
          required
        />
        <div className="flex flex-col">
          <button
            type="button"
            onClick={handleIncrease}
            className="border font-semibold aspect-square border-slate-300 inline-flex items-center justify-center w-6"
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
      MatriksColumn.push(<MatriksCol key={j} name={`matriks[${i}][${j}]`} />);
    }
    MatriksBoxRender.push(<MatriksRow key={i}>{MatriksColumn}</MatriksRow>);
  }
  return <div>{MatriksBoxRender}</div>;
}

function MatriksInput(props) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Input Your Matriks : </h2>
      <form>
        <div className="mb-2">
          <RenderBoxInput row={props.row} col={props.col} />
        </div>
        <div className="flex flex-col gap-2 justify-end">
          <button
            type="submit"
            className="bg-sky-600 text-white font-semibold px-4 py-1 rounded-md w-full"
          >
            Solve
          </button>
          <button
            type="reset"
            className="bg-red-600 text-white font-semibold px-4 py-1 rounded-md w-full"
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
  return (
    <input
      className="flex-1 flex pl-2 border border-slate-300 w-full focus:outline-sky-600"
      type="number"
      name={props.name}
      id={props.name}
      title={props.name}
      required
      defaultValue={0}
    />
  );
}
