import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Background from './features/background/background.jsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Background />
    <App />
  </React.StrictMode>,
)
