# Day 8 — Functions: Declarations vs Expressions vs Arrow Functions

> **In one line:** JavaScript has three ways to define functions — each with different hoisting behaviour, `this` binding, and use cases. Knowing when to use which one is a daily decision in React and Node.

---

## 🔑 What is "Lexical"?

**Lexical** = determined by **where you wrote it** in the code, not by how or when it's called.

| | Resolved by |
|:--|:--|
| **Dynamic** | How/where it's called — at runtime |
| **Lexical** | Where it's written — at write time |

> Whenever you see "lexical" in JS — it means: *"go look at where this was written in the source code."*

This matters most for `this` — regular functions have **dynamic** `this`, arrow functions have **lexical** `this`.

---

## 1️⃣ Function Declaration

```js
function greet(name) {
  return "Hello " + name;
}
```

- ✅ **Fully hoisted** — can be called before it's defined
- ✅ Has its own `this`
- ✅ Named — shows up in stack traces

```js
console.log(greet("Deepanshi")); // ✅ works before declaration

function greet(name) {
  return "Hello " + name;
}
```

---

## 2️⃣ Function Expression

A function assigned to a variable:

```js
const greet = function(name) {
  return "Hello " + name;
};
```

- ❌ **Not hoisted** — follows variable rules (`const` → TDZ, `var` → undefined)
- ✅ Has its own `this`
- Can be **anonymous** or **named**

```js
// Anonymous — harder to debug
const greet = function(name) { ... };

// Named — real name appears in stack traces
const greet = function greetUser(name) { ... };
```

---

## 3️⃣ Arrow Functions

```js
const greet = (name) => "Hello " + name;
```

**Syntax variations:**

```js
// One param — parentheses optional
const double = n => n * 2;

// Multiple params — parentheses required
const add = (a, b) => a + b;

// Multi-line — need curly braces + explicit return
const greet = (name) => {
  const msg = "Hello " + name;
  return msg;
};

// Returning an object — wrap in parentheses
const getUser = () => ({ name: "Deepanshi", age: 28 });
```

---

## ⚠️ The Big Difference — `this` Binding

### Regular functions — `this` is DYNAMIC

`this` depends on **how the function is called** (runtime decision):

```js
const user = {
  name: "Deepanshi",
  greet: function() {
    console.log("Hello " + this.name); // this = user ✅
  }
};

user.greet(); // "Hello Deepanshi"

// But if you detach it:
const fn = user.greet;
fn(); // "Hello undefined" ❌ — this = global now
```

### Arrow functions — `this` is LEXICAL

`this` is inherited from **where the function is written** (write-time decision):

```js
const user = {
  name: "Deepanshi",
  greet: () => {
    console.log("Hello " + this.name); // this = global ❌
  }
};

user.greet(); // "Hello undefined" — arrow grabbed this from global scope
```

Arrow function looks outward to where it was **written** — which was the global scope, not inside `user`.

---

## ✅ Where Arrow Functions Shine — Callbacks

Before arrow functions, `this` was lost inside callbacks:

```js
const timer = {
  name: "Deepanshi",

  start: function() {
    // 'this' here = timer ✅

    // ❌ Regular function — this is lost
    setTimeout(function() {
      console.log(this.name); // undefined — this = window
    }, 1000);

    // ✅ Arrow function — inherits this from start()
    setTimeout(() => {
      console.log(this.name); // "Deepanshi" — this = timer
    }, 1000);
  }
};

timer.start();
```

The arrow function was **written inside `start()`**, where `this = timer`. So it always uses `timer` as `this`.

---

## ⚛️ React — All Three Used Daily

```jsx
// Function declaration — component
function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}

// Arrow function expression — most common React component style
const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

// Arrow function — event handler (lexical this, perfect for callbacks)
const handleClick = () => {
  console.log("clicked");
};

// Regular function — when you need 'arguments'
function sum() {
  return Array.from(arguments).reduce((a, b) => a + b, 0);
}
```

---

## 📋 Key Differences — Side by Side

| | Declaration | Expression | Arrow |
|:--|:--|:--|:--|
| Hoisted | ✅ fully | ❌ | ❌ |
| Own `this` | ✅ dynamic | ✅ dynamic | ❌ lexical |
| `arguments` object | ✅ | ✅ | ❌ |
| Can use `new` | ✅ | ✅ | ❌ |
| Best for | Utility functions | Callbacks, methods | Callbacks, React components |

---

