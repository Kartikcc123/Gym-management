import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext' // Import AuthProvider
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>        {/* 1. Provides User State to the whole app */}
      <BrowserRouter>     {/* 2. Enables Routing */}
        <App />           {/* 3. Your Route Definitions */}
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)