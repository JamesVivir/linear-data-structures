import {LinkedList} from "../../linkedList/singlyLinkedList/LinkedList";

export class LinkedQueue {
    private values: LinkedList = new LinkedList();

    public enqueue(value: number) {
        this.values.addLast(value);
    }

    public dequeue() {
        if (this.isEmpty()) {
            throw new Error("LinkedQueue is empty");
        }
        return this.values.removeFirst();
    }

    public peek() {
        if (this.isEmpty()) {
            throw new Error("LinkedQueue is empty");
        }

        return this.values.getFirst();
    }

    public isEmpty() {
        return this.values.isEmpty();
    }
}