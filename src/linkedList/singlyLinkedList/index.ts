import {LinkedList} from "./LinkedList";

const linkedList = new LinkedList();

linkedList.addLast(10);
linkedList.addLast(12);
linkedList.addLast(13);

for (let item of linkedList) {
    console.log(item)
}