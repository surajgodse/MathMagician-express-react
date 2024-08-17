import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import CalculatorPage from './CalculatorPage';
import Footer from './Footer';
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calculator/:operation" element={<CalculatorPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
