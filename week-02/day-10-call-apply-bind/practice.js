// ============================================================
// Day 10 — call, apply, bind in Depth
// Instructions: Predict the output BEFORE running each block.
// ============================================================


// ----------------------------------------------------------
// Exercise 1 — call: Borrowing methods
// ----------------------------------------------------------
console.log("--- Exercise 1 ---");

const arrayLike = { 0: "React", 1: "Node", 2: "CSS", length: 3 };

// arrayLike is NOT a real array — use call to borrow Array methods
const joined  = Array.prototype.join.call(arrayLike, " → ");
const sliced  = Array.prototype.slice.call(arrayLike, 1); // from index 1

console.log(joined);  // ?
console.log(sliced);  // ?

// Expected:
// "React → Node → CSS"
// ["Node", "CSS"]


// ----------------------------------------------------------
// Exercise 2 — apply: Math with arrays
// ----------------------------------------------------------
console.log("\n--- Exercise 2 ---");

const scores = [88, 95, 72, 100, 61];

const highest = Math.max.apply(null, scores); // ?
const lowest  = Math.min.apply(null, scores); // ?

// Modern alternative (try this too):
const highest2 = Math.max(...scores); // ?

console.log(highest);  // ?
console.log(lowest);   // ?
console.log(highest2); // ?

// Expected:
// 100
// 61
// 100


// ----------------------------------------------------------
// Exercise 3 — bind: Lock this for callbacks
// ----------------------------------------------------------
console.log("\n--- Exercise 3 ---");

const user = {
  name: "Deepanshi",
  greet(greeting) {
    return `${greeting}, ${this.name}!`;
  }
};

// Without bind — this is lost
const detached = user.greet;
// console.log(detached("Hello")); // ❌ undefined

// With bind — this is locked
const boundGreet = user.greet.bind(user);
console.log(boundGreet("Hello")); // ?
console.log(boundGreet("Hi"));    // ?

// Expected:
// "Hello, Deepanshi!"
// "Hi, Deepanshi!"


// ----------------------------------------------------------
// Exercise 4 — Partial Application with bind
// ----------------------------------------------------------
console.log("\n--- Exercise 4 ---");

function power(base, exponent) {
  return Math.pow(base, exponent);
}

// Create specialized functions using partial application
const square = power.bind(null, /* what goes here? */);   // pre-fill base? no — we want base to vary
// Hmm — actually: power(base, exponent), let's pre-fill exponent instead
// bind(thisArg, base) — that pre-fills base, not exponent
// To pre-fill exponent, we need to restructure: power(exponent, base)

// Better example:
function multiply(factor, number) {
  return factor * number;
}

const double   = multiply.bind(null, 2);
const triple   = multiply.bind(null, 3);
const tenTimes = multiply.bind(null, 10);

console.log(double(7));    // ?
console.log(triple(7));    // ?
console.log(tenTimes(7));  // ?

// Expected:
// 14
// 21
// 70


// ----------------------------------------------------------
// Exercise 5 — call vs apply vs bind: Same result, different syntax
// ----------------------------------------------------------
console.log("\n--- Exercise 5 ---");

function describe() {
  return `${this.brand} (${this.year}) — ${this.speed}kmph`;
}

const car  = { brand: "Tesla", year: 2024, speed: 250 };
const bike = { brand: "Ducati", year: 2023, speed: 299 };

console.log(describe.call(car));        // ?
console.log(describe.apply(bike));      // ?
const describeCar = describe.bind(car);
console.log(describeCar());             // ?

// Expected:
// "Tesla (2024) — 250kmph"
// "Ducati (2023) — 299kmph"
// "Tesla (2024) — 250kmph"


// ----------------------------------------------------------
// Exercise 6 — call with arguments
// ----------------------------------------------------------
console.log("\n--- Exercise 6 ---");

function introduce(city, role) {
  return `I'm ${this.name} from ${city}, working as ${role}.`;
}

const dev  = { name: "Deepanshi" };
const mgr  = { name: "Rohit" };

console.log(introduce.call(dev, "Delhi", "Frontend Dev"));     // ?
console.log(introduce.apply(mgr, ["Mumbai", "Engineering Manager"])); // ?

const deepanshiIntro = introduce.bind(dev, "Delhi");
console.log(deepanshiIntro("Senior Dev"));  // ?
console.log(deepanshiIntro("Tech Lead"));   // ?

