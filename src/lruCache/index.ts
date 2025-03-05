import {LRUCache} from "./LRUCache";

const lruCache = new LRUCache(4);

lruCache.put(1, 121);
lruCache.put(4, 412);
lruCache.put(5, 567);
lruCache.put(9, 921);

lruCache.put(11, 111)

console.log("")