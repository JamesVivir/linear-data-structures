class Node<T> {
    public next: Node<T> | null = null;
    public value: T;


    constructor(value: T) {
        this.value = value;
    }
}

type Comparator<T> = (a: T, b: T) => boolean;

function defaultComparator<T>(a: T, b: T): boolean {
    if (typeof a === 'object' && a !== null && typeof b === 'object' && b !== null) {
        return JSON.stringify(a) === JSON.stringify(b);
    }
    return a === b;
}

export class LinkedList<T> {
    private head: Node<T> | null = null;
    private tail: Node<T> | null = null;

    public addFirst(value: T) {
        const newNode = new Node(value);
        if (this.isEmpty()) {
            this.initialize(newNode);
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
    }

    public addLast(value: T) {
        const newNode = new Node(value);
        if (this.isEmpty()) {
            this.initialize(newNode);
        } else {
            this.tail!.next = newNode;
            this.tail = newNode;
        }
    }

    public getFirst() {
        if (this.isEmpty()) {
            throw new Error("List is empty");
        }

        return this.head!.value;
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
        }

        return removedValue;
    }

    public remove(value: T) {
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

        while (current.next !== null) {
            if (current.value === value) {
                prev.next = current.next;
                current.next = null;
                return;
            }
            prev = current;
            current = current.next;
        }

        throw new Error("Value not found in the list")
    }

    private getNodeBeforeLast() {
        let current = this.head;
        while (current != null) {
            if (current.next === this.tail) {
                return current;
            }
            current = current.next;
        }

        return null;
    }

    public nthFromTheEnd(n: number) {
        if (this.isEmpty() || n < 1) {
            throw new Error("Invalid value of n")
        }

        let current = this.head!;
        for (let i = 0; i < n; i++) {
            if (current === null) {
                throw new Error("n is larger than the size of the list");
            }
            current = current.next!;
        }

        let prev = this.head!;
        while (current != null) {
            current = current.next!;
            prev = prev.next!;
        }

        return prev.value;
    }

    public reverse() {
        if (this.isEmpty()) {
            return;
        }

        let prev = null;
        let current = this.head;

        while (current !== null) {
            const next = current.next;
            current.next = prev;

            prev = current;
            current = next;
        }

        this.tail = this.head;
        this.head = prev;
    }

    public compare(list2: LinkedList<T>, comparator: Comparator<T> = defaultComparator) {
        let node1 = this.head;
        let node2 = list2.head;

        // node1=null node2=Node
        while (node1 !== null && node2 !== null) {
            if (!comparator(node1.value, node2.value)) {
                return false;
            }

            node1 = node1.next;
            node2 = node2.next;
        }

        return node1 === null && node2 === null;
    }

    public recursiveCompare(list: LinkedList<T>, comparator: Comparator<T> = defaultComparator) {
        return this._recursiveCompare(this.head, list.head, comparator);
    }

    private _recursiveCompare(node1: Node<T> | null, node2: Node<T> | null,
                              comparator: Comparator<T>): boolean {
        if (node1 === null && node2 === null) {
            return true;
        }

        if (node1 === null || node2 === null) {
            return false;
        }

        return comparator(node1.value, node2.value)
            && this._recursiveCompare(node1.next, node2.next, comparator);
    }

    public getMiddle() {
        if (this.isEmpty()) {
            throw new Error("List is empty")
        }

        let slow = this.head!;
        let fast = this.head!;

        // 10 -> 20 -> 30 -> 40 -> 50
        //              s
        //                          f
        while (fast !== null && fast.next !== null) {
            slow = slow.next!;
            fast = fast.next.next!;
        }

        return slow.value;
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

    private initialize(node: Node<T>) {
        this.head = this.tail = node;
    }

    // [Symbol.iterator]() {
    //     let current = this.head;
    //
    //     return {
    //         next(): IteratorResult<T> {
    //             if (current != null) {
    //                 const value = current.value;
    //                 current = current.next;
    //                 return {
    //                     done: false,
    //                     value: value
    //                 }
    //             } else {
    //                 return {
    //                     done: true,
    //                     value: null
    //                 }
    //             }
    //         }
    //     }
    // }

    * [Symbol.iterator]() {
        let current = this.head;
        while (current != null) {
            yield current.value;
            current = current.next;
        }
    }
}