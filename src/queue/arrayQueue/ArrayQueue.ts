export class ArrayQueue {
    private values: number[];
    private head: number = 0;
    private tail: number = 0;
    private size: number = 0;

    constructor(capacity: number = 5) {
        if (capacity <= 0) {
            throw new Error("Capacity must be greater than zero");
        }
        this.values = new Array(capacity);
    }

    public enqueue(value: number) {
        if (this.values.length === this.size) {
            throw new Error("ArrayQueue is full");
        }
        this.values[this.tail] = value;
        this.tail = (this.tail + 1) % this.values.length;
        this.size++;
    }

    public dequeue() {
        if (this.size === 0) {
            throw new Error("ArrayQueue is empty");
        }
        const value = this.values[this.head];
        this.head = (this.head + 1) % this.values.length;
        this.size--;
        return value;
    }

    public peek() {
        if (this.size === 0) {
            throw new Error("ArrayQueue is empty");
        }

        return this.values[this.head];
    }
}