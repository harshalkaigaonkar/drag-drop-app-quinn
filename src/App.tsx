import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CanvasState from './context/canvas/CanvasState';
import Design from './pages/Design';
import None from './pages/None';
import Output from './pages/Output';

const App : React.FC = () => {
  return (
    <CanvasState>
      <Router>
        <Routes>
        <Route path='/' element={<Design />} />
        <Route path='canvas-output' element={<Output />} />
        <Route path='*' element={<None />} />
        </Routes>
      </Router>
    </CanvasState>
  );
}

export default App;
