import React, { useState } from 'react'
import Square from './Square'

const Board = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isX, setIsX] = useState(true);

    const calculateWinner = (squares) => {
        const winningPatterns = [
          [0, 1, 2], 
          [3, 4, 5], 
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];

        for (let index = 0; index < winningPatterns.length; index++) {
          const [a, b, c] = winningPatterns[index]; 
          
          if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
    }

    function isTie(squares) {
        for (let index = 0; index < squares.length; index++) {
            if(squares[index] === null) {
                        return false;
            }
        }
        return true;
    }

    const winner = calculateWinner(squares)
    let status;

    if (winner) {
        status = `Winner: ${winner}`
    } else if(isTie(squares)) {
        status = 'Tie'
    } else {
        status = `Next player: ${isX ? 'X' : 'O'}`
    }

    const handleClick = (index) => {
        if(calculateWinner(squares) || squares[index]) {
            return
        }
        squares[index] = isX ? 'X' : 'O'
        setSquares(squares);
        setIsX(!isX);
    }

    function handleReset() {
        setIsX(true)
        setSquares(Array(9).fill(null))
    }

    return (
        <div className='board'>
            <div className='status'>{status}</div>
            <div className='board-row'>
                <Square value={squares[0]} onClick={() => handleClick(0)}/>
                <Square value={squares[1]} onClick={() => handleClick(1)}/>
                <Square value={squares[2]} onClick={() => handleClick(2)}/>
            </div>
            <div className='board-row'>
                <Square value={squares[3]} onClick={() => handleClick(3)}/>
                <Square value={squares[4]} onClick={() => handleClick(4)}/>
                <Square value={squares[5]} onClick={() => handleClick(5)}/>
            </div>
            <div className='board-row'>
                <Square value={squares[6]} onClick={() => handleClick(6)}/>
                <Square value={squares[7]} onClick={() => handleClick(7)}/>
                <Square value={squares[8]} onClick={() => handleClick(8)}/>
            </div>
            <button className='reset' onClick={handleReset}>Reset Game</button>
        </div>
    )
}

export default Board