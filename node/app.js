const name = "Aniket";
const age = 23;
const {add, multiply } = require("./math");

console.log("Hello", name);
console.log("Age:", age);

console.log(age + 23);

console.log(add(10,20));
console.log(multiply(10,20));