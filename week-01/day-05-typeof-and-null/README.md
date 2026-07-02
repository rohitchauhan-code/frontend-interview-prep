# Day 5 — `typeof` & `null` Quirks

> **In one line:** `typeof` is JS's built-in type checker but has well-known quirks — most famously returning `"object"` for `null` and arrays — so you need specific alternatives for reliable type checking in real code.

---

## 🔑 Quick Reference

```js
typeof 42             // "number"
typeof NaN            // "number"    ← NaN is technically type number 😬
typeof "hello"        // "string"
typeof true           // "boolean"
typeof undefined      // "undefined"
typeof null           // "object"    ← 30-year-old bug
typeof {}             // "object"
typeof []             // "object"    ← arrays are objects
typeof function(){}   // "function"  ← only exception to the object rule
typeof Symbol()       // "symbol"
typeof 42n            // "bigint"
```

---

## 🐛 The `null` Bug

```js
typeof null === "object" // true 😬
```

**Why?** In the original 1995 JS engine, every value stored a type tag in its first few bits. Objects used tag `000`. `null` was stored as a null pointer (`0x00`) — which also starts with `000`. The `typeof` check read the tag bits and incorrectly returned `"object"` for null.

The bug was discovered early but never fixed — too much existing web code already relied on the broken behaviour.

---

## 🔍 Three `null` Behaviours to Know

```js
// 1. typeof lies about null
typeof null === "object"  // true ❌ — misleading

// 2. === tells the truth
null === null             // true  ✅
null === undefined        // false ✅

// 3. == loosely equals ONLY undefined — nothing else
null == undefined         // true  — the ONE special rule
null == 0                 // false
null == ""                // false
null == false             // false
```

---

## 🤯 `NaN` — The Weirdest Value in JS

```js
typeof NaN      // "number"   ← it's a number type, ironically
NaN === NaN     // false 🤯   ← NaN is never equal to itself
NaN == NaN      // false
```

> `NaN` is the only value in JS not equal to itself. This comes from the IEEE 754 floating point standard — not a JS-specific bug.

**Reliable NaN check:**

```js
Number.isNaN(NaN)      // true  ✅ — only true for actual NaN
Number.isNaN("hello")  // false ✅ — does NOT coerce

// ❌ Avoid the global isNaN() — it coerces first
isNaN("hello")         // true  ❌ — converts "hello" to NaN first
isNaN(undefined)       // true  ❌ — converts undefined to NaN
```

---

## ✅ Reliable Type Checking Cheatsheet

| What you want to check | ❌ Don't use | ✅ Use instead |
|:--|:--|:--|
| null | `typeof x === "object"` | `x === null` |
| undefined | — | `x === undefined` |
| null OR undefined | — | `x == null` (valid `==` use) |
| array | `typeof x === "array"` | `Array.isArray(x)` |
| NaN | `x === NaN` | `Number.isNaN(x)` |
| integer | — | `Number.isInteger(x)` |
| plain object | `typeof x === "object"` | `x !== null && typeof x === "object" && !Array.isArray(x)` |

---

## 🛠️ `getType()` — A Reliable Type Checker

```js
function getType(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  if (Number.isNaN(value)) return "nan";
  return typeof value;
}

getType(null)         // "null"       ✅
getType([1, 2, 3])    // "array"      ✅
getType({})           // "object"     ✅
getType(NaN)          // "nan"        ✅
getType(42)           // "number"     ✅
getType("hi")         // "string"     ✅
getType(undefined)    // "undefined"  ✅
getType(function(){}) // "function"   ✅
```

**Order matters** — check `null` before `typeof` (because `typeof null` would return `"object"`), and check `Array.isArray` before `typeof` (because arrays are also objects).

---

## ✅ Takeaways

- `typeof null` returns `"object"` — a 30-year-old JS bug, never fixed
- `typeof []` returns `"object"` — use `Array.isArray()` for arrays
- `NaN === NaN` is `false` — use `Number.isNaN()` to check for NaN
- Avoid the global `isNaN()` — it coerces values first and gives false positives
- `null == null` and `null == undefined` are true — `null` loosely equals nothing else
- `x == null` is the one valid use of `==` — it catches both `null` and `undefined`

---

## 🎯 Interview Questions

**Q1. What does `typeof null` return and why is it a bug?**

<details>
<summary>💡 See Answer</summary>

`typeof null` returns `"object"`. This is a bug from JavaScript's original 1995 implementation. Every value had a type tag stored in its first bits — objects used `000`. `null` was stored as a null pointer (`0x00`), which also started with `000`, so `typeof` incorrectly returned `"object"`. The fix was proposed but rejected because correcting it would break too much existing code on the web.

The only reliable way to check for null is:
```js
value === null // ✅
```

</details>

---

**Q2. Why is `NaN === NaN` false?**

<details>
<summary>💡 See Answer</summary>

`NaN` (Not a Number) represents an invalid or undefined numerical result — for example `0/0` or `parseInt("hello")`. The IEEE 754 floating point standard (which JS follows) explicitly defines that NaN is never equal to itself, because two "invalid" computations might come from completely different sources and comparing them as equal would be misleading.

```js
NaN === NaN        // false — by design
Number.isNaN(NaN)  // true  ✅ — only reliable check
```

Avoid the global `isNaN()` — it coerces the value first, giving false positives for strings like `"hello"`.

</details>

---

**Q3. What is the difference between `null` and `undefined`?**

<details>
<summary>💡 See Answer</summary>

Both represent "no value" but in different contexts:

- **`undefined`** — JS assigns this automatically. A declared variable that hasn't been assigned, a missing function argument, or a missing object property are all `undefined`. It means "not yet set".
- **`null`** — a developer assigns this intentionally. It means "explicitly empty" or "no value on purpose".

```js
let x;           // undefined — not assigned yet
let y = null;    // null — intentionally empty

typeof undefined // "undefined"
typeof null      // "object" ← bug

null == undefined  // true  — loosely equal
null === undefined // false — strictly not equal
```

In practice: use `null` when you want to explicitly clear a value. Use `undefined` to check if something was never set.

</details>
