// ============================================================
// Day 1 — Hoisting Practice
// Instructions: Predict the output of each snippet BEFORE
// running it. Then run and verify.
// ============================================================


// ----------------------------------------------------------
// Exercise 1 — Basic var hoisting
// What does this print?
// ----------------------------------------------------------
console.log("--- Exercise 1 ---");

console.log(name);
var name = "Deepanshi";
console.log(name);

// Expected:
// undefined
// Deepanshi


// ----------------------------------------------------------
// Exercise 2 — let TDZ
// What does this print?
// ----------------------------------------------------------
console.log("\n--- Exercise 2 ---");

try {
  console.log(age);
  let age = 25;
} catch (e) {
  console.log(e.message);
}

// Expected:
// Cannot access 'age' before initialization


// ----------------------------------------------------------
// Exercise 3 — The Shadowing Trap
// What does this print?
// ----------------------------------------------------------
console.log("\n--- Exercise 3 ---");

var score = 10;

function getScore() {
  console.log(score);
  var score = 20;
  console.log(score);
}

getScore();

// Expected:
// undefined
// 20


// ----------------------------------------------------------
// Exercise 4 — Function declaration vs expression
// Which one works?
// ----------------------------------------------------------
console.log("\n--- Exercise 4 ---");

try {
  console.log(sayHello());
  function sayHello() { return "Hello!"; }
} catch (e) {
  console.log("sayHello error:", e.message);
}

try {
  console.log(sayBye());
  var sayBye = function() { return "Bye!"; };
} catch (e) {
  console.log("sayBye error:", e.message);
}

// Expected:
// Hello!
// sayBye error: sayBye is not a function


// ----------------------------------------------------------
// Exercise 5 — The Loop Trap
// What does this print?
// ----------------------------------------------------------
console.log("\n--- Exercise 5 (var loop) ---");

for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}

// Expected: 3, 3, 3

console.log("\n--- Exercise 5 (let loop fix) ---");

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 100);
}

// Expected: 0, 1, 2


// ----------------------------------------------------------
// Challenge — Write your own
// Create a function that demonstrates hoisting with var.
// The function should have a local var that shadows a global.
// ----------------------------------------------------------
console.log("\n--- Challenge ---");

const globalVal = "global";

function demonstrateHoisting() {
  // YOUR CODE HERE
  // Expected output:
  // undefined   ← local var shadowing global before assignment
  // local       ← after assignment
}

demonstrateHoisting();
