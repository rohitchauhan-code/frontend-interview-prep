# Day 6 — Closures

> **In one line:** A closure is a function that remembers the variables from its outer scope even after that outer function has finished executing — the inner function carries its scope with it like a backpack.

---

## ⚙️ How It Works — Execution Context

Every time a function is called, JS creates an **Execution Context** — a box containing its local variables and a reference to its outer scope.

When the function **finishes**, this box is normally **destroyed**. Closures break this rule.

```
Normal function:
outer() runs → creates { count: 0 } → outer() ends → { count: 0 } destroyed ❌

With closure:
outer() runs → creates { count: 0 } → outer() ends
inner() holds reference to count → { count: 0 } stays alive ✅
```

---

## 🎒 The Backpack Model

When a function is **defined** inside another function, it automatically captures a reference to everything in the outer scope — like packing a backpack.

```js
function outer() {
  let count = 0;         // outer variable

  function inner() {
    count++;             // references outer's count
    console.log(count);
  }

  return inner;          // hand out inner WITH its backpack
}

const counter = outer(); // outer() is done, but count stays alive
counter(); // 1
counter(); // 2
counter(); // 3
```

```
inner function
┌──────────────────────────────────┐
│  function body: count++          │
│                                  │
│  backpack (closure):             │
│  ┌────────────────────────────┐  │
│  │  count → [memory address]  │  │
│  └────────────────────────────┘  │
└──────────────────────────────────┘
```

---

## 🧠 Step by Step in Memory

```js
const counter = outer(); // Step 1
counter();               // Step 2
counter();               // Step 3
```

**Step 1** — `outer()` runs, creates `count = 0` and `inner`. outer() finishes.  
`count` stays in memory because `inner` holds a reference to it.  
`counter` now points to `inner`.

**Step 2** — `counter()` runs → `count` goes from 0 → 1 → prints `1`

**Step 3** — `counter()` runs → same `count` in memory → 1 → 2 → prints `2`

---

## ⚠️ Each Call Creates a Separate Closure

Every call to `outer()` creates a **brand new scope** — closures don't share state.

```js
const counter1 = outer();
const counter2 = outer();

counter1(); // 1
counter1(); // 2

counter2(); // 1 ← completely separate count
counter2(); // 2
```

```
Memory:
counter1 → inner → [ count: 2 ]   ← own closure
counter2 → inner → [ count: 2 ]   ← own closure, independent
```

---

## 🔍 The Scope Chain

When `inner()` needs `count`, JS searches in this order:

```
1. inner()'s own scope       → not found
         ↓
2. outer()'s scope (closure) → found! ✅
         ↓
3. global scope              → (would check here if not found above)
```

---

## 💡 Real Use Cases

### 1 — Private Variables

```js
function createCounter() {
  let count = 0;  // private — not accessible from outside

  return {
    increment() { count++; },
    decrement() { count--; },
    reset()     { count = 0; },
    getCount()  { return count; }
  };
}

const counter = createCounter();
counter.increment();
counter.increment();
console.log(counter.getCount()); // 2
console.log(counter.count);      // undefined — private ✅
```

---

### 2 — Function Factories

```js
function multiplier(factor) {
  return function(number) {
    return number * factor;  // factor is closed over
  };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

---

### 3 — makeAdder (Classic Interview Question)

```js
function makeAdder(x) {
  return function(y) {
    return x + y;  // x is closed over
  };
}

const add5 = makeAdder(5);
console.log(add5(3));  // 8
console.log(add5(10)); // 15

// Or called immediately:
console.log(makeAdder(5)(3)); // 8
```

---

### 4 — Memoization

```js
function memoize(fn) {
  const cache = {};  // closed over — persists between calls

  return function(n) {
    if (cache[n] !== undefined) {
      console.log("cached");
      return cache[n];
    }
    cache[n] = fn(n);
    return cache[n];
  };
}

