const display = document.getElementById('operator__p');
const buttons = document.querySelectorAll('button');

let currentInput = '0';
let previousInput = '0';
let operation = null;
let shouldResetScreen = false;

// Barcha tugmalar uchun click event listener qo'shish
buttons.forEach(button => {
    button.addEventListener('click', () => handleButton(button.value));
});

function handleButton(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    updateDisplay();
}

function handleNumber(number) {
    if (currentInput === '0' || shouldResetScreen) {
        currentInput = number;
        shouldResetScreen = false;
    } else {
        currentInput += number;
    }
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'AC':
            currentInput = '0';
            previousInput = '0';
            operation = null;
            break;
        case '±':
            currentInput = (parseFloat(currentInput) * -1).toString();
            break;
        case '⌫':
            currentInput = currentInput.slice(0, -1) || '0';
            break;
        case '=':
            if (operation) {
                currentInput = calculate(previousInput, currentInput, operation);
                operation = null;
                shouldResetScreen = true;
            }
            break;
        case '.':
            if (!currentInput.includes('.')) currentInput += '.';
            break;
        default:
            handleOperator(symbol);
    }
}

function handleOperator(op) {
    if (operation !== null) {
        currentInput = calculate(previousInput, currentInput, operation);
    }
    operation = op;
    previousInput = currentInput;
    shouldResetScreen = true;
}

function calculate(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
        case '+': return (a + b).toString();
        case '-': return (a - b).toString();
        case '*': return (a * b).toString();
        case '/': return (b !== 0 ? (a / b).toString() : 'Error');
        default: return b.toString();
    }
}

function updateDisplay() {
    display.textContent = currentInput;
}
