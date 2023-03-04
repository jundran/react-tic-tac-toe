import React, { useState } from 'react'
import './styles/App.css'

function Square ({ value, onSquareClick, winner }) {
	return (
		<button
			className={winner ? 'square winner' : 'square'}
			onClick={onSquareClick}
		>
			{value}
		</button>
	)
}

export function Board ({ xIsNext, squares, onPlay }) {
	function handleClick (i) {
		if (squares[i] || calculateWinner(squares)) return
		const nextSquares = squares.slice()
		nextSquares[i] = xIsNext ? 'X' : 'O'
		onPlay(nextSquares)
	}

	const winStatus = calculateWinner(squares)
	let status
	let winningSquares = []
	if (winStatus) {
		winningSquares = winStatus.line
		status = `Winner: ${winStatus.winner}`
	} else if (winStatus === false) {
		status = 'The game is a draw'
	} else { // winStatus is null
		status =`Next player: ${xIsNext ? 'X' : 'O'}`
	}

	// [0, 3, 6] done programatically
	const outer = [...Array(3).keys()].map((key, index) => index * 3)
	return (
		<div>
			<div className='status'>{status}</div>
			{outer.map(row =>
				<div key={row} className="board-row">
					{[...Array(3).keys()].map(col =>
						<Square
							key={row + col}
							value={squares[row + col]}
							onSquareClick={() => handleClick(row + col)}
							winner={winningSquares.includes(row + col)}
						/>
					)}
				</div>
			)}
		</div>
	)
}

export default function Game () {
	const [history, setHistory] = useState([Array(9).fill(null)])
	const [currentMove, setCurrentMove] = useState(0)
	const [sortAscending, setSortAscending] = useState(true)
	const currentSquares = history[currentMove]

	function handlePlay (nextSquares) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
		setHistory(nextHistory)
		setCurrentMove(nextHistory.length - 1)
	}

	return (
		<div className='game'>
			<div className='game-board'>
				<Board xIsNext={currentMove % 2 === 0} squares={currentSquares} onPlay={handlePlay} />
			</div>
			<div className='game-info'>
				<div className='move-order'>
					<span>Sort: </span>
					<button onClick={() => setSortAscending(!sortAscending)}>
						{sortAscending ? 'Ascending' : 'Descending'}
					</button>
				</div>
				<ul>
					{
						history.map((squares, index) => {
							const move = sortAscending ? index : history.length - 1 - index
							return (
								<li key={move}>
									<button onClick={() => setCurrentMove(move)}>
										{move > 0 ? `Go to move # ${move}` : 'Go to game start'}
									</button>
								</li>
							)
						})
					}
				</ul>
			</div>
		</div>
	)
}

function calculateWinner (squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	]
	for (const line of lines) {
		const [a, b, c] = line
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return {
				winner: squares[a],
				line
			}
		}
	}
	if (!squares.includes(null)) return false // draw
	return null
}
