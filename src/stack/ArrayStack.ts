export class ArrayStack {
    private values: number[] = [];
    private index: number = 0;

    public push(value: number) {
        this.values[this.index++] = value;
    }

    public pop() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty")
        }

        const value = this.values[--this.index];
        this.values.length = this.index;
        return value;
    }

    public peek() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty")
        }

        return this.values[this.index - 1];
    }

    public isEmpty() {
        return this.index === 0;
    }

    public sort() {
        const tempStack: number[] = [];

        while (!this.isEmpty()) {
            const current = this.pop();

            while (tempStack.length !== 0 && tempStack[tempStack.length - 1] > current) {
                this.push(tempStack.pop()!)
            }

            tempStack.push(current);
        }

        this.values = tempStack;
        this.index = tempStack.length;
    }
}