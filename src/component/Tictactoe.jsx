import React, { useState } from 'react';

const player = {
  A: "X",
  B: "O"
};

function Tictactoe() {
  const [board, setBoard] = useState(new Array(9).fill(null));
  const [activeturn, setActiveTurn] = useState(player.A);
  const [winner, setWinner] = useState(null);

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  function checkWinner(board) {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  function handleTurn(index) {
    if (!board[index] && !winner) {
      const newBoard = board.slice();
      newBoard[index] = activeturn;
      setBoard(newBoard);

      const newWinner = checkWinner(newBoard);
      if (newWinner) {
        setWinner(newWinner);
      } else {
        setActiveTurn(activeturn === player.A ? player.B : player.A);
      }
    }
  }

  function resetGame() {
    setBoard(new Array(9).fill(null));
    setActiveTurn(player.A);
    setWinner(null);
  }

  return (
    <>  
           <div className='w-96 flex justify-end mb-2'>  <button onClick={resetGame} className=' border-solid border-2 rounded-lg px-5 text-2xl shadow-md bg-cyan-50'>Reset</button> </div>


    <div className='h-96 w-96 grid gap-0 grid-cols-3 shadow-lg bg-green-50 '>
      {board.map((cell, index) => (
        <button 
          onClick={() => handleTurn(index)} 
          className='border-2 text-3xl' 
          key={index}
        >
          {cell}
        </button>
      ))}
      
    </div>
    {winner && <div className='border-solid border-2 rounded-lg px-10 py-2 mt-3 text-2xl shadow-lg bg-cyan-50'>{winner} wins!</div>}
    </>
  );
}

export default Tictactoe;
