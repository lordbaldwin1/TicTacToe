import React, { useState } from 'react';
import '../App.css';

const pieceSymbols = {
    'R': '♖',
    'N': '♘',
    'B': '♗',
    'Q': '♕',
    'K': '♔',
    'P': '♙',
    'r': '♜',
    'n': '♞',
    'b': '♝',
    'q': '♛',
    'k': '♚',
    'p': '♟',
};

// Upper-case are white pieces | Lower-case are black pieces
const initialBoardSetup = [
    'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R',
    'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
    'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',
];

function Chess() {
    return (
        <Board />
    );
}

function Square({ index, piece, onSquareClick }) {
    const isDarkSquare = (Math.floor(index / 8) + index % 8) % 2 === 1;

    return (
        <div
            className="square"
            onClick={onSquareClick}
            style={{
                backgroundColor: isDarkSquare ? 'black' : 'white',
                width: '65px',
                height: '65px',
                display: 'inline-block',
                lineHeight: '65px',
                fontSize: '30px',
                textAlign: 'center', // Center the piece inside the square
                color: isDarkSquare ? 'white' : 'black', // Set piece color
            }}
        >
            {pieceSymbols[piece]}      
        </div>
    );
}

function Board() {
    const [curBoard, setCurBoard] = useState(initialBoardSetup);
    const [selectedSquare, setSelectedSquare] = useState(null);

    function handleClick(index) {
        if (selectedSquare === null && curBoard[index] !== '') {
            setSelectedSquare(index);
        } else if (selectedSquare !== null) {
            const newBoard = [...curBoard];
            newBoard[index] = curBoard[selectedSquare];
            newBoard[selectedSquare] = '';
            setCurBoard(newBoard);
            setSelectedSquare(null);
        }
    }

    const board = [];
    const boardSize = 8;

    for (let row = 0; row < boardSize; row++) {
        const boardRow = [];
        for (let col = 0; col < boardSize; col++) {
            const index = row * boardSize + col;
            const piece = curBoard[index];
            boardRow.push(
                <Square 
                    key={index}
                    index={index}
                    piece={piece}
                    onSquareClick={() => handleClick(index)}
                />
            );
        }
        board.push(
            <div key={row} className="board-row">
                {boardRow}
            </div>
        );
    }

    return (
        <div>
            {board}
        </div>
    );
}

export default Chess;
