export class ShuntingYard {
    private operatorsPriority: Map<string, number> = new Map([
        ['+', 1],
        ['-', 1],
        ['*', 2],
        ['/', 2],
        ['(', 0]
    ]);

    public infixToRPN(expression: string) {
        // this.validateExpression(expression);
        const operators: string[] = [];
        const output: string[] = [];

        for (let i = 0; i < expression.length; i++) {
            const token = expression[i];

            if (this.isNumber(token)) {
                const {number, newIndex} = this.processNumber(expression, i);
                output.push(number);
                i = newIndex;
            } else if (token === '(') {
                operators.push(token);
            } else if (token === ')') {
                this.processClosingParenthesis(operators, output);
            } else if (this.isOperator(token)) {
                this.processOperator(token, operators, output);
            }
        }

        this.flushRemainingOperators(operators, output);

        return output;
    }

    public evaluateRPN(tokens: string[]): number {
        const stack: number[] = [];

        for (let token of tokens) {
            if (this.isOperator(token)) {
                const b = stack.pop()!;
                const a = stack.pop()!;
                stack.push(this.performOperation(token, a, b))
            } else {
                stack.push(Number(token));
            }
        }

        return stack.pop()!;
    }

    private performOperation(operator: string, a: number, b: number) {
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                if (b === 0) {
                    throw new Error("Division by zero")
                }
                return a / b;
            default:
                throw new Error("Invalid operator: " + operator);
        }
    }

    private flushRemainingOperators(operators: string[], output: string[]) {
        while (!this.isEmpty(operators)) {
            output.push(operators.pop()!);
        }
    }

    private processOperator(token: string, operators: string[], output: string[]) {
        while (!this.isEmpty(operators)
        && this.hasHigherOrEqualPriority(token, this.peek(operators))) {
            output.push(operators.pop()!)
        }
        operators.push(token);
    }

    private processClosingParenthesis(operators: string[], output: string[]) {
        while (!this.isEmpty(operators)
        && this.peek(operators) !== '(') {
            output.push(operators.pop()!)
        }
        operators.pop();
    }

    private processNumber(expression: string, startIndex: number) {
        let number: string = "";
        let i = startIndex;

        while (i < expression.length && this.isNumber(expression[i])) {
            number += expression[i];
            i++;
        }

        return {number, newIndex: i - 1};
    }

    private hasHigherOrEqualPriority(current: string, prev: string) {
        return this.operatorsPriority.get(current)! <= this.operatorsPriority.get(prev)!
    }

    private peek(stack: string[]) {
        return stack[stack.length - 1];
    }

    private isEmpty(stack: string[]) {
        return stack.length === 0;
    }

    private isOperator(token: string) {
        return this.operatorsPriority.has(token);
    }

    private isNumber(char: string) {
        return !isNaN(Number(char));
    }
}