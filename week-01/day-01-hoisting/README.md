# Day 1 — `var` vs `let` vs `const` & Hoisting

> **In one line:** JS moves all variable and function declarations to the top of their scope before running your code — this is called hoisting. `var` gets initialized to `undefined`, but `let`/`const` are left uninitialized and throw an error if accessed early.

---

## 🔑 Quick Reference

```js
var   // function-scoped, hoisted AND initialized to undefined
let   // block-scoped, hoisted but NOT initialized (TDZ)
const // block-scoped, hoisted but NOT initialized, must be assigned at declaration
```

---

## ⚙️ What is Hoisting?

Hoisting is **not magic**. It's a side effect of how JS compiles your code.

Before executing a single line, the JS engine does a **compilation pass** — scans all declarations and registers them in memory. Then it executes.

```
Phase 1 — Compilation:   JS scans and registers all declarations
Phase 2 — Execution:     JS runs your code line by line
```

> This is why you can "use" a variable before its declaration — by execution time, JS already knows it exists.

---

## 📦 `var` — Declared AND Initialized

When JS sees `var x = 5`, it splits it into two operations:

```js
var x;   // declaration → Phase 1 (compilation)
x = 5;  // assignment  → Phase 2 (execution)
```

During Phase 1, `var` is registered **and given `undefined` immediately**.

```js
console.log(x); // undefined — exists, but not assigned yet
var x = 5;
console.log(x); // 5
```

> JS is not reading your code backwards. It compiled first, ran second.

---

## 🚫 `let` and `const` — Declared but NOT Initialized

`let` and `const` **are hoisted** — registered in Phase 1 just like `var`.
The difference: they are **not given a value**. Touching them before their line = crash.

```js
console.log(y); // ❌ ReferenceError: Cannot access 'y' before initialization
let y = 10;
```

> Notice: the error says **"Cannot access before initialization"** — not "y is not defined".
> JS *knows* `y` exists. It just won't let you touch it yet.

---

## ⏳ The Temporal Dead Zone (TDZ)

The TDZ is the **zone of time** between when a `let`/`const` variable is hoisted and when it's initialized.

```
Start of scope
      ↓
┌─────────────────────────────┐
│      TEMPORAL DEAD ZONE     │  ← ReferenceError if accessed here
│  (variable exists but is    │
│    uninitialized)           │
└─────────────────────────────┘
      ↓
let x = 5;   ← TDZ ends here
      ↓
console.log(x); // ✅ 5
```

> **"Temporal"** = related to *time*, not location. It's a time gap, not a place in code.

---

## 🔁 Side by Side

```js
// ── var ──────────────────────────────
console.log(a); // undefined (no error)
var a = 1;
console.log(a); // 1

// ── let ──────────────────────────────
console.log(b); // ❌ ReferenceError (TDZ)
let b = 2;

// ── const ────────────────────────────
console.log(c); // ❌ ReferenceError (TDZ)
const c = 3;
```

| | Hoisted? | Initialized? | Accessible before declaration? |
|:--|:--:|:--:|:--|
| `var` | ✅ | ✅ `undefined` | ✅ returns `undefined` |
| `let` | ✅ | ❌ | ❌ TDZ → `ReferenceError` |
| `const` | ✅ | ❌ | ❌ TDZ → `ReferenceError` |
| `function` declaration | ✅ | ✅ full body | ✅ fully usable |

---

## 🧩 Function Hoisting

Function **declarations** are fully hoisted — name AND body.

```js
greet(); // ✅ "Hello!" — works before the declaration

function greet() {
  console.log("Hello!");
}
```

Function **expressions** follow the variable's rules:

```js
greet(); // ❌ TypeError: greet is not a function

var greet = function() {
  console.log("Hello!");
};
```

> `var greet` is hoisted as `undefined`. Calling `undefined()` throws a `TypeError`.

---

## 🪤 The Shadowing Trap

```js
var score = 10;

function getScore() {
  console.log(score); // ❓ What prints?
  var score = 20;
  console.log(score);
}

getScore();
```

<details>
<summary>💡 See Answer</summary>

```
undefined
20
```

`var` inside a function hoists to the **top of that function**, not the file.
The inner `var score` shadows the outer `score = 10` entirely. JS rewrites it as:

```js
function getScore() {
  var score = undefined; // hoisted — shadows outer score
  console.log(score);   // undefined
  score = 20;
  console.log(score);   // 20
}
```

</details>

---

## 🪤 The Loop Trap

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 3, 3, 3 ❌
```

`var` creates one **shared `i`**. By the time callbacks run, the loop is done and `i` is `3`.

**✅ Fix with `let`** — creates a new `i` per iteration:

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 0, 1, 2 ✅
```

---

## 🍳 Analogy

> Imagine a chef preparing a kitchen before service starts.
> They lay out all tools on the counter — **Phase 1 (hoisting)**.
>
> - With `var` → they put a label saying **"empty"** on each spot
> - With `let`/`const` → they put a **"DO NOT TOUCH"** sign on the spot
>
> If a waiter grabs from a "DO NOT TOUCH" spot before the chef fills it, they get stopped — that's the **TDZ**.

---

## ✅ Takeaways

- `var` is **function-scoped** and initialized to `undefined` when hoisted
- `let` / `const` are **block-scoped**, hoisted but uninitialized → TDZ
- Function **declarations** are fully hoisted; function **expressions** are not
- `var` in loops creates one shared variable — always use `let`
- The TDZ error message is your friend: *"Cannot access before initialization"*

---

## 🎯 Interview Questions

**Q1. What is hoisting in JavaScript?**

<details>
<summary>💡 See Answer</summary>

Hoisting is JavaScript's behaviour of moving variable and function declarations to the top of their scope during the compilation phase, before any code runs. `var` declarations are hoisted and initialized to `undefined`. `let` and `const` are hoisted but left uninitialized — accessing them early throws a `ReferenceError`. Function declarations are fully hoisted including their body, so they can be called before they appear in the code.

</details>

---

**Q2. What is the difference between `var`, `let`, and `const`?**

<details>
<summary>💡 See Answer</summary>

| | `var` | `let` | `const` |
|:--|:--|:--|:--|
| Scope | Function | Block | Block |
| Hoisted | ✅ (`undefined`) | ✅ (TDZ) | ✅ (TDZ) |
| Re-declarable | ✅ | ❌ | ❌ |
| Re-assignable | ✅ | ✅ | ❌ |

`var` leaks out of `if`/`for` blocks. `let` and `const` are confined to the block they're declared in. `const` must be assigned at declaration and cannot be reassigned — though the object it points to can still be mutated.

</details>

---

**Q3. Why does the following print `3` three times instead of `0, 1, 2`?**

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
```

<details>
<summary>💡 See Answer</summary>

Because `var` is function-scoped, there is only one shared `i` across all iterations. `setTimeout` callbacks are async — they run after the loop has fully completed. By that time, `i` is already `3`. All three callbacks read the same `i`, so all print `3`.

**Fix:** Replace `var` with `let`. It creates a new `i` for each iteration, so each callback closes over its own copy.

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 0, 1, 2 ✅
}
```

</details>