// Expected:
// "I'm Deepanshi from Delhi, working as Frontend Dev."
// "I'm Rohit from Mumbai, working as Engineering Manager."
// "I'm Deepanshi from Delhi, working as Senior Dev."
// "I'm Deepanshi from Delhi, working as Tech Lead."


// ----------------------------------------------------------
// Exercise 7 — Arrow functions ignore call/apply/bind
// ----------------------------------------------------------
console.log("\n--- Exercise 7 ---");

const arrowGreet = () => `Hello, ${this?.name ?? "no name"}`;

const person = { name: "Deepanshi" };

console.log(arrowGreet.call(person));    // ?
console.log(arrowGreet.apply(person));   // ?
console.log(arrowGreet.bind(person)()); // ?

// Expected: all print "Hello, no name"
// Arrow functions have no 'this' of their own — call/apply/bind can't override


// ----------------------------------------------------------
// Challenge 1 — Implement myBind from scratch
// ----------------------------------------------------------
console.log("\n--- Challenge 1 ---");

Function.prototype.myBind = function(thisArg, ...presetArgs) {
  // YOUR IMPLEMENTATION HERE
  // Hint: capture 'this' (the function), return a new function
  // that calls the original with thisArg and spread presetArgs + laterArgs
};

function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const user2 = { name: "Deepanshi" };

const myBound = greet.myBind(user2, "Hello");
console.log(myBound("!"));  // Should print: "Hello, Deepanshi!"
console.log(myBound("~"));  // Should print: "Hello, Deepanshi~"

// Verify partial application too:
const myBound2 = greet.myBind(user2);
console.log(myBound2("Hi", ".")); // Should print: "Hi, Deepanshi."


// ----------------------------------------------------------
// Challenge 2 — Implement myCall from scratch
// ----------------------------------------------------------
console.log("\n--- Challenge 2 ---");

Function.prototype.myCall = function(thisArg, ...args) {
  // YOUR IMPLEMENTATION HERE
  // Hint: temporarily attach 'this' (the fn) to thisArg as a property
  // Call it, delete the property, return the result
};

function showName() {
  return "Name: " + this.name;
}

const obj = { name: "Deepanshi" };
console.log(showName.myCall(obj)); // Should print: "Name: Deepanshi"


// ----------------------------------------------------------
// Challenge 3 — Constructor inheritance using call
// ----------------------------------------------------------
console.log("\n--- Challenge 3 ---");

function Vehicle(brand, speed) {
  this.brand = brand;
  this.speed = speed;
}

function ElectricCar(brand, speed, range) {
  // Use call to run Vehicle's setup
  // YOUR CODE HERE

  this.range = range;
  this.type = "electric";
}

const tesla = new ElectricCar("Tesla", 250, 600);
console.log(tesla.brand);  // Should print: "Tesla"
console.log(tesla.speed);  // Should print: 250
console.log(tesla.range);  // Should print: 600
console.log(tesla.type);   // Should print: "electric"


// ----------------------------------------------------------
// Challenge 4 — Fix the broken code using bind
// ----------------------------------------------------------
console.log("\n--- Challenge 4 ---");

class Notification {
  constructor(message) {
    this.message = message;
    // Fix: bind show() so it works when passed as callback
    // YOUR CODE HERE
  }

  show() {
    console.log("🔔 " + this.message);
  }
}

const notif = new Notification("Build successful!");
setTimeout(notif.show, 0); // ❌ currently broken — this.message will be undefined
// Fix it by binding 'show' in the constructor


// ----------------------------------------------------------
// Solutions
// ----------------------------------------------------------

/*
// Challenge 1 — myBind
Function.prototype.myBind = function(thisArg, ...presetArgs) {
  const fn = this;
  return function(...laterArgs) {
    return fn.call(thisArg, ...presetArgs, ...laterArgs);
  };
};

// Challenge 2 — myCall
Function.prototype.myCall = function(thisArg, ...args) {
  const sym = Symbol();
  thisArg[sym] = this;
  const result = thisArg[sym](...args);
  delete thisArg[sym];
  return result;
};

// Challenge 3 — Constructor inheritance
function ElectricCar(brand, speed, range) {
  Vehicle.call(this, brand, speed); // ← run Vehicle setup with 'this'
  this.range = range;
  this.type = "electric";
}

// Challenge 4 — Fix notification
constructor(message) {
  this.message = message;
  this.show = this.show.bind(this); // ← lock this
}
*/
