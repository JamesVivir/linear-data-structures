import {LinkedQueue} from "./LinkedQueue";


const linkedQueue = new LinkedQueue();

linkedQueue.enqueue(11);
linkedQueue.enqueue(12);
linkedQueue.enqueue(13);
linkedQueue.enqueue(14);

console.log(linkedQueue.dequeue())
console.log(linkedQueue.dequeue())
console.log(linkedQueue.dequeue())
console.log(linkedQueue.dequeue())
console.log(linkedQueue.peek())

console.log("")