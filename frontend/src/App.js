import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Intake from './components/Intake';
import Station1 from './components/Station1';
import Output from './components/Output';
function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/intake">Intake</Link></li>
            <li><Link to="/station1">Station 1</Link></li>
            <li><Link to="/output">Output</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/intake" element={<Intake />} />
          <Route path="/station1" element={<Station1 />} />
          <Route path="/output" element={<Output />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
