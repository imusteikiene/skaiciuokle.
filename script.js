class Calculator {
    constructor() {
      this.previousOperandTextElement = document.querySelector('[data-previous-operand]');
      this.currentOperandTextElement = document.querySelector('[data-current-operand]');
      this.clearButton = document.querySelector('[data-all-clear]');
      this.deleteButton = document.querySelector('[data-delete]');
      this.operationButtons = document.querySelectorAll('[data-operation]');
      this.numberButtons = document.querySelectorAll('[data-number]');
      this.equalsButton = document.querySelector('[data-equals]');
  
      this.clear();
      this.registerEventListeners();
    }
  
    clear() {
      this.previousOperand = '';
      this.currentOperand = '';
      this.operation = undefined;
    }
  
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
  
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return;
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
  
    chooseOperation(operation) {
      if (this.currentOperand === '') return;
      if (this.previousOperand !== '') {
        this.compute();
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
    }
  
    compute() {
      let computation;
      const prev = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);
      if (isNaN(prev) || isNaN(current)) return;
      switch (this.operation) {
        case '+':
          computation = prev + current;
          break;
        case '-':
          computation = prev - current;
          break;
        case '*':
          computation = prev * current;
          break;
        case '÷':
          computation = prev / current;
          break;
        default:
          return;
      }
      this.currentOperand = computation;
      this.operation = undefined;
      this.previousOperand = '';
    }
  
    updateDisplay() {
      this.currentOperandTextElement.innerText = this.currentOperand;
      this.previousOperandTextElement.innerText = this.previousOperand;
    }
  
    registerEventListeners() {
      this.numberButtons.forEach(button => {
        button.addEventListener('click', () => {
          this.appendNumber(button.innerText);
          this.updateDisplay();
        });
      });
  
      this.operationButtons.forEach(button => {
        button.addEventListener('click', () => {
          this.chooseOperation(button.innerText);
          this.updateDisplay();
        });
      });
  
      this.equalsButton.addEventListener('click', () => {
        this.compute();
        this.updateDisplay();
      });
  
      this.clearButton.addEventListener('click', () => {
        this.clear();
        this.updateDisplay();
      });
  
      this.deleteButton.addEventListener('click', () => {
        this.delete();
        this.updateDisplay();
      });
    }
  }
  
  const calculator = new Calculator();
  