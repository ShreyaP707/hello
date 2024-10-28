const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operator = '';
let previousInput = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === 'C') {
            clearDisplay();
        } else if (value === '=') {
            calculate();
        } else {
            appendToDisplay(value);
        }
    });
});

function appendToDisplay(value) {
    currentInput += value;
    display.value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    display.value = '';
}

function calculate() {
    if (currentInput === '') return;

    if (previousInput !== '') {
        currentInput = operate(previousInput, currentInput, operator);
    }

    previousInput = currentInput;
    operator = '';
    display.value = currentInput;
}

function operate(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);

    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b === 0) {
                alert("Cannot divide by zero");
                clearDisplay();
                return '';
            }
            return a / b;
        default:
            return b; // If no operator, just return the second number
    }
}

// Listen for operator button clicks
document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value !== '=') {
            // If an operator is clicked, set the operator and store the current input
            if (currentInput !== '') {
                if (previousInput === '') {
                    previousInput = currentInput; // Set previous input if it's empty
                } else {
                    currentInput = operate(previousInput, currentInput, operator).toString();
                }
            }
            operator = value; // Set the operator
            currentInput = ''; // Clear current input for the next number
        }
    });
});