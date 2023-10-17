import './App.css';
import React, { useState } from 'react';

function App() {
  const initialBoard = Array.from({ length: 9 }, () => Array(9).fill(''));

  const [board, setBoard] = useState(initialBoard);

  function clr() {
    const newBoard = Array.from({ length: 9 }, () => Array(9).fill(''));
    setBoard(newBoard);
  }

  function isValid(board, row, col, num) {
    if (num === '') return true;
    num = parseInt(num); 
    if (isNaN(num) || num <= 0 || num > 9) return false; 

    for (let x = 0; x < 9; x++) {
      if (
        board[row][x] === num.toString() ||
        board[x][col] === num.toString() ||
        board[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] === num.toString()
      ) {
        return false;
      }
    }
    return true;
  }

  function solveSudoku(board) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === '') {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, i, j, num)) {
              board[i][j] = num.toString();
              if (solveSudoku(board)) {
                return true;
              }
              board[i][j] = '';
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  function solve() {
    const newBoard = JSON.parse(JSON.stringify(board));
    if (solveSudoku(newBoard)) {
      setBoard(newBoard);
    } else {
      alert('No solution exists for the current configuration.');
    }
  }

  return (
    <div class='image'>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className='output'>
          {row.map((cell, colIndex) => (
            <input
              className='input'
              key={colIndex}
              type='text'
              value={cell}
              onChange={(e) => {
                const newValue = e.target.value;
                if (!isValid(board, rowIndex, colIndex, newValue)) {
                  alert('Invalid input');
                  return;
                }
                const updatedBoard = [...board];
                updatedBoard[rowIndex][colIndex] = newValue;
                setBoard(updatedBoard);
              }}
            />
          ))}
        </div>
      ))}
      <h1> </h1>
      <div >
           <button class='increase' onClick={solve}>Solve</button>
           
           <button class='increase' onClick={clr}>Clear</button>
      </div>
    </div>
  );
}

export default App;
