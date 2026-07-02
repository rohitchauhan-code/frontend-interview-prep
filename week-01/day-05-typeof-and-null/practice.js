// ============================================================
// Day 5 — typeof & null Quirks Practice
// Instructions: Predict the output BEFORE running each block.
// ============================================================


// ----------------------------------------------------------
// Exercise 1 — typeof truth table
// Fill in the expected output for each
// ----------------------------------------------------------
console.log("--- Exercise 1 ---");

console.log(typeof 42);            // ?
console.log(typeof NaN);           // ?
console.log(typeof "hello");       // ?
console.log(typeof true);          // ?
console.log(typeof undefined);     // ?
console.log(typeof null);          // ?
console.log(typeof {});            // ?
console.log(typeof []);            // ?
console.log(typeof function(){}); // ?

// Expected:
// "number"
// "number"    ← NaN is type number
// "string"
// "boolean"
// "undefined"
// "object"    ← the bug
// "object"
// "object"    ← arrays are objects
// "function"


// ----------------------------------------------------------
// Exercise 2 — null behaviour
// ----------------------------------------------------------
console.log("\n--- Exercise 2 ---");

console.log(typeof null === "object"); // ?
console.log(null === null);            // ?
console.log(null === undefined);       // ?
console.log(null == undefined);        // ?
console.log(null == 0);               // ?
console.log(null == false);           // ?
console.log(null == "");              // ?

// Expected:
// true   ← the bug
// true
// false
// true   ← special loose equality rule
// false  ← null ONLY == undefined
// false
// false


// ----------------------------------------------------------
// Exercise 3 — NaN quirks
// ----------------------------------------------------------
console.log("\n--- Exercise 3 ---");

console.log(NaN === NaN);          // ?
console.log(NaN == NaN);           // ?
console.log(typeof NaN);           // ?
console.log(Number.isNaN(NaN));    // ?
console.log(Number.isNaN("hello"));// ?
console.log(isNaN("hello"));       // ?
console.log(isNaN(undefined));     // ?

// Expected:
// false   ← NaN never equals itself
// false
// "number"
// true    ✅
// false   ✅ — doesn't coerce
// true    ❌ — coerces "hello" to NaN first
// true    ❌ — coerces undefined to NaN first


// ----------------------------------------------------------
// Exercise 4 — Reliable checks
// Fix each broken check with the correct alternative
// ----------------------------------------------------------
console.log("\n--- Exercise 4 ---");

let val = null;
let arr = [1, 2, 3];
let nan = NaN;
let num = 42;
let obj = { name: "Deepanshi" };

// ❌ Broken — fix each:
console.log(typeof val === "object");   // true for null — unreliable
console.log(typeof arr === "array");    // false — "array" doesn't exist
console.log(nan === NaN);              // false — NaN never equals NaN

// ✅ Write the correct checks:
console.log(val === null);             // null check
console.log(Array.isArray(arr));       // array check
console.log(Number.isNaN(nan));        // NaN check


// ----------------------------------------------------------
// Exercise 5 — Nullish check (valid == use)
// ----------------------------------------------------------
console.log("\n--- Exercise 5 ---");

function greet(name) {
  // Check for both null and undefined in one line
  if (name == null) {
    return "Hello, Guest!";
  }
  return `Hello, ${name}!`;
}

console.log(greet("Deepanshi")); // ?
console.log(greet(null));        // ?
console.log(greet(undefined));   // ?
console.log(greet(0));           // ?  ← 0 is NOT nullish

// Expected:
// "Hello, Deepanshi!"
// "Hello, Guest!"
// "Hello, Guest!"
// "Hello, 0!"   ← 0 passes the null check, only null/undefined are caught


// ----------------------------------------------------------
// Challenge — Build a reliable getType() function
// Fix all typeof quirks
// ----------------------------------------------------------
console.log("\n--- Challenge ---");

function getType(value) {
  // YOUR CODE HERE
  // Handle these cases in order:
  // 1. null       → "null"      (not "object")
  // 2. array      → "array"     (not "object")
  // 3. NaN        → "nan"       (not "number")
  // 4. everything else → typeof value
}

// Test cases — all should pass:
console.log(getType(null)         === "null");       // true ✅
console.log(getType([1, 2, 3])    === "array");      // true ✅
console.log(getType(NaN)          === "nan");         // true ✅
console.log(getType(42)           === "number");      // true ✅
console.log(getType("hi")         === "string");      // true ✅
console.log(getType(true)         === "boolean");     // true ✅
console.log(getType(undefined)    === "undefined");   // true ✅
console.log(getType({}))          ;                   // "object"
console.log(getType(function(){}));                   // "function"


// ----------------------------------------------------------
// Solution (reveal after attempting)
// ----------------------------------------------------------

/*
function getType(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  if (Number.isNaN(value)) return "nan";
  return typeof value;
}
*/
