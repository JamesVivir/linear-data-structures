class Node {
    public next: Node | null = null;
    public value: number;


    constructor(value: number) {
        this.value = value;
    }
}

export class CircularLinkedList {
    private head: Node | null = null;
    private tail: Node | null = null;

    public addFirst(value: number) {
        const newNode = new Node(value);
        if (this.isEmpty()) {
            this.initialize(newNode);
        } else {
            newNode.next = this.head;
            this.head = newNode;
            this.tail!.next = newNode;
        }
    }

    public addLast(value: number) {
        const newNode = new Node(value);
        if (this.isEmpty()) {
            this.initialize(newNode);
        } else {
            this.tail!.next = newNode;
            this.tail = newNode;
            newNode.next = this.head;
        }
    }

    public removeFirst() {
        if (this.isEmpty()) {
            throw new Error("Cannot remove an element from an empty list");
        }

        const removedValue = this.head!.value;

        if (this.hasOneNode()) {
            this.reset();
        } else {
            const next = this.head!.next;
            this.head!.next = null;
            this.head = next;
            this.tail!.next = next;
        }

        return removedValue;
    }

    public removeLast() {
        if (this.isEmpty()) {
            throw new Error("Cannot remove an element from an empty list");
        }

        const removedValue = this.tail!.value;

        if (this.hasOneNode()) {
            this.reset();
        } else {
            const prev = this.getNodeBeforeLast()!;
            prev.next = null;
            this.tail = prev;
            this.tail.next = this.head;
        }

        return removedValue;
    }

    public remove(value: number) {
        if (this.isEmpty()) {
            throw new Error("Cannot remove an element from an empty list")
        }

        if (value === this.head!.value) {
            this.removeFirst();
            return;
        }

        if (value === this.tail!.value) {
            this.removeLast();
            return;
        }

        let current = this.head!;
        let prev = this.head!;

        do {
            if (current.value === value) {
                prev.next = current.next;
                current.next = null;
                return;
            }
            prev = current;
            current = current.next!;
        } while (current !== this.head)

        throw new Error("Value not found in the list")
    }

    public hasCycle() {
        if (this.isEmpty()) {
            return false;
        }

        let slow = this.head;
        let fast = this.head;

        // 10 -> 20 -> 30 -> null
        //              s
        //                             f
        while (fast !== null && fast.next !== null) {
            slow = slow!.next;
            fast = fast.next.next;

            if (slow === fast) {
                return true;
            }
        }

        return false;
    }

    public removeCycle() {
        if (!this.isEmpty()) {
            this.tail!.next = null;
        }
    }

    public getCycleHead() {
        if (this.isEmpty()) {
            throw new Error("List is empty")
        }

        let slow = this.head;
        let fast = this.head;

        while (fast !== null && fast.next !== null) {
            slow = slow!.next;
            fast = fast.next.next;

            if (slow === fast) {
                break;
            }
        }

        if (slow !== fast) {
            throw new Error("List has no cycle")
        }

        let start = this.head;
        while (start !== slow) {
            start = start!.next;
            slow = slow!.next;
        }

        return slow!.value;
    }

    public setCycle(value: number) {
        const node = this.findNode(value);

        if (node === null) {
            throw new Error("No such node")
        }

        this.tail!.next = node;
    }

    public findNode(value: number) {
        if (this.isEmpty()) {
            return null;
        }

        let current = this.head!;

        do {
            if (current.value === value) {
                return current;
            }
            current = current.next!;
        } while (current !== this.head)

        return null;
    }

    private getNodeBeforeLast() {
        if (this.isEmpty() || this.hasOneNode()) {
            return null;
        }

        let current = this.head!;
        while (current.next !== this.tail) {
            current = current.next!;
        }

        return current;
    }

    private hasOneNode() {
        return this.head === this.tail
    }

    private reset() {
        this.head = this.tail = null;
    }

    public isEmpty() {
        return this.head === null;
    }

    private initialize(node: Node) {
        this.head = this.tail = node;
        this.head.next = this.tail;
    }
}