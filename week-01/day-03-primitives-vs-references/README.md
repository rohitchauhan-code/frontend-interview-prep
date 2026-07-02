# Day 3 — Primitive vs Reference Types

> **In one line:** Primitives (string, number, boolean, etc.) are copied by value — each variable gets its own independent copy. Reference types (objects, arrays) are copied by address — multiple variables can point to the same object in memory, so changing one affects all of them.

---

## 🔑 Two Categories of Values

```
Primitives              Reference Types
──────────────          ───────────────
string                  object  {}
number                  array   []
boolean                 function
null
undefined
symbol
bigint
```

---

## 📦 Primitives — Stored by Value

Assigning a primitive copies the **actual value**. Variables are fully independent.

```js
let a = 10;
let b = a;  // b gets a COPY of 10

b = 99;

console.log(a); // 10 — unchanged ✅
console.log(b); // 99
```

---

## 🔗 Reference Types — Stored by Reference

Assigning an object/array copies the **memory address**, not the value.

```js
let user1 = { name: "Deepanshi" };
let user2 = user1; // both point to the SAME object in memory

user2.name = "Deep";

console.log(user1.name); // "Deep" ← changed! ❌
console.log(user2.name); // "Deep"
```

```
Memory:
user1 ──→ [ { name: "Deep" } ]
user2 ──↗  (same address)
```

---

## ❓ Why `{} === {}` is `false`

Each `{}` creates a **brand new object** at a **new memory address**.
You're comparing two addresses — they're never equal, even with identical contents.

```js
let a = {};
let b = {};
let c = a;

console.log(a === b); // false ❌ — different addresses
console.log(a === c); // true  ✅ — same address
```

Primitives compare by **value**. References compare by **address**.

```js
"hello" === "hello" // true ✅
5 === 5             // true ✅
{} === {}           // false ❌
[] === []           // false ❌
```

---

## 🪤 The Function Mutation Trap

Objects passed into functions are passed by reference — mutations affect the original:

```js
function birthday(person) {
  person.age += 1; // ❌ mutates the original!
}

let user = { name: "Deepanshi", age: 28 };
birthday(user);

console.log(user.age); // 29 — original changed
```

**✅ Safe version — return a new object:**

```js
function birthday(person) {
  return { ...person, age: person.age + 1 };
}

let user = { name: "Deepanshi", age: 28 };
let older = birthday(user);

console.log(user.age);  // 28 — original safe ✅
console.log(older.age); // 29
```

> This is exactly why React insists you never mutate state directly — it compares **references** to detect changes. A mutated object has the same reference, so React sees no change.

---

## 🗂️ The 3 Copy Methods

| Method | Type | Nested objects safe? | Example |
|:--|:--|:--:|:--|
| `= assignment` | Reference copy | ❌ same object | `let b = a` |
| `{ ...spread }` | Shallow copy | ❌ nested still shared | `let b = { ...a }` |
| `structuredClone()` | Deep copy | ✅ fully independent | `let b = structuredClone(a)` |

---

## ⚠️ Shallow Copy Trap — Spread Only Goes One Level Deep

```js
let obj1 = {
  score: 10,
  address: { city: "Delhi" }  // nested object
};

let obj2 = { ...obj1 };

obj2.score = 99;              // ✅ independent
obj2.address.city = "Mumbai"; // ❌ mutates obj1 too!

console.log(obj1.score);        // 10 ✅
console.log(obj1.address.city); // "Mumbai" ❌
```

```
obj1 ──→ { score: 10,  address ──→ { city: "Mumbai" } }
obj2 ──→ { score: 99,  address ──↗ (same reference)  }
```

**✅ Fix — use `structuredClone()` for deep copy:**

```js
let obj2 = structuredClone(obj1);
obj2.address.city = "Mumbai";

console.log(obj1.address.city); // "Delhi" ✅ — fully independent
```

---

## ✅ Takeaways

- **Primitives** are copied by value — variables are fully independent
- **Reference types** are copied by address — variables share the same object
- `{} === {}` is `false` — two different addresses, even if contents match
- Functions receive objects **by reference** — mutating inside affects the original
- Spread `{ ...obj }` is a **shallow copy** — nested objects are still shared
- `structuredClone()` is the modern way to do a **true deep copy**

---

## 🎯 Interview Questions

**Q1. Why does `{} === {}` return `false` in JavaScript?**

<details>
<summary>💡 See Answer</summary>

Because objects are compared by **reference**, not by value. Each `{}` creates a brand new object at a different memory address. Even though both objects look identical and have the same contents, they live at different addresses — so the comparison returns `false`. Primitives like strings and numbers compare by value, which is why `"hello" === "hello"` is `true`.

</details>

---

**Q2. What is the difference between shallow copy and deep copy?**

<details>
<summary>💡 See Answer</summary>

A **shallow copy** creates a new object and copies the top-level properties — but nested objects are still shared by reference. A **deep copy** creates a completely independent clone, including all nested objects.

```js
// Shallow — nested still shared
let copy = { ...original };
copy.nested.value = 99; // also mutates original.nested.value ❌

// Deep — fully independent
let clone = structuredClone(original);
clone.nested.value = 99; // original untouched ✅
```

Common shallow copy methods: spread `{ ...obj }`, `Object.assign()`.
Modern deep copy: `structuredClone()`.

</details>

---

**Q3. What happens when you pass an object into a function and modify it inside?**

<details>
<summary>💡 See Answer</summary>

The original object is mutated. Objects are passed by reference — the function receives the same memory address, not a copy. Any changes made inside the function are visible outside.

```js
function update(obj) {
  obj.name = "changed"; // mutates original
}

let user = { name: "Deepanshi" };
update(user);
console.log(user.name); // "changed"
```

To avoid this, return a new object instead of mutating:

```js
function update(obj) {
  return { ...obj, name: "changed" }; // original safe ✅
}
```

This pattern is fundamental in React — never mutate state directly, always return a new object.

</details>
