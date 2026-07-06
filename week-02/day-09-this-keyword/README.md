# Day 9 — `this` Keyword: The 4 Binding Rules

> **In one line:** `this` in JavaScript refers to the execution context of a function — what it points to depends entirely on HOW the function is called, following 4 rules in strict priority order.

---

## 🔑 Quick Reference — Decision Chart

```
How is the function called?
         │
         ├── with new?              → this = new object         (Rule 1 — highest)
         │
         ├── with call/apply/bind?  → this = first argument     (Rule 2)
         │
         ├── as obj.method()?       → this = obj                (Rule 3)
         │
         ├── standalone fn()?       → this = global/undefined   (Rule 4 — lowest)
         │
         └── arrow function?        → this = lexical scope      (no rule applies)
```

---

## Rule 1 — Default Binding (Standalone Call)

When a function is called on its own with no object — `this` = global (`window` in browser). In strict mode, `this` = `undefined`.

```js
function show() {
  console.log(this);
}

show(); // window (browser) / global (Node)
```

```js
"use strict";
function show() {
  console.log(this);
}

show(); // undefined — strict mode removes the global fallback
```

---

## Rule 2 — Implicit Binding (Method on an Object)

When called as `object.method()` — `this` = that object.

```js
const user = {
  name: "Deepanshi",
  greet() {
    console.log(this.name); // this = user ✅
  }
};

user.greet(); // "Deepanshi"
```

### ⚠️ Implicit Binding Loss — The Most Common Bug

The moment you detach a function from its object, `this` is lost:

```js
const fn = user.greet;
fn();                      // undefined ❌ — this = global

// Same trap in callbacks
setTimeout(user.greet, 1000); // undefined ❌ — setTimeout detaches it
```

---

## Rule 3 — Explicit Binding (`call`, `apply`, `bind`)

You manually tell the function what `this` should be.

### `call` — invoke immediately, args one by one

```js
function greet(greeting, punctuation) {
  console.log(greeting + " " + this.name + punctuation);
}

const user = { name: "Deepanshi" };
greet.call(user, "Hello", "!"); // "Hello Deepanshi!"
```

### `apply` — invoke immediately, args as array

```js
greet.apply(user, ["Hello", "!"]); // "Hello Deepanshi!"
```

### `bind` — returns a NEW function with `this` permanently locked

```js
const greetUser = greet.bind(user);
greetUser("Hello", "!"); // "Hello Deepanshi!" — always user

// Fix the callback trap:
setTimeout(user.greet.bind(user), 1000); // ✅ this = user
```

> **Memory trick:** **C**all = **C**omma args · **A**pply = **A**rray · **B**ind = **B**akes in `this`

---

## Rule 4 — `new` Binding (Constructor Call)

When called with `new`, JS creates a brand new object and `this` points to it.

```js
function Person(name, age) {
  this.name = name; // this = brand new {}
  this.age = age;
}

const deepanshi = new Person("Deepanshi", 28);
console.log(deepanshi.name); // "Deepanshi"
```

**What `new` does internally:**

```js
// new Person("Deepanshi", 28) is equivalent to:
const obj = {};                    // 1. create empty object
obj.__proto__ = Person.prototype;  // 2. link prototype
Person.call(obj, "Deepanshi", 28); // 3. run with this = obj
return obj;                        // 4. return the new object
```

---

## 🏆 Priority — Which Rule Wins?

```js
const user = { name: "User", show() { console.log(this.name); } };
const admin = { name: "Admin" };

user.show();             // "User"  — implicit (Rule 3)
user.show.call(admin);   // "Admin" — explicit beats implicit (Rule 2 > Rule 3)

function Maker(name) { this.name = name; }
const bound = Maker.bind({ name: "Bound" });
const m = new bound("Deepanshi");
console.log(m.name);    // "Deepanshi" — new beats bind (Rule 1 > Rule 2)
```

---

## 🏹 Arrow Functions — No `this` of Their Own

Arrow functions skip all 4 rules. They inherit `this` **lexically** from where they were written.

```js
const user = {
  name: "Deepanshi",
  greet: function() {
    const inner = () => console.log(this.name); // inherits from greet
    inner();
  }
};

user.greet(); // "Deepanshi" ✅
```

`call`, `apply`, `bind` have NO effect on arrow functions:

```js
const arrow = () => console.log(this);
arrow.call({ name: "Deepanshi" }); // still global — cannot override
```

---

## 🪤 The Timer Bug — Classic Interview Trap

