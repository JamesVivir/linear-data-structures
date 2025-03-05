import {StringAlgorithms} from "./StringAlgorithms";

const algorithms = new StringAlgorithms();


console.log(algorithms.areAnagrams("listen", "silent"))
console.log(algorithms.areAnagrams("hello", "world"))
console.log(algorithms.areAnagrams("", ""))
console.log(algorithms.areAnagrams("abc", "abcd"))
console.log(algorithms.areAnagrams("listen ", " silent"))
console.log(algorithms.areAnagrams("aabbcc", "aabbc"))