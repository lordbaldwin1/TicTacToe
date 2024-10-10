import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// handles click on square button to display value, "x" or "o"
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// handles board, takes in xIsNext state to determine who is next
// takes in the state of all of the squares on the board
// onPlay is the function handlePlay passed into the board
//
function Board({ xIsNext, squares, onPlay }) {

  //takes in the index clicked, if square[i] is not null or someone won
  // do not update square[i]
  //
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    // .slice() with no args copies entire squares array into nextSquares
    //
    const nextSquares = squares.slice();

    // if xIsNext is true, update array copy at clicked index to X
    // else xIsNext is false, update array copy at index to O
    //
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    // calls handlePlay and passes in nextSquares array
    //
    onPlay(nextSquares);
  }

  // calls calculate winner and stores true or false
  //
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  // UI of squares to create the board
  // onSquareClick prop passes handleClick at index to square
  // so onClick in Square, handleClick is called, which creates new
  // squares array and sends it to handlePlay (updates history, currentmove, and xIsNext)
  return (
    <>
    <div className="status">{status}</div>
    <div className="board-row">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
      <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
      <Square value={squares[2]} onSquareClick={() => handleClick(2)} />

    </div>
    <div className="board-row">
      <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
      <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
      <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
    </div>
    <div className="board-row">
      <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
      <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
      <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}

// handles game states
function Game() {
  // simple true or false for if X is the next move
  //
  const [xIsNext, setXIsNext] = useState(true);
  // stores an array of arrays, each one representing the state of the board at the time
  //
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // keeps track of the index of the current state of the game in the history array
  //
  const [currentMove, setCurrentMove] = useState(0);
  // this is the current state of the game array at the current move
  //
  const currentSquares = history[currentMove];

  // takes the next move array from handleClick
  // copies history array and appends nextSquares array to the end
  // sets history array to this new array of arrays
  // sets current move to the most recent history index
  // update xisnext
  //
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  // called from onClick below
  // sets current move to next move
  // sets xisnext based on even or odd
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  // iterates through history and creates an array of the returned list jsx elements
  // move it the current index of iteration of the history array
  // although squares is unused, it holds onto the element(array of current board state) in history
  //
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    if (move != currentMove) {
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    } else {
      description = 'You are at move #' + move;
      return (
        < li key={move}>
          <span>{description}</span>
        </li>
      )
    }
  });

  // passes xisnext state, current state of board, and handlePlay function
  return (
  <div className="game">
    <div className ="game-board">
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
    </div>
    <div className="game-info">
      <ol>{moves}</ol>
    </div>
  </div>
  );
}

// takes the current squares and returns true if winner, false if not
function calculateWinner(squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return (
    <>
    <Game />
    </>
  )
}

export default App
