let display = document.querySelector('.display');
let displayValue = display.textContent;
let operator;

const numButtons = document.querySelectorAll('.num-button');
numButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
        const label = evt.target.textContent; // gets the number of the button
        populateDisplay(label);
    });
});

const opButtons = document.querySelectorAll('.op-button');
opButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
        operator = evt.target.textContent;
    });
});


function add(a, b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0){
        return "Oops";
    }
    return a / b;
}

function operate(op, a, b){
    switch (op) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            return "Unknown operator";
    }
}

function populateDisplay(label) {
    if(typeof label === 'number'){
        if(displayValue === 0){ // instead of concat, replace
            displayValue = label;
        } else {
        displayValue = displayValue + label; // want this to be string concat
        }
        display.textContent = displayValue;
    } else {
        // to be filled
    }





// if an operator has been called, uses the operator on the num and displayValue to get new value
/*  to be removed
if(operator){
    runOperation(operator, label);
    display.textContent = displayValue;
}
*/

    
}

function runOperation(op, num){ //updates values of displayValue and operator by running operation
    if(operator){

    } else {
        operator = op;
    }
    /*
    const newValue = operate(op, displayValue, num);
    displayValue = newValue;
    operator = null;
    */
}