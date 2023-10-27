import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'src/App'
import 'src/config/dayjs'
import 'src/config/env'
import 'src/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
