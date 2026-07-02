// ============================================================
// Day 7 — Call Stack & Execution Context Practice
// Instructions: Trace the call stack for each snippet.
// Draw it on paper first, then run to verify.
// ============================================================


// ----------------------------------------------------------
// Exercise 1 — Trace the stack
// Write down what's on the stack at each numbered point
// ----------------------------------------------------------
console.log("--- Exercise 1 ---");

function a() {
  console.log("inside a"); // [2]
  b();
  console.log("back in a"); // [4]
}

function b() {
  console.log("inside b"); // [3]
}

console.log("start"); // [1]
a();
console.log("end"); // [5]

/*
Stack at [1]: [ Global ]
Stack at [2]: [ a(), Global ]
Stack at [3]: [ b(), a(), Global ]
Stack at [4]: [ a(), Global ]          ← b() was popped
Stack at [5]: [ Global ]               ← a() was popped

Output:
start
inside a
inside b
back in a
end
*/


// ----------------------------------------------------------
// Exercise 2 — Nested calls, deeper stack
// Trace the stack at each step
// ----------------------------------------------------------
console.log("\n--- Exercise 2 ---");

function first() {
  console.log("first start");
  second();
  console.log("first end");
}

function second() {
  console.log("second start");
  third();
  console.log("second end");
}

function third() {
  console.log("third");
}

first();

/*
Expected output:
first start
second start
third
second end
first end

Stack at deepest point:
┌──────────┐
│ third()  │
│ second() │
│ first()  │
│ Global   │
└──────────┘
*/


// ----------------------------------------------------------
// Exercise 3 — Execution context & variables
// Each function gets its own execution context
// ----------------------------------------------------------
console.log("\n--- Exercise 3 ---");

let x = "global";

function foo() {
  let x = "foo";        // own execution context, own x
  console.log(x);       // which x?
  bar();
  console.log(x);       // still foo's x?
}

function bar() {
  let x = "bar";        // own execution context, own x
  console.log(x);       // which x?
}

console.log(x);  // ?
foo();
console.log(x);  // ?

// Expected:
// global
// foo
// bar
// foo
// global


// ----------------------------------------------------------
// Exercise 4 — Stack overflow
// Understand why this crashes
// ----------------------------------------------------------
console.log("\n--- Exercise 4 ---");

function countDown(n) {
  console.log(n);
  countDown(n - 1); // ❌ no base case — infinite recursion
}

// Uncomment to see the error (will crash):
// countDown(3);
// RangeError: Maximum call stack size exceeded

// ✅ Fixed version with base case:
function countDownSafe(n) {
  if (n < 0) return; // base case
  console.log(n);
  countDownSafe(n - 1);
}

countDownSafe(5);
// Expected: 5, 4, 3, 2, 1, 0


// ----------------------------------------------------------
// Exercise 5 — Stack + Closure connection
// How does the closed-over variable survive?
// ----------------------------------------------------------
console.log("\n--- Exercise 5 ---");

function makeAdder(x) {
  // When makeAdder returns, its execution context
  // leaves the stack. But x lives on in the heap
  // because the returned function references it.

  return function(y) {
    return x + y; // x is in the heap via closure
  };
}

const add10 = makeAdder(10);
// makeAdder(10) is now OFF the stack
// but x=10 is alive in the heap

console.log(add10(5));  // 15 — x still accessible
console.log(add10(20)); // 30 — same x

/*
Memory after makeAdder(10) returns:

Call Stack:         Heap:
┌──────────┐       ┌──────────────────────────┐
│ Global   │       │ add10 = function(y) {... │
│ add10 ───┼──────→│   [[scope]] → { x: 10 } │
└──────────┘       └──────────────────────────┘
*/


// ----------------------------------------------------------
// Challenge 1 — Implement safe recursion
// Write factorial(n) using recursion with a base case
// factorial(5) = 5 * 4 * 3 * 2 * 1 = 120
// ----------------------------------------------------------
console.log("\n--- Challenge 1 ---");

function factorial(n) {
  // YOUR CODE HERE
}

console.log(factorial(5));  // 120
console.log(factorial(0));  // 1  (0! = 1 by definition)
console.log(factorial(1));  // 1


// ----------------------------------------------------------
// Challenge 2 — Trace this manually before running
// ----------------------------------------------------------
console.log("\n--- Challenge 2 ---");

function outer() {
  let val = 10;

  function middle() {
    let val = 20; // shadows outer's val

    function inner() {
      console.log(val); // which val?
    }

    inner();
    console.log(val); // which val?
  }

  middle();
  console.log(val); // which val?
}

outer();

// Trace the call stack at the deepest point:
/*
┌──────────┐
│ inner()  │
│ middle() │
│ outer()  │
│ Global   │
└──────────┘

Expected output:
20   ← inner() looks up → finds middle()'s val
20   ← middle()'s own val
10   ← outer()'s own val
*/


// ----------------------------------------------------------
// Solutions
// ----------------------------------------------------------

/*
// Challenge 1
function factorial(n) {
  if (n <= 1) return 1;        // base case: 0! = 1, 1! = 1
  return n * factorial(n - 1); // recursive case
}
*/
