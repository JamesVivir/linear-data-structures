import {LinkedList} from "../linkedList/singlyLinkedList/LinkedList";

class Entry {
    public key: number;
    public value: string;


    constructor(key: number, value: string) {
        this.key = key;
        this.value = value;
    }
}

export class HashTable {
    private readonly INITIAL_CAPACITY = 4;
    private readonly LOAD_FACTOR = 1;
    private map: (LinkedList<Entry> | null)[] = new Array(this.INITIAL_CAPACITY).fill(null);
    private size: number = 0;

    private getLoadFactor() {
        return this.size / this.map.length;
    }

    private needsReshape() {
        return this.getLoadFactor() >= this.LOAD_FACTOR;
    }

    private reshape() {
        if (!this.needsReshape()) return;

        const newCapacity = this.map.length * 2;
        const newMap: (LinkedList<Entry> | null)[] = new Array(newCapacity).fill(null);

        for (let bucket of this.map) {
            if (bucket) {
                for (let entry of bucket) {
                    this.rehashEntry(entry, newMap);
                }
            }
        }

        this.map = newMap;
    }

    private rehashEntry(entry: Entry, targetMap: (LinkedList<Entry> | null)[]) {
        const index = this.getIndex(entry.key, targetMap.length);
        if (!targetMap[index]) {
            targetMap[index] = new LinkedList<Entry>();
        }
        targetMap[index].addFirst(entry);
    }

    public put(key: number, value: string) {
        this.reshape();

        const bucket = this.getBucket(key, true)!;

        const entry = this.getEntry(bucket, key);
        if (entry) {
            entry.value = value;
        } else {
            bucket.addFirst(new Entry(key, value));
            this.size++;
        }
    }

    public get(key: number) {
        const bucket = this.getBucket(key);
        if (!bucket) {
            return null;
        }

        const entry = this.getEntry(bucket, key);

        return entry ? entry.value : null;
    }

    public remove(key: number) {
        const bucket = this.getBucket(key);
        if (!bucket) {
            throw new Error("No such element");
        }

        for (let entry of bucket) {
            if (entry.key === key) {
                bucket.remove(entry);
                this.size--;

                if (bucket.isEmpty()) {
                    this.map[this.getIndex(key)] = null;
                }

                return;
            }
        }

        throw new Error("No such element");
    }

    private getEntry(bucket: LinkedList<Entry>, key: number) {
        for (let entry of bucket) {
            if (entry.key === key) {
                return entry;
            }
        }

        return null;
    }

    private getBucket(key: number, createIfAbsent: boolean = false) {
        const index = this.getIndex(key);

        if (!this.map[index] && createIfAbsent) {
            this.map[index] = new LinkedList<Entry>();
        }

        return this.map[index];
    }

    private getIndex(key: number, mapLength = this.map.length) {
        return this.hash(key) & (mapLength - 1);
    }

    private hash(key: number) {
        return (key ^ (key >>> 16));
    }
}