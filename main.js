import HashMap from "./HashMap.js";

const map = new HashMap();

map.set("apple", "red");
map.set("banana", "yellow");
map.set("carrot", "orange");
map.set("dog", "brown");
map.set("elephant", "gray");
map.set("frog", "green");
map.set("grape", "purple");
map.set("hat", "black");
map.set("ice cream", "white");
map.set("jacket", "blue");
map.set("kite", "pink");
map.set("lion", "golden");

map.set("apple", "green");
map.set("banana", "orange");
map.set("elephant", "black");
map.set("frog", "yellow");
map.set("dog", "black");
map.set("grape", "green");
map.set("kite", "white");
map.set("ice cream", "indigo");
map.set("jacket", "black");
map.set("carrot", "yellow");
map.set("hat", "white");
map.set("lion", "pink");

map.set("moon", "silver");

map.set("banana", "yellow");
map.set("carrot", "orange");
map.set("frog", "green");
map.set("grape", "purple");
map.set("ice cream", "white");
map.set("jacket", "blue");
map.set("kite", "pink");

console.log(map.length);
console.log(map.has("me"));
console.log(map.remove("kite"));
console.log(map.keys());
console.log(map.values());
console.log(map.entries());
map.clear();
console.log(map.length);
