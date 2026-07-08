# Day 10 — `call`, `apply`, `bind` in Depth

> **In one line:** `call`, `apply`, and `bind` are methods on every function that let you explicitly control what `this` refers to — `call` and `apply` invoke immediately, `bind` returns a new permanently-bound function.

---

## 🔑 Quick Reference

| Method | Invokes? | Args format | Returns |
|:--|:--:|:--|:--|
| `call(thisArg, a, b)` | ✅ immediately | comma-separated | function result |
| `apply(thisArg, [a, b])` | ✅ immediately | array | function result |
| `bind(thisArg, a, b)` | ❌ later | comma-separated | new bound function |

> **Memory trick:** **C**all = **C**omma · **A**pply = **A**rray · **B**ind = **B**akes in `this`

---

## 1️⃣ `call` — Deep Dive

Syntax: `fn.call(thisArg, arg1, arg2, ...)`

### Use case 1 — Borrowing array methods for array-like objects

`arguments`, DOM NodeLists, and similar objects look like arrays but aren't. You can borrow real array methods:

```js
function logArgs() {
  // arguments is not a real array — .join() doesn't exist on it
  const result = Array.prototype.join.call(arguments, " | ");
  console.log(result);
}

logArgs("JS", "React", "Node"); // "JS | React | Node"
```

### Use case 2 — The most reliable type checker

`typeof` and `instanceof` have quirks. `Object.prototype.toString` with `call` is the gold standard:

```js
Object.prototype.toString.call([]);          // "[object Array]"
Object.prototype.toString.call({});          // "[object Object]"
Object.prototype.toString.call(null);        // "[object Null]"
Object.prototype.toString.call(undefined);   // "[object Undefined]"
Object.prototype.toString.call(new Date());  // "[object Date]"
Object.prototype.toString.call(() => {});    // "[object Function]"

// Extract just the type name:
function getType(val) {
  return Object.prototype.toString.call(val).slice(8, -1);
}

getType([]);      // "Array"
getType(null);    // "Null"
getType(new Map()); // "Map"
```

### Use case 3 — Running parent constructor (inheritance pattern)

```js
function Animal(name, sound) {
  this.name = name;
  this.sound = sound;
}

function Dog(name) {
  Animal.call(this, name, "Woof"); // run Animal's setup with Dog's this
  this.type = "dog";
}

const dog = new Dog("Bruno");
console.log(dog.name);  // "Bruno"
console.log(dog.sound); // "Woof"
console.log(dog.type);  // "dog"
```

---

## 2️⃣ `apply` — Deep Dive

Syntax: `fn.apply(thisArg, [arg1, arg2, ...])`

Same as `call` but args go in an array. Use when you already have args in an array.

### Use case 1 — Math with arrays

`Math.max` and `Math.min` don't accept arrays — they take individual args:

```js
const numbers = [5, 2, 9, 1, 7];

// Before spread operator existed:
const max = Math.max.apply(null, numbers); // 9
const min = Math.min.apply(null, numbers); // 1

// Modern equivalent (prefer spread today):
const max2 = Math.max(...numbers); // 9
```

> `null` as `thisArg` → use it when you don't care about `this` (Math methods ignore it anyway).

### Use case 2 — Passing dynamic args

```js
function buildMessage(greeting, name, punctuation) {
  return `${greeting}, ${this.title} ${name}${punctuation}`;
}

const context = { title: "Dr." };
const args = ["Hello", "Deepanshi", "!"]; // args from some dynamic source

buildMessage.apply(context, args); // "Hello, Dr. Deepanshi!"
```

---

## 3️⃣ `bind` — Deep Dive

Syntax: `fn.bind(thisArg, arg1, arg2, ...)`

Returns a **new function** with `this` permanently locked. Even `call`/`apply` cannot override a bound function's `this`.

### Use case 1 — Fix callback `this` loss

```js
class Timer {
  constructor(label) {
    this.label = label;
    this.count = 0;
    // Lock 'this' so the callback always refers to this Timer
    this.tick = this.tick.bind(this);
  }

  tick() {
    this.count++;
    console.log(`${this.label}: ${this.count}`);
  }

  start() {
    setInterval(this.tick, 1000); // ✅ this.tick is already bound
  }
}

const t = new Timer("Download");
// t.start(); // Download: 1, Download: 2, Download: 3...
```

