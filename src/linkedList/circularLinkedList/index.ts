import {CircularLinkedList} from "./CircularLinkedList";

const circularLinkedList = new CircularLinkedList();

circularLinkedList.addLast(10);
circularLinkedList.addLast(20);
circularLinkedList.addLast(30);
circularLinkedList.addLast(40);
circularLinkedList.addLast(50);

circularLinkedList.setCycle(60);

console.log(circularLinkedList.getCycleHead())