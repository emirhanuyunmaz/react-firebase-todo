import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { UpdateContextProvider } from './context/updateContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UpdateContextProvider>
      <App />
    </UpdateContextProvider>
  </React.StrictMode>,
)
