import {ArrayStack} from "./ArrayStack";

const stack = new ArrayStack();

stack.push(0);
stack.push(3);
stack.push(5);
stack.push(1);

stack.sort();

stack.push(44)

while (!stack.isEmpty()) {
    console.log(stack.pop())
}

console.log("")