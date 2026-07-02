// ============================================================
// Day 4 — Type Coercion Practice
// Instructions: Predict the output BEFORE running each block.
// ============================================================


// ----------------------------------------------------------
// Exercise 1 — === vs ==
// ----------------------------------------------------------
console.log("--- Exercise 1 ---");

console.log(0 == false);   // ?
console.log(0 === false);  // ?

console.log("" == false);  // ?
console.log("" === false); // ?

// Expected:
// true
// false
// true
// false


// ----------------------------------------------------------
// Exercise 2 — null and undefined
// ----------------------------------------------------------
console.log("\n--- Exercise 2 ---");

console.log(null == undefined);  // ?
console.log(null === undefined); // ?
console.log(null == 0);         // ?
console.log(null == false);     // ?

// Expected:
// true   ← special rule: null == undefined is always true
// false
// false  ← null only == undefined, nothing else
// false


// ----------------------------------------------------------
// Exercise 3 — typeof checks
// ----------------------------------------------------------
console.log("\n--- Exercise 3 ---");

console.log(typeof null);         // ?
console.log(typeof []);           // ?
console.log(typeof function(){}); // ?
console.log(typeof undefined);    // ?
console.log(typeof NaN);          // ?

// Expected:
// "object"    ← famous bug
// "object"    ← arrays are objects
// "function"
// "undefined"
// "number"    ← NaN is type number, ironically


// ----------------------------------------------------------
// Exercise 4 — Coercion with operators
// ----------------------------------------------------------
console.log("\n--- Exercise 4 ---");

console.log("5" + 1);  // ?
console.log("5" - 1);  // ?
console.log(true + 1); // ?
console.log(false + 1);// ?
console.log(null + 1); // ?

// Expected:
// "51"  ← + with string = concatenation
// 4     ← - forces numeric conversion
// 2     ← true → 1
// 1     ← false → 0
// 1     ← null → 0


// ----------------------------------------------------------
// Exercise 5 — Truthy and Falsy
// Which of these are falsy?
// ----------------------------------------------------------
console.log("\n--- Exercise 5 ---");

const values = [0, "", null, undefined, NaN, false, "0", [], {}, -1];

values.forEach(v => {
  console.log(`${JSON.stringify(v)} is ${v ? "truthy" : "falsy"}`);
});

// Expected falsy:  0, "", null, undefined, NaN, false
// Expected truthy: "0", [], {}, -1
// (non-empty strings, arrays, objects — even empty ones — are truthy)


// ----------------------------------------------------------
// Exercise 6 — Safe type checking
// Fix the broken checks using proper methods
// ----------------------------------------------------------
console.log("\n--- Exercise 6 ---");

let data = null;
let arr = [1, 2, 3];
let num = NaN;

// ❌ Broken checks — fix these:
// console.log(typeof data === "object"); // true even for null!
// console.log(typeof arr === "array");   // "array" doesn't exist
// console.log(num === NaN);              // NaN is never === NaN

// ✅ Write correct checks below:
console.log(data === null);         // null check
console.log(Array.isArray(arr));    // array check
console.log(Number.isNaN(num));     // NaN check


// ----------------------------------------------------------
// Challenge — Predict the wild one
// ----------------------------------------------------------
console.log("\n--- Challenge ---");

console.log([] == ![]);  // ?

// Walk through it step by step:
// 1. ![] = ?     ([] is truthy, so ![] = ?)
// 2. [] == false
// 3. [] converts to primitive = "" → 0
// 4. false → 0
// 5. 0 == 0 = ?

// Expected: true 🤯
