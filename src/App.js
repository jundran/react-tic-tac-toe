import React, { useState } from 'react'
import './styles/App.css'

function Square ({ value, onSquareClick }) {
	return (
		<button className="square" onClick={onSquareClick}>
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

	const winner = calculateWinner(squares)
	let status
	if (winner) {
		status = `Winner: ${winner}`
	} else {
		status = `Next player: ${xIsNext ? 'X' : 'O'}`
	}

	return (
		<div>
			<div className='status'>{status}</div>
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
		</div>
	)
}

export default function Game () {
	const [history, setHistory] = useState([Array(9).fill(null)])
	const [currentMove, setCurrentMove] = useState(0)
	const currentSquares = history[currentMove]

	function handlePlay (nextSquares) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
		setHistory(nextHistory)
		setCurrentMove(nextHistory.length - 1)
	}

	function jumpTo (nextMove) {
		setCurrentMove(nextMove)
	}

	return (
		<div className='board'>
			<div className='game-board'>
				<Board xIsNext={currentMove % 2 === 0} squares={currentSquares} onPlay={handlePlay} />
			</div>
			<div className='game-info'>
				<ol>
					{
						history.map((squares, move) =>
							<li key={move}>
								<button onClick={() => jumpTo(move)}>
									{move > 0 ? `Go to move # ${move}` : 'Go to game start'}
								</button>
							</li>
						)
					}
				</ol>
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
			return squares[a]
		}
	}
	return null
}
