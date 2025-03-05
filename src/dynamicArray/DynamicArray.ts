export class DynamicArray {
    private values: number[];
    private index: number = 0;

    constructor(capacity: number = 4) {
        if (capacity <= 0) {
            throw new Error("Capacity must be greater than zero");
        }
        this.values = new Array(capacity);
    }

    public insert(value: number) {
        this.reshape();
        this.values[this.index++] = value;
    }

    private reshape() {
        if (this.index === this.values.length) {
            const newArr = new Array(this.values.length * 2);
            for (let i = 0; i < this.values.length; i++) {
                newArr[i] = this.values[i];
            }
            this.values = newArr;
        }
    }

    public removeAt(targetIndex: number) {
        if (targetIndex < 0 || targetIndex >= this.index) {
            throw new Error("Invalid targetIndex")
        }

        this.shiftValues(targetIndex);
        this.index--;
    }

    private shiftValues(targetIndex: number) {
        for (let i = targetIndex; i < this.index - 1; i++) {
            this.values[i] = this.values[i + 1];
        }
    }

    public indexOf(value: number) {
        for (let i = 0; i < this.index; i++) {
            if (this.values[i] === value) {
                return i;
            }
        }

        return -1;
    }
}