import {HashTable} from "./HashTable";

const hashTable = new HashTable();

hashTable.put(10, "label1");
hashTable.put(-200, "label2");
hashTable.put(1837238, "label3");
hashTable.put(143, "label143");
hashTable.put(11, "label11");

hashTable.put(-200, "label200 updated");

hashTable.remove(10)
hashTable.remove(11)

console.log("")