### Use case 2 — Partial Application (pre-filling arguments) ⭐

`bind` can pre-fill arguments, creating a specialized function from a general one:

```js
function multiply(a, b) {
  return a * b;
}

// Pre-fill 'a', get a new specialized function
const double   = multiply.bind(null, 2);  // a = 2
const triple   = multiply.bind(null, 3);  // a = 3
const quadruple = multiply.bind(null, 4); // a = 4

console.log(double(5));    // 10  — multiply(2, 5)
console.log(triple(5));    // 15  — multiply(3, 5)
console.log(quadruple(5)); // 20  — multiply(4, 5)
```

> Partial application = locking in some arguments in advance to create more specific functions. Used heavily in functional programming.

### Use case 3 — React class component event handlers

```js
class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this); // lock this
  }

  handleClick() {
    console.log("Button clicked: " + this.props.label);
    // Without bind, 'this' would be undefined when React calls it
  }

  render() {
    return <button onClick={this.handleClick}>{this.props.label}</button>;
  }
}
```

---

## ⭐ Implement `bind` From Scratch

This is a classic senior-level interview question. If you can implement it, you truly understand `bind`.

```js
Function.prototype.myBind = function(thisArg, ...presetArgs) {
  const fn = this; // 'this' here = the function myBind was called on

  return function(...laterArgs) {
    return fn.call(thisArg, ...presetArgs, ...laterArgs);
  };
};
```

**How it works step by step:**

```js
// 1. fn = the original function (myBind is called ON it, so this = fn)
// 2. thisArg = what 'this' should be locked to
// 3. presetArgs = any args pre-filled at bind time
// 4. Return a new wrapper function
// 5. When wrapper is called, combine presetArgs + laterArgs
// 6. Use .call() to invoke the original fn with the locked this

function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const user = { name: "Deepanshi" };

// Built-in bind:
const bound1 = greet.bind(user, "Hello");
console.log(bound1("!")); // "Hello, Deepanshi!"

// Custom myBind:
const bound2 = greet.myBind(user, "Hello");
console.log(bound2("!")); // "Hello, Deepanshi!" — same result ✅
```

---

## ⭐ Implement `call` From Scratch

```js
Function.prototype.myCall = function(thisArg, ...args) {
  // Can't change 'this' directly — trick: attach fn to the object temporarily
  const sym = Symbol(); // unique key, avoids overwriting existing properties
  thisArg[sym] = this;  // 'this' = the function being called

  const result = thisArg[sym](...args); // call as method — now this = thisArg
  delete thisArg[sym];  // clean up — don't pollute the object

  return result;
};

function greet() {
  return "Hello " + this.name;
}

const user = { name: "Deepanshi" };
console.log(greet.myCall(user)); // "Hello Deepanshi" ✅
```

**Why this works:** When you call `thisArg[sym](...args)`, JS uses **implicit binding** — the function is called as a method on `thisArg`, so `this = thisArg`.

---

## ⭐ Implement `apply` From Scratch

```js
Function.prototype.myApply = function(thisArg, argsArray) {
  const sym = Symbol();
  thisArg[sym] = this;
  const result = thisArg[sym](...(argsArray || [])); // spread the array
  delete thisArg[sym];
  return result;
};

function sum(a, b, c) {
  return a + b + c;
}

console.log(sum.myApply(null, [1, 2, 3])); // 6 ✅
```

---

## 🪤 Traps

### `bind` only works once — you can't rebind

```js
function show() { return this.name; }

const a = { name: "A" };
const b = { name: "B" };

const boundToA = show.bind(a);
const tryRebind = boundToA.bind(b); // attempt to rebind

console.log(tryRebind()); // "A" — first bind wins, can't be overridden
```

### Arrow functions ignore `call`/`apply`/`bind`

```js
const arrow = () => this?.name ?? "no name";

const user = { name: "Deepanshi" };

arrow.call(user);          // "no name" — call has no effect
arrow.apply(user);         // "no name"
arrow.bind(user)();        // "no name"
```

