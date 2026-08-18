/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
  - `npm run test-calculator`
*/

class Calculator {
  constructor() {
    this.result = 0;
  }

  add(num) {
    this.result += num;
  }

  subtract(num) {
    this.result -= num;
  }

  multiply(num) {
    this.result *= num;
  }

  divide(num) {
    if (num === 0) {
      throw new Error("Division by zero");
    }
    this.result /= num;
  }

  clear() {
    this.result = 0;
  }

  getResult() {
    return this.result;
  }

  calculate(expression) {
    const cleaned = expression.replace(/\s+/g, "");

    if (!/^[0-9+\-*/().]+$/.test(cleaned)) {
      throw new Error("Invalid characters in expression");
    }

    let depth = 0;
    for (const ch of cleaned) {
      if (ch === "(") depth++;
      if (ch === ")") depth--;
      if (depth < 0) throw new Error("Unbalanced parentheses");
    }
    if (depth !== 0) throw new Error("Unbalanced parentheses");

    let pos = 0;

    const peek = () => cleaned[pos];
    const consume = () => cleaned[pos++];

    function parseFactor() {
      if (peek() === "(") {
        consume(); // '('
        const value = parseExpression();
        if (peek() !== ")") throw new Error("Unbalanced parentheses");
        consume(); // ')'
        return value;
      }

      let numStr = "";
      while (pos < cleaned.length && /[0-9.]/.test(peek())) {
        numStr += consume();
      }
      if (numStr === "") throw new Error("Invalid expression");
      return Number(numStr);
    }

    function parseTerm() {
      let value = parseFactor();
      while (peek() === "*" || peek() === "/") {
        const op = consume();
        const next = parseFactor();
        if (op === "*") {
          value *= next;
        } else {
          if (next === 0) throw new Error("Division by zero");
          value /= next;
        }
      }
      return value;
    }

    function parseExpression() {
      let value = parseTerm();
      while (peek() === "+" || peek() === "-") {
        const op = consume();
        const next = parseTerm();
        value = op === "+" ? value + next : value - next;
      }
      return value;
    }

    const result = parseExpression();

    if (pos !== cleaned.length) {
      throw new Error("Invalid expression");
    }

    this.result = result;
    return this.result;
  }
}

module.exports = Calculator;
