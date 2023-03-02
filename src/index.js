import React from 'react' // for JSX
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root'))
	.render(<App tab="home" />)
