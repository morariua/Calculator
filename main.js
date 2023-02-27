// get DOM elements
const resultElement = document.getElementById('result');
const inputButtons = document.querySelectorAll('.input');
const operatorButtons = document.querySelectorAll('.operator');
const delButton = document.getElementById('DEL');
const resetButton = document.getElementById('RESET');
const equalsButton = document.getElementById('EQUALS');

// initialize variables
let currentInput = '';
let previousInput = '';
let currentOperator = null;
let shouldResetInput = false;

// functions for calculator operations
function reset() {
  currentInput = '';
  previousInput = '';
  currentOperator = null;
  shouldResetInput = false;
  displayResult('');
}

function calculate() {
  let result = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  if (currentOperator === '+') {
    result += current;
  } else if (currentOperator === '-') {
    result -= current;
  } else if (currentOperator === '/') {
    result /= current;
  } else if (currentOperator === 'x') {
    result *= current;
  }
  currentInput = result.toString();
  previousInput = '';
  currentOperator = null;
  shouldResetInput = true;
  displayResult(currentInput);
}

function handleInput(input) {
  if (input === '.' && currentInput.includes('.')) {
    return;
  }
  if (shouldResetInput) {
    currentInput = '';
    shouldResetInput = false;
  }
  currentInput += input;
  displayResult(currentInput);
}

function handleOperator(operator) {
  const inputValue = parseFloat(currentInput);
  if (currentOperator && !shouldResetInput) {
    calculate();
  } else {
    previousInput = currentInput;
    shouldResetInput = true;
  }
  currentOperator = operator;
}

function handleDelete() {
  currentInput = currentInput.slice(0, -1);
  displayResult(currentInput);
}

function displayResult(value) {
  resultElement.textContent = value;
}

// event listeners for calculator buttons
inputButtons.forEach(button => {
  button.addEventListener('click', () => handleInput(button.textContent));
});

operatorButtons.forEach(button => {
  button.addEventListener('click', () => handleOperator(button.textContent));
});

resetButton.addEventListener('click', reset);

equalsButton.addEventListener('click', calculate);

delButton.addEventListener('click', handleDelete);



