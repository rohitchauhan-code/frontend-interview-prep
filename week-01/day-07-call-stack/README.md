# Day 7 — The Call Stack & Execution Context

> **In one line:** The call stack is JS's mechanism for tracking which function is currently running and where to return when it finishes — it's a stack of execution contexts, each holding the local variables and state of one function call.

---

## 📚 What is a Stack?

A stack is a **Last In, First Out (LIFO)** data structure. Like a stack of plates — you always add and remove from the top.

```
Push (add):        Pop (remove):
    [ C ]              [ B ]
    [ B ]      →       [ A ]
    [ A ]          (C was removed)
```

---

## 📦 Execution Context

Every time JS runs code, it creates an **Execution Context** — a workspace containing:

```
Execution Context
┌─────────────────────────────────┐
│ 1. Variable Environment         │
│    (all local variables)        │
│                                 │
│ 2. Scope Chain                  │
│    (reference to outer scopes)  │
│                                 │
│ 3. this binding                 │
│    (what 'this' refers to)      │
└─────────────────────────────────┘
```

**Two types:**
- **Global Execution Context (GEC)** — created once when your script loads
- **Function Execution Context (FEC)** — created every time a function is called

---

## 🔢 Call Stack in Action — Step by Step

```js
function greet(name) {
  const message = sayHello(name);
  return message;
}

function sayHello(name) {
  return "Hello, " + name + "!";
}

const result = greet("Deepanshi");
console.log(result);
```

```
Step 1 — Script loads:
┌─────────────────────────┐
│   Global Context        │
│   greet = [fn]          │
│   sayHello = [fn]       │
│   result = undefined    │
└─────────────────────────┘

Step 2 — greet() called:
┌─────────────────────────┐
│   greet()               │ ← pushed
│   name = "Deepanshi"    │
├─────────────────────────┤
│   Global Context        │
└─────────────────────────┘

Step 3 — sayHello() called inside greet():
┌─────────────────────────┐
│   sayHello()            │ ← pushed
│   name = "Deepanshi"    │
├─────────────────────────┤
│   greet()               │ ← paused
├─────────────────────────┤
│   Global Context        │
└─────────────────────────┘

Step 4 — sayHello() returns:
┌─────────────────────────┐
│   greet()               │ ← resumes
│   message = "Hello,..." │
├─────────────────────────┤
│   Global Context        │
└─────────────────────────┘

Step 5 — greet() returns:
┌─────────────────────────┐
│   Global Context        │
│   result = "Hello,..."  │
└─────────────────────────┘

Step 6 — Script finishes:
┌─────────────────────────┐
│   (empty)               │
└─────────────────────────┘
```

---

## 🧵 Single Threaded

JS has **one call stack** — it can only do **one thing at a time**.

```js
console.log("1"); // runs, done
console.log("2"); // runs, done
console.log("3"); // runs, done
// Always: 1, 2, 3
```

This is what **"JS is single-threaded"** means. One call stack = one execution path.

---

## 💥 Stack Overflow

The call stack has a size limit (~10,000–15,000 frames). Infinite recursion exceeds it:

```js
function infinite() {
  return infinite(); // no base case!
}
infinite(); // ❌ RangeError: Maximum call stack size exceeded
```

**Always have a base case in recursion:**

```js
function countdown(n) {
  if (n === 0) return "done"; // ← base case
  console.log(n);
  return countdown(n - 1);   // ← moves toward base case
}
countdown(5); // 5, 4, 3, 2, 1, "done" ✅
```

---

## 🧠 Stack vs Heap — Where Things Live

```
┌──────────────────────┐      ┌────────────────────────────┐
│      CALL STACK      │      │           HEAP             │
│                      │      │                            │
│  greet()             │      │  { name: "Deepanshi" }     │
│    name ─────────────┼──→   │                            │
│                      │      │  [1, 2, 3, 4]              │
│  Global Context      │      │                            │
│    user ─────────────┼──→   │  { age: 28 }               │
└──────────────────────┘      └────────────────────────────┘

Stack → primitives + references (addresses)
Heap  → objects, arrays, functions, closures
```

- **Primitives** → stored directly on the stack
- **Objects/arrays/functions** → stored in the heap, stack holds their address

This is exactly why primitives copy by value and objects copy by reference.

---

## 🎒 How Closures Connect to the Call Stack

