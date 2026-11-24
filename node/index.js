const fs = require("fs");

fs.writeFileSync("message.txt", "Hello Node.js!");

const data = fs.readFileSync("message.txt", "utf8");
console.log(data);

fs.appendFileSync("message.txt", "\nI am learning backend development.");

console.log("Content added");

console.log("File created successfully");