export class ArrayPriorityQueue {
    private values: number[] = [];

    public enqueue(value: number) {
        let index = this.findInsertionIndex(value);
        this.values.splice(index, 0, value);
    }

    private findInsertionIndex(value: number) {
        let low = 0;
        let high = this.values.length;

        // -> 36
        // [5, 10, 30, 35, 40]
        //              M
        // low = 4;
        // high = 4

        while (low < high) {
            const mid = Math.floor((high + low) / 2);
            if (this.values[mid] < value) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        return low;
    }

    public dequeue() {
        if (this.isEmpty()) {
            throw new Error("Priority queue is empty");
        }

        return this.values.shift()!;
    }

    public peek() {
        if (this.isEmpty()) {
            throw new Error("Priority queue is empty");
        }

        return this.values[0];
    }

    public isEmpty() {
        return this.values.length === 0;
    }
}