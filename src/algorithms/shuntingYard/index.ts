import {ShuntingYard} from "./ShuntingYard";

const shuntingYard = new ShuntingYard();

const rpn = shuntingYard.infixToRPN("815-(4*6)/2-1")
console.log(rpn)

const result = shuntingYard.evaluateRPN(rpn);
console.log(result)