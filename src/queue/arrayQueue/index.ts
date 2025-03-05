import {ArrayQueue} from "./ArrayQueue";


const queue = new ArrayQueue();

queue.enqueue(15);
queue.enqueue(25);
queue.enqueue(35);
queue.enqueue(45);
queue.enqueue(55);

queue.dequeue();
queue.dequeue();

console.log(queue.peek())