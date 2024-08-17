const express = require('express');
const cors = require('cors');

const app = express();
const port = 9000;

app.use(cors());
app.use(express.json());

// Helper function for calculations
const calculate = (operation, num1, num2) => {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  switch (operation) {
    case 'add':
      return num1 + num2;
    case 'subtract':
      return num1 - num2;
    case 'multiply':
      return num1 * num2;
    case 'divide':
      if (num2 === 0) throw new Error('Cannot divide by zero');
      return num1 / num2;
    case 'square':
      return num1 * num1;
    case 'sqrt':
      if (num1 < 0) throw new Error('Cannot calculate square root of a negative number');
      return Math.sqrt(num1);
    case 'evenodd':
      return num1 % 2 === 0 ? 'Even' : 'Odd';
    default:
      throw new Error('Invalid operation');
  }
};

// Route for all calculations
app.get('/calculate/:operation', (req, res) => {
  try {
    const { operation } = req.params;
    const { num1, num2 } = req.query;

    if (!num1) {
      throw new Error('First number is required');
    }

    const result = calculate(operation, num1, num2);
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});