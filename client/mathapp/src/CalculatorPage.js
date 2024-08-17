import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function CalculatorPage() {
  const { operation } = useParams();
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setNum1('');
    setNum2('');
    setResult('');
  }, [operation]);

  const handleCalculate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:9000/calculate/${operation}`, {
        params: { num1, num2 }
      });
      const roundedResult = 
        operation === 'evenodd' 
          ? response.data.result
          : Number(response.data.result).toFixed(4);
      setResult(roundedResult);
      setHistory(prevHistory => [
        { operation, input: num2 ? `${num1}, ${num2}` : num1, output: roundedResult },
        ...prevHistory.slice(0, 4)
      ]);
    } catch (error) {
      console.error('Error:', error);
      setResult(error.response?.data?.error || 'An error occurred');
    }
  };

  const renderForm = () => {
    switch (operation) {
      case 'add':
      case 'subtract':
      case 'multiply':
      case 'divide':
        return (
          <>
            <input
              type="number"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              placeholder="Enter first number"
              required
            />
            <input
              type="number"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
              placeholder="Enter second number"
              required
            />
          </>
        );
      case 'square':
      case 'sqrt':
      case 'evenodd':
        return (
          <input
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            placeholder="Enter number"
            required
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="calculator-page">
      <div className="calculator-card">
        <h2>{operation.charAt(0).toUpperCase() + operation.slice(1)} Calculator</h2>
        <div className="calculator-content">
          <form onSubmit={handleCalculate}>
            {renderForm()}
            <button type="submit">Calculate</button>
          </form>
          {result && <p className="result">Result: {result}</p>}
        </div>
        <div className="history-section">
          <h3>Recent Calculations</h3>
          <ul>
            {history.map((item, index) => (
              <li key={index}>
                {item.operation}: {item.input} = {item.output}
              </li>
            ))}
          </ul>
        </div>
        <Link to="/" className="back-to-home">Back to Home</Link>
      </div>
    </div>
  );
}

export default CalculatorPage;