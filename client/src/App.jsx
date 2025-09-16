import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';



import Dashboard from './dashboard';
function App() {


  return (
    <Router>
      <Routes>
        <Route path="/app/*" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App

