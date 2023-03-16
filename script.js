let display = document.querySelector('.display');
let displayValue = display.textContent;
let operator = null;
let prev = null;
let starting = true;

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
        const label = evt.target.textContent;
        populateDisplay(label);
    });
});


function add(a, b) {
    return Number(a) + Number(b);
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

// function populateDisplayNum(num) {
//     if (displayValue === 0) {// instead of concat, replace
//         displayValue = num;
//     } else {
//         displayValue = displayValue + num;
//     }
//     display.textContent = displayValue;
// }

// function populateDisplayOp(op) {
//     if (operator) {
//         runOperation(operator);
//     }
//     operator = label;
//     display.textConent = displayValue;
// }

// function populateDisplay(label) {
//     if (typeof label === 'number') { // this doesn't work!!!
//         if (displayValue === 0) { // instead of concat, replace
//             displayValue = label;
//         } else {
//             displayValue = displayValue + label; // want this to be string concat
//         }
//     } else {
//         if (operator) {
//             runOperation(operator);
//             operator = label;
//         } else { // initial press of operation
//             operator = label;
//         }
//     }
//     display.textContent = displayValue;
// }

function populateDisplay(label) {
    if(label === "Clear"){ // resets if select clear
        displayValue = '0';
        prev = null;
        operator = null;
        display.textContent = displayValue;
        return;
    }
    if(isNaN(displayValue)){
        return;
    }
    if(prev != null){
        if(!isNaN(label)){// if typing number
            // continue building number
            displayValue += label;
        } else { // if typing operator
            // do previous operation and store operator
            displayValue = operate(operator, prev, displayValue);
            if(isNaN(displayValue)){
                displayValue = "No dividing by 0! Clear and try again.";
                display.textContent = displayValue;
                return;
            }
            prev = null;
            operator = label;
        }
    } else {// prev is null, i.e. at start or awaiting next term in operation
        if(operator){// there is an operator, so we are inputing the next term
            if (operator === '='){ // special case with equals
                if(isNaN(label)){
                    operator = label; // moves on smoothly to next operation
                } else { // restarts process as if restarted calculator
                    displayValue = label;
                    operator = null;
                }
            } else {
                if(label === "="){
                    displayValue = "Error. Clear and try again.";
                    display.textContent = displayValue;
                    return;
                } else {
                    prev = displayValue;
                    displayValue = label;
                }
            }
        } else {// operator is null, i.e. at start (or inputing number still)
            if (isNaN(label)) { // if you input your first operator
                if(starting){
                    return; // do nothing if put operator with no values yet
                }
                operator = label;
            } else if(displayValue === '0'){
                displayValue = label;
                starting = false;
            } else {
                displayValue += label; // !!! this will mess up if you start with an operator
                starting = false;
            }
        }
    }
    displayValue = Math.round(displayValue*1000)/1000;
    display.textContent = displayValue;
}

/*
start
display 0
op null
prev null

type 5
display 5
op null
prev null

type *
dispaly 5
op *
prev null

type 1
display 1
op *
prev 5

type 0
display 10
op *
prev 5

type +
dispaly 50
op +
prev  null

type 7
display 7
op +
prev 50

type =
display 57
op =
prev null

type 3
display 3
op null
prev null

type 0
display 30
op null
prev null

type +
display 30
op +
prev null

type 7
display 7
op +
prev 30

type =
display 37
op =
prev null

*/