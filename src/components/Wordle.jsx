import '../App.css'
import { useEffect, useState } from 'react';

const API_URL = "https://random-word-api.herokuapp.com/word?length=5&number=10";
const WORD_LEN = 5;

const Wordle = () => {
    const [solution, setSolution] = useState('');
    const [guesses, setGuesses] = useState(Array(6).fill(null));
    const [currentGuess, setCurrentGuess] = useState('');
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        const handleType = (event) => {
            if (isGameOver) {
                return;
            }

            if (event.key === 'Enter') {
                if (currentGuess.length !== 5) {
                    return;
                }
                
                const newGuesses = [...guesses];
                const firstNullIndex = newGuesses.findIndex(val => val == null);

                if (firstNullIndex !== -1) {
                    newGuesses[firstNullIndex] = currentGuess;
                    setGuesses(newGuesses);
                }
                setCurrentGuess('');

                const isCorrect = solution === currentGuess;
                if (isCorrect) {
                    setIsGameOver(true);
                }
            }

            if (event.key === 'Backspace') {
                setCurrentGuess(currentGuess.slice(0, -1));
                return;
            }

            if (currentGuess.length === 5) {
                return;
            }

            setCurrentGuess(oldGuess => oldGuess + event.key);
        };

        window.addEventListener('keydown', handleType);

        return () => window.removeEventListener('keydown', handleType);
    }, [currentGuess, isGameOver, solution]);

    useEffect(() => {
        const fetchWord = async () => {
            const response = await fetch(API_URL);
            const words = await response.json();
            const randomWord = words[Math.floor(Math.random() * words.length)];
            setSolution(randomWord);
        };

        fetchWord();
    }, []);

    return (
        <div className='wordle-board'>
            {guesses.map((guess, i) => {
                const isCurrentGuess = i === guesses.findIndex(val => val == null);
                return (
                <Line 
                    guess={isCurrentGuess ? currentGuess : guess ?? ''}
                    isFinal={!isCurrentGuess && guess != null}
                    solution={solution}
                />
                )
            })}
        </div>

    )
}

function Line({ guess, isFinal, solution }) {
    const tiles = [];

    for (let i = 0; i < WORD_LEN; i++) {
        const char = guess[i];
        let className = 'tile';

        if (isFinal) {
            if (char === solution[i]) {
                className += ' correct';
            } else if (solution.includes(char)) {
                className += ' close';
            } else {
                className += ' incorrect';
            }
        }

        tiles.push(<div key={i} className={className}>{char}</div>)
    }
    return (
    <div className="line">
        {tiles}
    </div>
    )
}

export default Wordle;