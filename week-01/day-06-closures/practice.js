// ============================================================
// Day 6 — Closures Practice
// Instructions: Predict the output BEFORE running each block.
// ============================================================


// ----------------------------------------------------------
// Exercise 1 — Basic closure
// What prints?
// ----------------------------------------------------------
console.log("--- Exercise 1 ---");

function outer() {
  let count = 0;

  return function() {
    count++;
    console.log(count);
  };
}

const counter = outer();
counter(); // ?
counter(); // ?
counter(); // ?

// Expected:
// 1
// 2
// 3


// ----------------------------------------------------------
// Exercise 2 — Independent closures
// Do counter1 and counter2 share state?
// ----------------------------------------------------------
console.log("\n--- Exercise 2 ---");

const counter1 = outer();
const counter2 = outer();

counter1(); // ?
counter1(); // ?
counter2(); // ?
counter1(); // ?

// Expected:
// 1  ← counter1
// 2  ← counter1
// 1  ← counter2 — starts fresh
// 3  ← counter1 — continues from 2


// ----------------------------------------------------------
// Exercise 3 — Classic loop trap
// What does this print?
// ----------------------------------------------------------
console.log("\n--- Exercise 3 ---");

function makeFunctions() {
  const funcs = [];
  for (var i = 0; i < 3; i++) {
    funcs.push(function() { return i; });
  }
  return funcs;
}

const fns = makeFunctions();
console.log(fns[0]()); // ?
console.log(fns[1]()); // ?
console.log(fns[2]()); // ?

// Expected:
// 3 ← all share the same var i
// 3
// 3


// ----------------------------------------------------------
// Exercise 4 — Fix the loop trap with let
// ----------------------------------------------------------
console.log("\n--- Exercise 4 ---");

function makeFunctionsFixed() {
  const funcs = [];
  for (let i = 0; i < 3; i++) {  // let creates new i each iteration
    funcs.push(function() { return i; });
  }
  return funcs;
}

const fnsFixed = makeFunctionsFixed();
console.log(fnsFixed[0]()); // ?
console.log(fnsFixed[1]()); // ?
console.log(fnsFixed[2]()); // ?

// Expected:
// 0 ✅
// 1 ✅
// 2 ✅


// ----------------------------------------------------------
// Exercise 5 — Scope chain lookup
// Where does JS find 'name'?
// ----------------------------------------------------------
console.log("\n--- Exercise 5 ---");

let name = "Global";

function level1() {
  let name = "Level1";

  function level2() {
    function level3() {
      console.log(name); // which 'name' does this find?
    }
    level3();
  }
  level2();
}

level1();

// Expected:
// "Level1" — walks up: level3 (no name) → level2 (no name) → level1 (found!)


// ----------------------------------------------------------
// Challenge 1 — Build makeCounter()
// Return an object with increment, decrement, reset, getCount
// count must be private (not accessible from outside)
// ----------------------------------------------------------
console.log("\n--- Challenge 1 ---");

function makeCounter() {
  // YOUR CODE HERE
}

const c = makeCounter();
c.increment();
c.increment();
c.increment();
c.decrement();
console.log(c.getCount()); // 2
console.log(c.count);      // undefined — private ✅
c.reset();
console.log(c.getCount()); // 0


// ----------------------------------------------------------
// Challenge 2 — Implement makeAdder
// makeAdder(5)(3) should return 8
// ----------------------------------------------------------
console.log("\n--- Challenge 2 ---");

function makeAdder(x) {
  // YOUR CODE HERE
}

console.log(makeAdder(5)(3));   // 8
console.log(makeAdder(10)(2));  // 12
console.log(makeAdder(0)(5));   // 5


// ----------------------------------------------------------
// Challenge 3 — Memoize
// Build a memoize() function that caches results
// ----------------------------------------------------------
console.log("\n--- Challenge 3 ---");

function memoize(fn) {
  // YOUR CODE HERE
  // Hint: close over a cache object {}
}

const square = memoize(n => {
  console.log(`  computing ${n}²`);
  return n * n;
});

console.log(square(4)); // "computing 4²" then 16
console.log(square(4)); // no log — returns cached 16
console.log(square(5)); // "computing 5²" then 25
console.log(square(5)); // no log — returns cached 25


// ----------------------------------------------------------
// Solutions (reveal after attempting)
// ----------------------------------------------------------

/*
// Challenge 1
function makeCounter() {
  let count = 0;
  return {
    increment() { count++; },
    decrement() { count--; },
    reset()     { count = 0; },
    getCount()  { return count; }
  };
}

// Challenge 2
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

// Challenge 3
function memoize(fn) {
  const cache = {};
  return function(n) {
    if (cache[n] !== undefined) return cache[n];
    cache[n] = fn(n);
    return cache[n];
  };
}
*/