```js
function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}

const counter = outer();
```

When `outer()` finishes and is popped off the stack:
- Normally its variables would be destroyed
- But `inner` holds a reference to `count`
- So `count` moves to the **heap** and stays alive

```
Call Stack (after outer returns):      Heap:
┌───────────────────┐          ┌───────────────────────────┐
│  Global Context   │          │  inner() {                │
│  counter ─────────┼──────→   │    [[scope]] → { count } │
└───────────────────┘          │  }                        │
                               │  { count: 0 } ← alive!   │
                               └───────────────────────────┘
```

**This is exactly why closures work** — the execution context leaves the stack, but its variables survive in the heap through the closure reference.

---

## 🔭 See It Live in DevTools

1. Open Chrome → F12 → **Sources** tab
2. Add `debugger;` anywhere in your code
3. Run it — execution pauses
4. Look at the **Call Stack** panel on the right
5. See every frame currently on the stack

This is the most powerful debugging tool you have.

---

## ⏭️ Async — Teaser for Week 5

```js
console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");
// Output: 1, 3, 2
```

Why does `2` print last even with 0ms? Because `setTimeout` runs outside the call stack — in a **Web API**. Its callback goes into a **queue** and can only enter the stack when the stack is **empty**.

```
Call Stack       Web API          Callback Queue
──────────       ───────          ──────────────
log("1")
setTimeout ──→   timer ───────→   [() => log("2")]
log("3")
(empty)  ←──────────────────────  callback enters
log("2")
```

This is the **Event Loop** — Week 5 will go deep on this.

---

## 🏗️ Full Architecture Diagram

```
                    JS ENGINE
┌─────────────────────────────────────────────┐
│                                             │
│   CALL STACK              HEAP              │
│   ┌──────────┐         ┌──────────────┐    │
│   │ fn3()    │         │ objects      │    │
│   │ fn2()    │  ←────→ │ arrays       │    │
│   │ fn1()    │         │ functions    │    │
│   │ Global   │         │ closures     │    │
│   └──────────┘         └──────────────┘    │
│                                             │
└─────────────────────────────────────────────┘
           ↕  (async — Week 5)
   Web APIs + Event Loop + Task Queues
```

---

## ✅ Takeaways

- Call stack = LIFO tracker of what's currently executing
- Every function call creates an Execution Context (variables + scope + `this`)
- JS is **single-threaded** — one call stack, one thing at a time
- Stack overflow = recursion without a base case
- Primitives live on the **stack**; objects live in the **heap**
- Closures work because closed-over variables move to the heap and stay alive
- Async works around the single thread via the **Event Loop** (Week 5)

---

## 🎯 Interview Questions

**Q1. What is the call stack in JavaScript?**

<details>
<summary>💡 See Answer</summary>

The call stack is a LIFO (Last In, First Out) data structure that JS uses to track function execution. Every time a function is called, a new Execution Context is pushed onto the stack containing that function's local variables, scope chain, and `this` binding. When the function returns, its context is popped off and execution resumes at the previous frame. JS is single-threaded, meaning there's only one call stack and only one thing executes at a time.

</details>

---

**Q2. What is a stack overflow and how do you prevent it?**

<details>
<summary>💡 See Answer</summary>

A stack overflow happens when the call stack exceeds its size limit — typically caused by infinite recursion (a function calling itself with no way to stop).

```js
// ❌ Stack overflow
function infinite() { return infinite(); }

// ✅ Safe recursion with base case
function countdown(n) {
  if (n === 0) return "done"; // base case — stops the recursion
  return countdown(n - 1);
}
```

Always ensure recursive functions have a **base case** that terminates the recursion.

</details>

---

**Q3. What is the difference between the call stack and the heap?**

<details>
<summary>💡 See Answer</summary>

The **call stack** tracks function execution — it holds Execution Contexts with local variables and references. It's ordered and has a fixed size. Primitive values (`number`, `string`, `boolean`) are stored directly on the stack.

The **heap** is unstructured memory where objects, arrays, and functions are stored. The stack holds references (memory addresses) pointing into the heap.

This distinction explains two key behaviours:
- Primitives are **copied by value** (copy the stack value)
- Objects are **copied by reference** (copy the heap address)
- Closures work because closed-over variables persist in the heap even after their function returns

</details>
