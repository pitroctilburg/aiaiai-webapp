import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Intake from './components/Intake';
import Station1 from './components/Station1';
import Station2 from './components/Station2';
import Station3 from './components/Station3';
import Station4 from './components/Station4';
import Output from './components/Output';
function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/intake">Intake</Link></li>
            <li><Link to="/station1">Station 1</Link></li>
            <li><Link to="/station2">Station 2</Link></li>
            <li><Link to="/station3">Station 3</Link></li>
            <li><Link to="/station4">Station 4</Link></li>
            <li><Link to="/output">Output</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/intake" element={<Intake />} />
          <Route path="/station1" element={<Station1 />} />
          <Route path="/station2" element={<Station2 />} />
          <Route path="/station3" element={<Station3 />} />
          <Route path="/station4" element={<Station4 />} />
          <Route path="/output" element={<Output />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
