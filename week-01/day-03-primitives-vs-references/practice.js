// ============================================================
// Day 3 — Primitives vs References Practice
// Instructions: Predict the output BEFORE running each block.
// ============================================================


// ----------------------------------------------------------
// Exercise 1 — Primitive copy (by value)
// ----------------------------------------------------------
console.log("--- Exercise 1 ---");

let x = 5;
let y = x;
y = 100;

console.log(x); // ?
console.log(y); // ?

// Expected:
// 5
// 100


// ----------------------------------------------------------
// Exercise 2 — Reference copy (by address)
// ----------------------------------------------------------
console.log("\n--- Exercise 2 ---");

let arr1 = [1, 2, 3];
let arr2 = arr1;
arr2.push(4);

console.log(arr1); // ?
console.log(arr2); // ?

// Expected:
// [1, 2, 3, 4]
// [1, 2, 3, 4]


// ----------------------------------------------------------
// Exercise 3 — Shallow copy with spread
// ----------------------------------------------------------
console.log("\n--- Exercise 3 ---");

let obj1 = { score: 10 };
let obj2 = { ...obj1 };
obj2.score = 99;

console.log(obj1.score); // ?
console.log(obj2.score); // ?

// Expected:
// 10
// 99


// ----------------------------------------------------------
// Exercise 4 — Shallow copy TRAP (nested objects)
// ----------------------------------------------------------
console.log("\n--- Exercise 4 ---");

let original = {
  name: "Deepanshi",
  address: { city: "Delhi" }
};

let copy = { ...original };
copy.name = "Deep";             // top-level — safe?
copy.address.city = "Mumbai";   // nested — safe?

console.log(original.name);         // ?
console.log(original.address.city); // ?

// Expected:
// Deepanshi   ← top-level is independent ✅
// Mumbai      ← nested is still shared ❌


// ----------------------------------------------------------
// Exercise 5 — Deep copy with structuredClone
// ----------------------------------------------------------
console.log("\n--- Exercise 5 ---");

let data = {
  name: "Deepanshi",
  address: { city: "Delhi" }
};

let deepCopy = structuredClone(data);
deepCopy.address.city = "Mumbai";

console.log(data.address.city);     // ?
console.log(deepCopy.address.city); // ?

// Expected:
// Delhi    ← original safe ✅
// Mumbai


// ----------------------------------------------------------
// Exercise 6 — Function mutation trap
// ----------------------------------------------------------
console.log("\n--- Exercise 6 ---");

function birthday(person) {
  person.age += 1;
}

let user = { name: "Deepanshi", age: 28 };
birthday(user);

console.log(user.age); // ?

// Expected:
// 29 ← original mutated ❌

// Fix it — rewrite birthday() to NOT mutate the original
function birthdaySafe(person) {
  // YOUR CODE HERE — return a new object
}

let user2 = { name: "Deepanshi", age: 28 };
let older = birthdaySafe(user2);

console.log(user2.age);  // Should be 28 ✅
console.log(older?.age); // Should be 29 ✅


// ----------------------------------------------------------
// Challenge — Reference equality
// ----------------------------------------------------------
console.log("\n--- Challenge ---");

let a = {};
let b = {};
let c = a;

console.log(a === b); // ?
console.log(a === c); // ?
console.log([] === []); // ?

// Expected:
// false — different addresses
// true  — same address
// false — different arrays
