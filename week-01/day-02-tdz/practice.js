// ============================================================
// Day 2 — TDZ Practice
// Instructions: Predict the output BEFORE running each block.
// ============================================================


// ----------------------------------------------------------
// Exercise 1 — Basic TDZ
// What happens here?
// ----------------------------------------------------------
console.log("--- Exercise 1 ---");

try {
  console.log(city);
  let city = "Delhi";
} catch (e) {
  console.log(e.message);
}

// Expected:
// Cannot access 'city' before initialization


// ----------------------------------------------------------
// Exercise 2 — TDZ is Scope-Based
// Does this print "outside" or throw?
// ----------------------------------------------------------
console.log("\n--- Exercise 2 ---");

let a = "outside";

try {
  {
    console.log(a);  // ← What happens here?
    let a = "inside";
    console.log(a);
  }
} catch (e) {
  console.log(e.message);
}

// Expected:
// Cannot access 'a' before initialization


// ----------------------------------------------------------
// Exercise 3 — typeof is NOT safe in TDZ
// ----------------------------------------------------------
console.log("\n--- Exercise 3 ---");

// Safe — undeclared variable
console.log(typeof undeclaredVar);

// NOT safe — TDZ variable
try {
  console.log(typeof x);
  let x = 5;
} catch (e) {
  console.log(e.message);
}

// Expected:
// undefined
// Cannot access 'x' before initialization


// ----------------------------------------------------------
// Exercise 4 — Default Parameter TDZ
// ----------------------------------------------------------
console.log("\n--- Exercise 4 ---");

try {
  function test(a = b, b = 2) {
    return [a, b];
  }
  console.log(test());
} catch (e) {
  console.log(e.message);
}

function testFixed(a = 2, b = a) {
  return [a, b];
}
console.log(testFixed());

// Expected:
// Cannot access 'b' before initialization
// [2, 2]


// ----------------------------------------------------------
// Challenge — Prove hoisting by observing the error message
// Write a block that demonstrates let IS hoisted
// by catching the specific ReferenceError message
// ----------------------------------------------------------
console.log("\n--- Challenge ---");

// YOUR CODE HERE
// Hint: the error message "Cannot access 'x' before initialization"
// proves hoisting happened — because "x is not defined"
// would mean it was never registered at all.
