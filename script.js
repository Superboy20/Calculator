class Calculator {
    constructor(display, cdisplay) {
        this.display = display;
        this.cdisplay = cdisplay;
        this.clear();
    }

    clear() {
        this.currentDisplay = '';
        this.prevDisplay = '';
        this.error = "";
        this.operation = undefined;
    }

    del() {
        this.currentDisplay = this.currentDisplay.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (this.error) {
            this.clear();
        }
        if (number === '.' && this.currentDisplay.includes('.')) return; 
        this.currentDisplay = this.currentDisplay.toString() + number.toString();
    }

    selectedOperation(operation) {
        if (this.currentDisplay === '') return;
        if (this.prevDisplay !== '') {
            this.calculate();
        }
        this.operation = operation;
        this.prevDisplay = this.currentDisplay;
        this.currentDisplay = '';
    }

    calculate() {
        let calculation
        const previousNum = parseFloat(this.prevDisplay)
        const currentNum = parseFloat(this.currentDisplay)
        if (isNaN(previousNum) || isNaN(currentNum)) return
        
        switch (this.operation) {
            case '+' : 
            calculation = previousNum + currentNum
            break;
        case '-' : 
            calculation = previousNum - currentNum
            break;
        case 'x' : 
            calculation = previousNum * currentNum
            break;
        case '÷' : 
            if (currentNum === 0) this.error = "Can't divide by zero";
            else calculation = previousNum / currentNum;
            break;
        default:
            return;
        }

        this.currentDisplay = calculation;
        this.operation = undefined;
        this.prevDisplay = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } return integerDisplay;
    }

    updateDisplay() {
        if (this.error) {
            this.display.innerText = this.error;
            return;
        }
        this.cdisplay.innerText = 
        this.getDisplayNumber(this.currentDisplay);
        if(this.operation != null) {
            this.display.innerText = 
                `${this.prevDisplay} ${this.operation}`;

        } else {
            this.display.innerText = '';
        }
    }
}

const cdisplay = document.querySelector('#cdisplay');
const display = document.querySelector('#display');
const numberButtons = document.querySelectorAll('.numbers');
const operationButtons = document.querySelectorAll('.operation');
const equalsButton = document.querySelector('#equals');
const delButton = document.querySelector('#del');
const clearButton = document.querySelector('#clear');
const negButton = document.querySelector('#neg');

const calculator = new Calculator(display, cdisplay);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    });
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectedOperation(button.innerText)
        calculator.updateDisplay();
    });
})

equalsButton.addEventListener('click', event => {
    calculator.calculate();
    calculator.updateDisplay();
});

clearButton.addEventListener('click', event => {
    calculator.clear();
    calculator.updateDisplay();
});

delButton.addEventListener('click', event => {
    calculator.del();
    calculator.updateDisplay();
});