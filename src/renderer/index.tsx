import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import App from './App'

ReactDOM.render(
  <>
    <div className="draggable-app-bar" />
    <div className="app-container">
      <App />
    </div>
  </>,
  document.getElementById('app')
)