const square = memoize(n => n * n);
square(4); // calculates → 16
square(4); // "cached"   → 16
square(5); // calculates → 25
```

---

## 🪤 Classic Closure Trap — Loop + var

```js
function makeFunctions() {
  const funcs = [];

  for (var i = 0; i < 3; i++) {
    funcs.push(function() { return i; });
  }

  return funcs;
}

const fns = makeFunctions();
console.log(fns[0]()); // 3 ❌ — not 0
console.log(fns[1]()); // 3 ❌ — not 1
console.log(fns[2]()); // 3 ❌ — not 2
```

All three functions close over the **same `i`** (because `var` is function-scoped). By the time any of them run, the loop is done and `i` is `3`.

**Fix with `let`** — creates a new `i` per iteration:

```js
for (let i = 0; i < 3; i++) {
  funcs.push(function() { return i; });
}
// fns[0]() → 0, fns[1]() → 1, fns[2]() → 2 ✅
```

---

## ⚛️ Closures in React Every Day

```jsx
function SearchBar() {
  const [query, setQuery] = useState("");

  // handleSearch closes over 'query'
  function handleSearch() {
    fetch(`/api/search?q=${query}`) // query from closure
      .then(res => res.json())
      .then(data => console.log(data));
  }

  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}
```

### Stale Closure Bug in React

```js
// ❌ Bug — count is stale inside setTimeout
const [count, setCount] = useState(0);

function handleClick() {
  setTimeout(() => {
    console.log(count); // always 0 — captures old value
  }, 3000);
  setCount(count + 1);
}

// ✅ Fix — functional update doesn't rely on closed-over state
setCount(prev => prev + 1);
```

---

## 🍳 Analogy

> When a function is created inside another function, it packs a **backpack** with every variable from the outer scope. When the outer function finishes, the inner function walks out the door with its backpack still on. The variables in the backpack stay alive as long as the inner function exists — no matter where it's called from.

---

## ✅ Takeaways

- A closure is created when an inner function references a variable from its outer scope
- The outer variable stays alive in memory as long as the inner function exists
- Each call to the outer function creates a **new, independent** closure
- JS finds variables by walking up the **scope chain** — local → outer → global
- Closures enable private variables, function factories, and memoization
- Every React event handler and hook callback uses closures
- Stale closures in React happen when a callback captures an old state value

---

## 🎯 Interview Questions

**Q1. What is a closure in JavaScript?**

<details>
<summary>💡 See Answer</summary>

A closure is a function that retains access to its outer scope's variables even after the outer function has finished executing. When an inner function is defined inside an outer function, it captures a live reference to the outer scope's variables — not a copy. Those variables stay in memory as long as the inner function exists.

```js
function outer() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter = outer(); // outer is done
counter(); // 1 — count still alive via closure
counter(); // 2
```

</details>

---

**Q2. What is a practical use case for closures?**

<details>
<summary>💡 See Answer</summary>

Several real-world uses:

**Private variables** — variables in the outer scope aren't accessible from outside:
```js
function createCounter() {
  let count = 0; // private
  return {
    increment() { count++; },
    getCount()  { return count; }
  };
}
```

**Function factories** — functions that produce customised functions:
```js
const double = multiplier(2);
const triple = multiplier(3);
```

**Memoization** — caching results using a closed-over cache object.

**React hooks** — `useState`, `useEffect` callbacks, and event handlers all rely on closures to access component state.

</details>

---

**Q3. What is a stale closure and how do you fix it in React?**

<details>
<summary>💡 See Answer</summary>

A stale closure happens when a function closes over a value that later becomes outdated — the function captured the value at one point in time, but the value has since changed.

In React this often happens with async operations:

```js
const [count, setCount] = useState(0);

function handleClick() {
  setTimeout(() => {
    console.log(count); // stale — always prints 0
  }, 3000);
  setCount(count + 1);
}
```

The `setTimeout` callback closed over `count = 0`. Even after `count` updates, the callback still holds the old value.

**Fixes:**
1. Use the functional update form: `setCount(prev => prev + 1)`
2. Use a `ref` to always get the latest value: `const countRef = useRef(count)`
3. Add the value to `useEffect`'s dependency array so the effect re-runs

</details>
