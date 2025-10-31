import React from 'react'
import { createRoot } from 'react-dom/client'
import './theme.css'
import App from './App.jsx'
import { initTelegram } from './telegram.js'

initTelegram()
createRoot(document.getElementById('root')).render(<App />)