## 🪤 Two More Traps

### `arguments` object — arrow functions don't have it

```js
function sum() {
  console.log(arguments); // ✅ [1, 2, 3]
}
sum(1, 2, 3);

const sumArrow = () => {
  console.log(arguments); // ❌ ReferenceError
};

// ✅ Modern fix — rest params work in both
const sum = (...args) => args.reduce((a, b) => a + b, 0);
```

### Arrow functions can't be constructors

```js
function Person(name) {
  this.name = name;
}
const p = new Person("Deepanshi"); // ✅

const PersonArrow = (name) => { this.name = name; };
const p = new PersonArrow("Deepanshi"); // ❌ TypeError: not a constructor
```

---

## 🍳 Analogy — Lexical `this`

> A regular function is like a **contractor** — their loyalty ("this") depends on who hired them for this job. Call them from a different context and they serve that context.

> An arrow function is like a **permanent employee** — they always belong to the company ("this") where they first signed their contract, no matter who sends them on assignment.

---

## ✅ Takeaways

- **Declaration** → fully hoisted, own `this`, use for named utility functions
- **Expression** → not hoisted, own `this`, use when you need a function as a value
- **Arrow** → not hoisted, **lexical `this`**, no `arguments`, can't be a constructor
- Arrow functions are perfect for callbacks — they don't lose `this`
- **Lexical** = determined by where you wrote it, not how it's called
- In React, arrow functions are the default for components and handlers

---

## 🎯 Interview Questions

**Q1. What is the difference between a function declaration and a function expression?**

<details>
<summary>💡 See Answer</summary>

A **function declaration** is defined with the `function` keyword at the statement level. It is fully hoisted — both the name and body — so it can be called before it appears in the code.

A **function expression** is a function assigned to a variable. It follows the variable's hoisting rules — `const`/`let` expressions are in TDZ before their line, `var` expressions are `undefined`. It cannot be called before its definition.

```js
// Declaration — works before definition
greet(); // ✅ "Hello"
function greet() { return "Hello"; }

// Expression — throws
greet(); // ❌ ReferenceError (with const) or TypeError (with var)
const greet = function() { return "Hello"; };
```

</details>

---

**Q2. What is the difference between regular functions and arrow functions?**

<details>
<summary>💡 See Answer</summary>

Four key differences:

1. **`this` binding** — Regular functions have dynamic `this` (depends on call site). Arrow functions have lexical `this` (inherited from where they're written).

2. **`arguments` object** — Regular functions have it. Arrow functions don't — use rest params `...args` instead.

3. **Constructor** — Regular functions can be used with `new`. Arrow functions cannot.

4. **Syntax** — Arrow functions are shorter and can have implicit returns.

In practice: use arrow functions for callbacks and React components (they don't lose `this`). Use regular functions for methods that need their own `this` or when you need `arguments`.

</details>

---

**Q3. What is lexical `this` and why does it matter?**

<details>
<summary>💡 See Answer</summary>

Lexical `this` means `this` is determined by **where the function is written** in the source code, not by how it's called. Arrow functions use lexical `this` — they inherit `this` from their surrounding scope at definition time.

This matters because regular functions lose `this` in callbacks:

```js
const obj = {
  name: "Deepanshi",
  start: function() {
    setTimeout(function() {
      console.log(this.name); // ❌ undefined — this = window
    }, 1000);

    setTimeout(() => {
      console.log(this.name); // ✅ "Deepanshi" — inherited from start()
    }, 1000);
  }
};
```

Arrow functions solved a major pain point — before them, developers used `const self = this` or `.bind(this)` to preserve `this` in callbacks.

</details>

---

**Q4. When would you NOT use an arrow function?**

<details>
<summary>💡 See Answer</summary>

Three situations where you should NOT use arrow functions:

1. **Object methods** — arrow functions don't have their own `this`, so they can't access the object:
```js
const user = {
  name: "Deepanshi",
  greet: () => console.log(this.name) // ❌ undefined
  greet: function() { console.log(this.name) } // ✅
};
```

2. **Constructor functions** — arrow functions can't be used with `new`:
```js
const Person = (name) => { this.name = name; };
new Person("Deepanshi"); // ❌ TypeError
```

3. **When you need `arguments`** — arrow functions don't have the `arguments` object:
```js
const sum = () => arguments.reduce(...); // ❌ ReferenceError
function sum() { return [...arguments].reduce(...); } // ✅
```

</details>
