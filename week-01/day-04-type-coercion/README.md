# Day 4 — Type Coercion (`==` vs `===`)

> **In one line:** `===` checks value AND type with no conversion — always predictable. `==` checks value only and silently converts types to match before comparing, which produces surprising results and should almost never be used.

---

## 🔑 Quick Reference

```js
===  // strict equality — value AND type must match, no conversion
==   // loose equality  — converts types before comparing (avoid this)
```

---

## ✅ `===` Strict Equality — No Surprises

Compares value AND type. Both must match exactly.

```js
5 === 5            // true  ✅
5 === "5"          // false ✅ — different types
null === null      // true  ✅
null === undefined // false ✅
```

Use this **99% of the time**.

---

## ⚠️ `==` Loose Equality — Type Coercion Kicks In

JS tries to convert one or both values to the same type before comparing.

```js
5 == "5"          // true  😬 — "5" converted to number
0 == false        // true  😬 — false converted to 0
0 == ""           // true  😬 — "" converted to 0
null == undefined // true  😬 — special rule
null == 0         // false 😬 — another special rule
[] == false       // true  😬 — [] → "" → 0, false → 0
```

> No one memorises these rules. The rule is: **don't use `==`**.

---

## ⚙️ How Type Coercion Actually Works

When JS sees `==` between different types, it follows this priority order:

```
1. Same type?               → compare directly (same as ===)
2. null == undefined?       → always true (special hardcoded rule)
3. number == string?        → convert string to number, then compare
4. boolean == anything?     → convert boolean to number first
5. object == primitive?     → convert object to primitive first
```

```js
// boolean → number first
false == 0    // false → 0,  0 == 0   → true
true  == 1    // true  → 1,  1 == 1   → true
true  == 2    // true  → 1,  1 == 2   → false ❗

// string → number
"5"   == 5    // "5" → 5,   5 == 5   → true
""    == 0    // ""  → 0,   0 == 0   → true
"0"   == false // "0"→0, false→0, 0==0 → true ❗
```

---

## 🤯 The Famously Weird One

```js
[] == ![] // true 🤯
```

Step by step:
```
![]        → false           ([] is truthy, so ![] = false)
[] == false
[] → ""    → 0               (object → primitive → number)
false → 0
0 == 0     → true
```

You will never need this in real code — but it shows exactly why `==` is unpredictable.

---

## 🔍 `typeof` — Know Your Types

```js
typeof 42            // "number"
typeof "hello"       // "string"
typeof true          // "boolean"
typeof undefined     // "undefined"
typeof null          // "object"   ← famous 30-year-old JS bug
typeof {}            // "object"
typeof []            // "object"   ← arrays are objects
typeof function(){}  // "function"
```

> `typeof null === "object"` is a known bug — never fixed because fixing it would break the web.

**Safe null check:**
```js
value === null       // ✅ only reliable way
```

**Safe array check:**
```js
Array.isArray([])    // ✅ true
typeof []            // ❌ "object" — useless for arrays
```

---

## ✅ Takeaways

- Always use `===` — it never converts types and is fully predictable
- `==` triggers type coercion — the rules are complex and unintuitive
- `null == undefined` is `true` with `==`, but `false` with `===`
- `typeof null` is `"object"` — a historical bug, use `=== null` instead
- `typeof []` is `"object"` — use `Array.isArray()` to check for arrays

---

## 🎯 Interview Questions

**Q1. What is the difference between `==` and `===` in JavaScript?**

<details>
<summary>💡 See Answer</summary>

`===` is strict equality — it compares both value and type with no conversion. `5 === "5"` is `false` because the types differ.

`==` is loose equality — it performs type coercion before comparing, converting one or both values to the same type. `5 == "5"` is `true` because `"5"` gets converted to `5` first.

Always prefer `===`. The coercion rules for `==` are complex, counterintuitive, and a common source of bugs.

</details>

---

**Q2. What does `typeof null` return and why?**

<details>
<summary>💡 See Answer</summary>

It returns `"object"`, which is a well-known bug in JavaScript dating back to its original 1995 implementation. In the early JS engine, values were stored with a type tag — `null` was given the same tag as objects (0), and `typeof` returned `"object"` for it. The fix was proposed but rejected because it would break too much existing code on the web.

The correct way to check for `null` is:
```js
value === null // ✅ only reliable check
```

</details>

---

**Q3. What is type coercion and when does it happen?**

<details>
<summary>💡 See Answer</summary>

Type coercion is JavaScript's automatic conversion of a value from one type to another. It happens in two situations:

**Implicit coercion** — triggered automatically by operators like `==`, `+`, `!`:
```js
"5" + 1   // "51" — number converted to string (concatenation)
"5" - 1   // 4    — string converted to number (subtraction)
!!""      // false — empty string is falsy
```

**Explicit coercion** — manually converting using functions:
```js
Number("5")   // 5
String(42)    // "42"
Boolean(0)    // false
```

The key rule: `===` never coerces. `==` always tries to coerce. Use `===` to avoid surprises.

</details>
