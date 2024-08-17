import React from 'react';
import { Link } from 'react-router-dom';

const operations = [
  { name: 'add', title: 'Addition', image: '/images/addition.png' },
  { name: 'subtract', title: 'Subtraction', image: '/images/subtraction.png' },
  { name: 'multiply', title: 'Multiplication', image: '/images/multiplication.png' },
  { name: 'divide', title: 'Division', image: '/images/division.png' },
  { name: 'square', title: 'Square', image: '/images/square.png' },
  { name: 'sqrt', title: 'Square Root', image: '/images/square_root.png' },
  { name: 'evenodd', title: 'Even/Odd', image: '/images/even_odd.png' },
];

function HomePage() {
  return (
    <div className="HomePage">
      <h1>MathMagician: Your Ultimate Math Companion</h1>
      <div className="operation-grid">
        {operations.map((op) => (
          <Link to={`/calculator/${op.name}`} key={op.name} className="operation-card">
            <img src={op.image} alt={op.title} />
            <h3>{op.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;