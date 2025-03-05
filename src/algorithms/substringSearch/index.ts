import {SubstringSearch} from "./SubstringSearch";

const substringSearch = new SubstringSearch();

console.log(substringSearch.boyerMooreSearch("hello world", "world"));
console.log(substringSearch.boyerMooreSearch("hello world", "hello"));
console.log(substringSearch.boyerMooreSearch("hello world", "foo"));
console.log(substringSearch.boyerMooreSearch("", "hello"));
console.log(substringSearch.boyerMooreSearch("hello world", ""));
console.log(substringSearch.boyerMooreSearch("hello", "hello"));
console.log(substringSearch.boyerMooreSearch("abacababacab", "abacab"));
console.log(substringSearch.boyerMooreSearch("hello world", "o"));
console.log(substringSearch.boyerMooreSearch("hello world", "o w"));
console.log(substringSearch.boyerMooreSearch("Hello World", "world"));