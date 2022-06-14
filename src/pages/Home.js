import React from 'react';
import { useState } from 'react';

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
        <div>
            <h1>Gauss Calculator</h1>
            <MatriksSizeInput
                onColChange={handleColChange}
                onRowChange={handleRowChange}
                defaultRow={defaultRow}
                defaultCol={defaultCol}
            />
            <MatriksInput row={row} col={col} />
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
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <SizeInput
                onValueChange={handleRowChange}
                defaultValue={props.defaultRow}
                name="row"
                label="Row"
            />
            <SizeInput
                onValueChange={handleColChange}
                defaultValue={props.defaultCol}
                name="row"
                label="Col"
            />
            <input type="submit" value={'Submit'} />
            <input type="reset" value={'Reset'} />
        </form>
    );
}

function SizeInput(props) {
    return (
        <div>
            <label htmlFor={props.name}>{props.label}</label>
            <input
                className="input-matriksSize"
                type="number"
                id={props.name}
                name={props.name}
                min={2}
                max={6}
                defaultValue={props.defaultValue}
                contentEditable
                onChange={props.onValueChange}
                required
            />
        </div>
    );
}

function MatriksInput(props) {
    const MatriksBoxRender = [];
    for (let i = 0; i < props.row; i++) {
        const MatriksColumn = [];
        for (let j = 0; j < props.col; j++) {
            MatriksColumn.push(
                <MatriksCol key={j} name={`matriks[${i}][${j}]`} />
            );
        }
        MatriksBoxRender.push(<MatriksRow key={i}>{MatriksColumn}</MatriksRow>);
    }
    return <div>{MatriksBoxRender}</div>;
}

function MatriksRow(props) {
    return <div className="matriks-row">{props.children}</div>;
}

function MatriksCol(props) {
    return <input type="number" name={props.name} id={props.name} title={props.name} required defaultValue={0} max="3" />;
}
