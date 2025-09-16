import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';



import Dashboard from './dashboard';
import HomePage from './Landing/index'
function App() {


  return (
    <Router>
      <Routes>
        <Route path="/app/*" element={<Dashboard />} />
        <Route path="/" element={<HomePage/>} />
      </Routes>
    </Router>
  )
}

export default App

