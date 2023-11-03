import { useState, useLayoutEffect } from 'react';

import './App.css';

import Status from './Status';
import Head from './Head';

export default function Board() {
    let boardIn = Array(3).fill(0).map(() => Array(3).fill('square-empty'));
    const [board, setBoard] = useState(boardIn);
    const [step, setStep] = useState(0);
    const [hasWon, setHasWon] = useState(false);
    const [is2player, setIs2player] = useState(false);
    const [title, setTitle] = useState('X\'s Turn');

    const handlePlayerSelectChange = (event) => {
        setIs2player(event.target.value === "2");
    };

    const makePlayerMove = (x, y) => {
        if (step % 2 === 0 || is2player) {
            makeMove(x, y);
        }
    };

    const makeMove = (x, y) => {
        if ((board[x][y] === "square-empty" || board[x][y] === "circle-empty") && !hasWon) {
            let newBoard = board;
            newBoard[x][y] = step % 2 === 0 ? "square-filled" : "circle-filled";
            setBoard(newBoard);
            setStep(step + 1);
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (newBoard[i][j] === "square-empty" || newBoard[i][j] === "circle-empty") {
                        newBoard[i][j] = step % 2 === 0 ? "square-empty" : "circle-empty";
                    }
                }
            }

            updateBoard();

            const win = checkWin(newBoard);
            if (win) {
                setHasWon(true);
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        let isWinner = false;
                        for (let point of win) {
                            if (point.x === i && point.y === j) {
                                isWinner = true;
                            }
                        }
                        if (!isWinner) {
                            if (newBoard[i][j] === "square-filled") newBoard[i][j] = "square-empty";
                            if (newBoard[i][j] === "circle-filled") newBoard[i][j] = "circle-empty";
                        }
                    }
                }
                const point = win[0];
                const isX = newBoard[point.x][point.y] === "square-filled";
                updateTitle(isX ? "X Wins" : "O Wins", isX);
                setTimeout(() => {
                    updateBoard();
                }, 1000);
            }
            else if (step === 8) {
                updateTitle("Draw", false);
                setTimeout(() => {
                    updateBoard();
                }, 1000);
            }
            else {
                updateTitle(step % 2 === 0 ? "O's Turn" : "X's Turn", step % 2 === 0);
            }
        }
    };
    const checkWin = (board) => {
        let lines = [
            [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }],
            [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }],
            [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }],
            [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
            [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
            [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }],
            [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }],
            [{ x: 2, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }],
        ]
        for (let line of lines) {
            let [a, b, c] = line
            if (board[a.x][a.y] === board[b.x][b.y] &&
                board[a.x][a.y] === board[c.x][c.y] &&
                board[a.x][a.y] !== "square-empty" &&
                board[a.x][a.y] !== "circle-empty") {
                return line
            }
        }
    };

    const getWinner = (board) => {
        let hasWon = checkWin(board)
        if (hasWon) {
            let point = hasWon[0]
            let isX = board[point.x][point.y] === "square-filled"
            return isX ? 1 : -1
        }
    };

    const copyBoard = (board) => {
        return board.map(row => row.slice());
    };

    const MiniMax = (board, step) => {
        let score = getWinner(board)
        if (score) return { score: score * -1 }
        if (step === 9) return { score: 0 }
        let bestScore = step % 2 === 0 ? Infinity : -Infinity
        let bestMove = {}
        for (let i in board) {
            for (let j in board[i]) {
                if (board[i][j] === "square-empty" || board[i][j] === "circle-empty") {
                    let copiedBoard = copyBoard(board)
                    copiedBoard[i][j] = step % 2 === 0 ? "square-filled" : "circle-filled"
                    let result = MiniMax(copiedBoard, step + 1)
                    let score = result.score
                    if (step % 2 === 0) {
                        if (score < bestScore) {
                            bestScore = score
                            bestMove = { x: i, y: j }
                        }
                    } else {
                        if (score > bestScore) {
                            bestScore = score
                            bestMove = { x: i, y: j }
                        }
                    }
                }
            }
        }
        return { score: bestScore, move: bestMove }
    };

    const updateTitle = (name, isX) => {
        setTitle(name);
        updateIndividualTitle(name, isX);
    };

    const updateIndividualTitle = (name, isX) => {
        let element = document.getElementById(isX ? "status-1" : "status-2");
        if (element !== null) {
            element.innerHTML = name.toString();
        }
    };
    const updateBoard = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let element = document.getElementById(i + '-' + j);
                switch (board[i][j]) {
                    case 'square-empty':
                        element.className = "box square";
                        break;
                    case 'circle-empty':
                        element.className = "box circle";
                        break;
                    case 'square-filled':
                        element.className = "box square filled";
                        break;
                    case 'circle-filled':
                        element.className = "box circle filled";
                        break;
                }
            }
        }
    };

    useLayoutEffect(() => {
        if (!is2player && step % 2 === 1) {
            setTimeout(() => {
                let move = MiniMax(board, step).move;
                if (move) {
                    makeMove(move.x, move.y);
                }
            }, 500);
        }
    }, [board, step, is2player, makeMove, MiniMax]);


    const restart = () => {
        setBoard(boardIn);
        setStep(0);
        setHasWon(false);
        setTitle('X\'s Turn');
        updateBoard();
    };


    return (
        <>
            <Head/>
            <header>
                <select id="player-select" onChange={handlePlayerSelectChange}>
                    <option value="1">AI</option>
                    <option value="2">2 Players</option>
                </select>
            </header>
            <div className="status-container">
                <Status title={title} isX={true} />
            </div>
            <div className="box-container">
                <button id="0-0" className="box square" onClick={() => makePlayerMove(0, 0)}></button>
                <button id="0-1" className="box square" onClick={() => makePlayerMove(0, 1)}></button>
                <button id="0-2" className="box square" onClick={() => makePlayerMove(0, 2)}></button>
                <button id="1-0" className="box square" onClick={() => makePlayerMove(1, 0)}></button>
                <button id="1-1" className="box square" onClick={() => makePlayerMove(1, 1)}></button>
                <button id="1-2" className="box square" onClick={() => makePlayerMove(1, 2)}></button>
                <button id="2-0" className="box square" onClick={() => makePlayerMove(2, 0)}></button>
                <button id="2-1" className="box square" onClick={() => makePlayerMove(2, 1)}></button>
                <button id="2-2" className="box square" onClick={() => makePlayerMove(2, 2)}></button>
            </div>
            <div style={
                {
                    "display": "flex",
                    "justifyContent": "center"
                }
            }>
            <button id="restart" onClick={() => {
                restart();
            }}>Restart</button>
            </div>
        </>
    );
}