Arrow functions don't have their own `this` — there's nothing to override.

### `null` or `undefined` as `thisArg` in non-strict mode

```js
function show() { console.log(this); }

show.call(null);      // global (window/globalThis) — falls back
show.call(undefined); // global

// In strict mode:
"use strict";
show.call(null);      // null — strict mode keeps it
```

---

## 🍳 Analogy

> `call` is like calling someone and telling them exactly what to say right now — one shot.
> `apply` is the same, but you hand them a list of talking points instead.
> `bind` is like briefing an assistant in advance — you tell them what to say and who they represent, and they carry that brief into every future call they make.

---

## ✅ Takeaways

- `call` → invoke now, args comma-separated
- `apply` → invoke now, args as array (legacy — use spread today)
- `bind` → returns a new function with `this` permanently locked
- `bind` also supports **partial application** — pre-filling arguments
- You can implement all three yourself — the trick is temporarily attaching the function to the object for `call`/`apply`
- Arrow functions ignore all three — their `this` is lexical and can't change
- Once bound, a function **cannot be rebound**

---

## 🎯 Interview Questions

**Q1. What is the difference between `call`, `apply`, and `bind`?**

<details>
<summary>💡 See Answer</summary>

All three set `this` explicitly. The difference is in when/how they invoke the function:

```js
function greet(greeting, mark) {
  return `${greeting}, ${this.name}${mark}`;
}
const user = { name: "Deepanshi" };

// call — invoke immediately, args comma-separated
greet.call(user, "Hello", "!");    // "Hello, Deepanshi!"

// apply — invoke immediately, args as array
greet.apply(user, ["Hello", "!"]); // "Hello, Deepanshi!"

// bind — returns a new function, does NOT invoke
const fn = greet.bind(user, "Hello");
fn("!");                           // "Hello, Deepanshi!"
```

Use `call`/`apply` to invoke right now. Use `bind` when you need to pass the function somewhere (event handlers, callbacks) with `this` locked.

</details>

---

**Q2. Can you implement `bind` from scratch?**

<details>
<summary>💡 See Answer</summary>

```js
Function.prototype.myBind = function(thisArg, ...presetArgs) {
  const fn = this; // 'this' = the function being bound

  return function(...laterArgs) {
    return fn.call(thisArg, ...presetArgs, ...laterArgs);
  };
};
```

Key insight: `this` inside `myBind` refers to the function it was called on (e.g., `greet.myBind(...)` → `this = greet`). We capture it in `fn`, then return a new function that calls the original using `.call()` with the locked `thisArg`. Pre-filled args (`presetArgs`) are prepended to later args (`laterArgs`), enabling partial application.

</details>

---

**Q3. What is partial application and how does `bind` enable it?**

<details>
<summary>💡 See Answer</summary>

Partial application means pre-filling some arguments of a function to create a more specific, reusable version.

```js
function multiply(a, b) {
  return a * b;
}

// Pre-fill 'a' — get specialized functions
const double   = multiply.bind(null, 2);
const triple   = multiply.bind(null, 3);

double(5); // 10
triple(5); // 15
```

`bind(null, 2)` locks `this = null` (we don't use it) and pre-fills `a = 2`. When `double(5)` is called, `b = 5` is passed in, giving `multiply(2, 5) = 10`. This is a functional programming pattern — building specific tools from general functions.

</details>

---

**Q4. Why can't you rebind a function that's already been bound?**

<details>
<summary>💡 See Answer</summary>

Because `bind` creates a new function whose `this` is hardcoded via an internal `[[BoundTargetFunction]]` slot. When you try to `.bind()` again, you're binding the wrapper — but the wrapper always calls the original with the original `this`. The second `bind` is effectively a no-op for `this`.

```js
function show() { return this.name; }

const a = { name: "A" };
const b = { name: "B" };

const boundToA = show.bind(a);
const tryRebind = boundToA.bind(b);

tryRebind(); // "A" — first bind wins
```

This is why React's class components call `this.method.bind(this)` **once in the constructor** and store it — rebinding in render would create a new function on every render.

</details>
