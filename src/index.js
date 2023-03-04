import React from 'react' // for JSX
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

document.title = 'Tic Tac Toe'

createRoot(document.getElementById('root'))
	.render(
		// <StrictMode>
			<App tab="home" />
		// </StrictMode>
	)