```js
function Timer() {
  this.count = 0;

  setInterval(function() {
    this.count++;             // ❌ this = global, not Timer
    console.log(this.count);  // NaN — window.count++ = undefined++
  }, 1000);
}

const t = new Timer();
// NaN, NaN, NaN...
// t.count stays 0 forever
```

**Fix — arrow function inherits `this` from constructor:**

```js
function Timer() {
  this.count = 0;

  setInterval(() => {        // ✅ arrow inherits this from Timer
    this.count++;
    console.log(this.count); // 1, 2, 3...
  }, 1000);
}
```

---

## 🏛️ `this` in Classes

```js
class User {
  constructor(name) {
    this.name = name;
    this.greet = this.greet.bind(this); // lock this for callbacks
  }

  greet() {
    console.log("Hello " + this.name);
  }
}

const u = new User("Deepanshi");
u.greet();                    // "Hello Deepanshi" ✅

const fn = u.greet;
fn();                         // "Hello Deepanshi" ✅ — bound in constructor
```

---

## ✅ Takeaways

- `this` has 4 binding rules — **new > explicit > implicit > default**
- Default binding = standalone call → global or undefined (strict)
- Implicit binding = `obj.method()` → `this = obj` — but detaching loses it
- Explicit binding = `call/apply/bind` → you choose `this`
- `new` binding = constructor call → `this = brand new object`
- Arrow functions ignore all 4 rules — `this` is always lexical
- `bind` permanently locks `this` — useful for callbacks and class methods

---

## 🎯 Interview Questions

**Q1. What are the 4 rules of `this` binding in JavaScript?**

<details>
<summary>💡 See Answer</summary>

In priority order (highest to lowest):

1. **`new` binding** — `new fn()` creates a new object; `this = that object`
2. **Explicit binding** — `fn.call(obj)`, `fn.apply(obj)`, `fn.bind(obj)`; `this = obj`
3. **Implicit binding** — `obj.fn()`; `this = obj`
4. **Default binding** — `fn()`; `this = global` (or `undefined` in strict mode)

Arrow functions don't follow any of these rules — they inherit `this` lexically from their surrounding scope.

</details>

---

**Q2. What is implicit binding loss and how do you fix it?**

<details>
<summary>💡 See Answer</summary>

Implicit binding loss happens when a method is detached from its object — the `this` binding is lost and falls back to default (global/undefined).

```js
const user = {
  name: "Deepanshi",
  greet() { console.log(this.name); }
};

const fn = user.greet;
fn(); // undefined ❌ — detached, this = global

// Same in callbacks:
setTimeout(user.greet, 1000); // undefined ❌
```

**Three fixes:**

```js
// 1. bind
const fn = user.greet.bind(user);
fn(); // "Deepanshi" ✅

// 2. Arrow wrapper
setTimeout(() => user.greet(), 1000); // ✅

// 3. bind in callback
setTimeout(user.greet.bind(user), 1000); // ✅
```

</details>

---

**Q3. What is the difference between `call`, `apply`, and `bind`?**

<details>
<summary>💡 See Answer</summary>

All three set `this` explicitly, but differ in how they invoke the function:

```js
function greet(greeting, mark) {
  return greeting + " " + this.name + mark;
}
const user = { name: "Deepanshi" };

// call — invoke immediately, args comma-separated
greet.call(user, "Hello", "!");   // "Hello Deepanshi!"

// apply — invoke immediately, args as array
greet.apply(user, ["Hello", "!"]); // "Hello Deepanshi!"

// bind — returns a new function, does NOT invoke immediately
const greetUser = greet.bind(user);
greetUser("Hello", "!");           // "Hello Deepanshi!"
```

Use `call`/`apply` when you want to invoke now. Use `bind` when you need a function to pass around (callbacks, event handlers) with `this` locked in.

</details>

---

**Q4. Why does `this` inside `setInterval` not refer to the class instance?**

<details>
<summary>💡 See Answer</summary>

Because `setInterval` calls its callback as a standalone function (default binding), not as a method on any object. So `this` = global/undefined, not the class instance.

```js
class Timer {
  constructor() {
    this.count = 0;
    setInterval(function() {
      this.count++; // ❌ this = window, not Timer
    }, 1000);
  }
}
```

**Fix — use an arrow function** which inherits `this` lexically from the constructor:

```js
class Timer {
  constructor() {
    this.count = 0;
    setInterval(() => {
      this.count++; // ✅ this = Timer instance
    }, 1000);
  }
}
```

</details>
