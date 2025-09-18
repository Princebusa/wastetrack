import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
     <Toaster position="top-center" reverseOrder={false}  toastOptions={{
      duration: 3000,
    style: {
      background: "#ffffff50",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      boxShadow: "0 2px 20px rgba(0, 0, 0, 0.13)",
      border: "1px solid rgba(56, 56, 56, 0.14)",
      color: "#000000ff",
      fontSize: "16px",
      borderRadius: "12px",
      padding: "12px 20px",
    },
    success: {
      style: { background: "#ffffff80" },
      iconTheme: { primary: "white", secondary: "#116914ff" },
    },
    error: {
      style: { background: "#f44336" },
      iconTheme: { primary: "white", secondary: "#f44336" },
    },
  }} />
  </StrictMode>,
)
