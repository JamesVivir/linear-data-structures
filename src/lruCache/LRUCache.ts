import {DoublyLinkedList, IElement} from "../linkedList/doublyLinkedList/DoublyLinkedList";

class CacheNode {
    public key: number;
    public value: number;


    constructor(key: number, value: number) {
        this.key = key;
        this.value = value;
    }
}

export class LRUCache {
    private capacity: number;
    private size: number = 0;
    private list: DoublyLinkedList<CacheNode> = new DoublyLinkedList();
    private map: Map<number, IElement<CacheNode>> = new Map();

    constructor(capacity: number) {
        if (capacity <= 0) {
            throw new Error("Capacity must be greater than zero");
        }
        this.capacity = capacity;
    }

    public put(key: number, value: number) {
        if (this.map.has(key)) {
            const node = this.map.get(key)!;

            node.getValue().value = value;

            this.moveToFront(node);
        } else {
            if (this.isFull()) {
                const tail = this.list.removeLast();
                this.map.delete(tail.key);
                this.size--;
            }

            const cacheNode = new CacheNode(key, value);
            const element = this.list.addFirst(cacheNode);
            this.map.set(key, element);
            this.size++;
        }
    }

    public get(key: number) {
        if (!this.map.has(key)) {
            throw new Error("No such element");
        }

        const node = this.map.get(key)!;
        this.moveToFront(node);
        return node.getValue().value;
    }

    private moveToFront(element: IElement<CacheNode>) {
        this.list.remove(element);
        this.map.set(element.getValue().key, this.list.addFirst(element.getValue()));
    }

    private isFull() {
        return this.size === this.capacity;
    }
}