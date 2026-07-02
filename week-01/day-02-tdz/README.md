# Day 2 — Temporal Dead Zone (TDZ) in Depth

> **In one line:** The TDZ is the period between when a `let`/`const` variable is hoisted (registered by the engine) and when it's actually initialized on its declaration line — accessing it in this window throws a `ReferenceError`. It's a time gap, not a location in code.

---

## 🧠 Beyond the Basics

You know the simple case. Here are the 3 TDZ behaviours that trip people up in interviews.

---

## Case 1 — TDZ is Scope-Based, Not File-Based

Each block `{ }` creates its own TDZ for `let`/`const`.

```js
let a = "outside";

{
  console.log(a); // ❌ ReferenceError — NOT "outside"
  let a = "inside";
}
```

The inner `let a` is hoisted to the top of its block `{ }`, creating a TDZ that **shadows the outer `a`**. The outer `a` is completely invisible inside this block until the inner `a` is initialized.

```
Outer scope:  a = "outside"  ✅ accessible
              ↓
Block starts  {
                ← TDZ for inner 'a' begins (shadows outer 'a')
                console.log(a) ← ❌ ReferenceError
                let a = "inside" ← TDZ ends
              }
```

---

## Case 2 — TDZ in Function Default Parameters

Parameters are evaluated **left to right**. If a default value references a later parameter, it's in TDZ.

```js
function test(a = b, b = 2) {
  return [a, b];
}
test(); // ❌ ReferenceError — b is in TDZ when a tries to use it
```

Flip the order and it works:

```js
function test(a = 2, b = a) {
  return [a, b]; // ✅ [2, 2]
}
```

---

## Case 3 — `typeof` Is NOT Safe in TDZ

`typeof` on an **undeclared** variable is safe — returns `"undefined"`.
`typeof` on a **TDZ** variable still throws:

```js
console.log(typeof undeclaredVar); // "undefined" ✅ — safe

console.log(typeof x); // ❌ ReferenceError — TDZ is not safe even for typeof
let x = 5;
```

> Many developers assume `typeof` is always safe. It's not — not with `let`/`const`.

---

## 🔍 The Proof That `let` IS Hoisted

The error message itself is the proof:

```js
let x = 10;
{
  console.log(x); // "Cannot access 'x' before initialization"
  let x = 20;
}
```

If `let` were **not** hoisted, JS would say `"x is not defined"` (like a truly undeclared variable).
Instead it says `"Cannot access before initialization"` — proving JS **knows** `x` exists in this scope, it's just uninitialized. That's hoisting.

---

## ✅ Takeaways

- TDZ applies per **block scope** — a new `{ }` creates a new TDZ
- Inner `let`/`const` declarations **shadow** outer ones even during TDZ
- Default function parameters evaluate left to right — forward references cause TDZ
- `typeof` is **not** TDZ-safe — it throws for `let`/`const` in TDZ
- The error `"Cannot access before initialization"` is proof of hoisting

---

## 🎯 Interview Questions

**Q1. Is `let` hoisted? Prove it.**

<details>
<summary>💡 See Answer</summary>

Yes — `let` is hoisted, but not initialized. The proof is in the error message itself:

```js
{
  console.log(x); // "Cannot access 'x' before initialization"
  let x = 5;
}
```

If `let` were not hoisted, the error would say `"x is not defined"` — the same error you get for a completely undeclared variable. Instead JS says "cannot access before initialization", meaning it already registered `x` in memory during compilation. It knows `x` exists — it's just refusing access until the declaration line runs.

</details>

---

**Q2. What is the Temporal Dead Zone?**

<details>
<summary>💡 See Answer</summary>

The TDZ is the period of time between when a `let` or `const` variable is hoisted (registered in memory at the start of its scope) and when it is actually initialized on its declaration line. Accessing the variable during this window throws a `ReferenceError`. It's called "temporal" because it's about time — not where in the file the code is, but when in execution the access happens.

</details>

---

**Q3. What does this print and why?**

```js
let a = "outside";
{
  console.log(a);
  let a = "inside";
}
```

<details>
<summary>💡 See Answer</summary>

This throws a `ReferenceError` — not `"outside"` as many people expect.

The inner `let a` is hoisted to the top of its block, creating a TDZ that shadows the outer `a`. Inside the block, the engine sees the inner `a` but it's uninitialized — so accessing it before its declaration line throws. The outer `a` is completely invisible inside this block because the inner declaration already claimed the name.

</details>
