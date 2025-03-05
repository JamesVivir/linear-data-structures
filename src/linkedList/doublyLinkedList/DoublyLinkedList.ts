export interface IElement<T> {
    getValue(): T;

    belongsTo(list: DoublyLinkedList<T>): boolean;

    isRemoved(): boolean;
}

class Node<T> implements IElement<T> {
    public value: T;
    public prev: Node<T> | null = null;
    public next: Node<T> | null = null;
    public list: DoublyLinkedList<T> | null = null;
    public isRemovedFlag: boolean = false;


    constructor(value: T, list: DoublyLinkedList<T>) {
        this.value = value;
        this.list = list;
    }

    public getValue(): T {
        return this.value;
    }

    public belongsTo(list: DoublyLinkedList<T>) {
        return this.list === list;
    }

    public markAsRemoved() {
        this.isRemovedFlag = true;
    }

    public isRemoved() {
        return this.isRemovedFlag;
    }
}

export class DoublyLinkedList<T> {
    private head: Node<T> | null = null;
    private tail: Node<T> | null = null;

    public addFirst(value: T) {
        const newNode = new Node(value, this);
        if (this.isEmpty()) {
            this.initialize(newNode);
        } else {
            newNode.next = this.head;
            this.head!.prev = newNode;
            this.head = newNode;
        }

        return newNode as IElement<T>;
    }

    public addLast(value: T) {
        const newNode = new Node(value, this);
        if (this.isEmpty()) {
            this.initialize(newNode);
        } else {
            newNode.prev = this.tail;
            this.tail!.next = newNode;
            this.tail = newNode;
        }

        return newNode as IElement<T>;
    }

    public removeFirst() {
        if (this.isEmpty()) {
            throw new Error("Cannot remove an element from an empty list")
        }

        const removedNode = this.head!;

        if (this.hasOneNode()) {
            this.reset();
        } else {
            const newHead = this.head!.next!;
            this.head!.next = null;
            newHead.prev = null;
            this.head = newHead;
        }

        removedNode.markAsRemoved();

        return removedNode.value;
    }

    public removeLast() {
        if (this.isEmpty()) {
            throw new Error("Cannot remove an element from an empty list")
        }

        const removedNode = this.tail!;

        if (this.hasOneNode()) {
            this.reset();
        } else {
            const prev = this.tail!.prev!;
            this.tail!.prev = null;
            prev.next = null;
            this.tail = prev;
        }

        removedNode.markAsRemoved();

        return removedNode.value;
    }

    public remove(element: IElement<T>) {
        if (!(element instanceof Node)) {
            throw new Error("Invalid element type")
        }

        if (this.isEmpty()) {
            throw new Error("Cannot remove an element from an empty list")
        }

        const node = element as Node<T>;

        if (node.isRemoved()) {
            throw new Error("Element was removed")
        }

        if (!node.belongsTo(this)) {
            throw new Error("Element does not belong to this list")
        }

        if (node === this.head) {
            this.removeFirst();
            return;
        }

        if (node === this.tail) {
            this.removeLast();
            return;
        }

        const nextNode = node.next!;
        const prevNode = node.prev!;

        node.prev = null;
        node.next = null;
        prevNode.next = nextNode;
        nextNode.prev = prevNode;

        node.markAsRemoved();
    }

    private reset() {
        this.head = this.tail = null;
    }

    private hasOneNode() {
        return this.head === this.tail;
    }

    private initialize(node: Node<T>) {
        this.head = this.tail = node;
    }

    private isEmpty() {
        return this.head === null;
    }
}