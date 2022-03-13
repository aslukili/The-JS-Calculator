//variables
let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetScreen = false;

// operation elements
const numberButtons = document.querySelectorAll("[data-number]"); //getting number buttons
const operatorButtons = document.querySelectorAll("[data-operator]");//getting operator buttons
const currentOperationScreen = document.getElementById("current-operation-display"); //getting the operations screen
const lastOperationScreen = document.getElementById("last-operation-screen");
const equalsButton = document.getElementById("equals")

// other elemetns (clear-button and dot-button)
const clearButton = document.getElementById("clear");
const dotButton = document.getElementById("dot");

//==================click buttons===============//
// we have got all number buttons, but which one is clicked? let this function guess.
numberButtons.forEach((button) => {
    // appendNumber is a separated function which displays our input in the operations display
    button.addEventListener('click', () => appendNumber(button.textContent))
})

operatorButtons.forEach((button) =>
    //setOperation is a separated function that takes which operation was entered
    button.addEventListener('click', () => setOperation(button.textContent))
)

equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click', clear)
dotButton.addEventListener('click', appendDot)

//============= functions for operations ============//
function appendNumber(number){
    if (currentOperationScreen.textContent === '0' || shouldResetScreen){
        resetScreen(); // clears operations screen 
    }
        
    currentOperationScreen.textContent += number;
}

function resetScreen(){
    currentOperationScreen.textContent = '';
    shouldResetScreen = false;
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate()
    firstOperand = currentOperationScreen.textContent; // we stor the first operand in the first  operation variable
    currentOperation = operator
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
    shouldResetScreen = true
}

function evaluate() {
    if (currentOperation === null || shouldResetScreen) return
    if (currentOperation === '/' && currentOperationScreen.textContent === '0'){
        alert("ax kadir am3allem ?????????")
        return
    }
    secondOperand = currentOperationScreen.textContent
    //the result if the user clicked any operation
    currentOperationScreen.textContent = operate(currentOperation, firstOperand, secondOperand)
    //displaying the operation in the "history" screen.
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
    currentOperation = null // reseting the operator for other upcoming operations
}

function appendDot(){
    if (shouldResetScreen) resetScreen();
    currentOperationScreen.textContent += '.'
}

//========= other functions========//

//clearing screen
function clear(){
    currentOperationScreen.textContent = '0'
    lastOperationScreen.textContent = ''
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
}


//=========== basic operation functions ==============//
function add(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}

function minus(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}

function mult(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
    return firstNumber / secondNumber;
}

function operate(operator, firstNumber, secondNumber){
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
    switch(operator){
        case '+':
            return add(firstNumber, secondNumber);
            break
        case '*':
            return mult(firstNumber, secondNumber);
            break
        case '-':
            return minus(firstNumber, secondNumber);
            break
        case '/':
            return divide(firstNumber, secondNumber);
            break
    }
}