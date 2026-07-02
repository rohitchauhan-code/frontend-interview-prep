# 🗺️ Frontend Interview Prep — Full Roadmap

> **Stack:** JavaScript → React → Node.js → CSS → Design Patterns → System Design  
> **Pace:** 10 minutes/day | **Total:** ~40 weeks  
> **Approach:** Beginner → Advanced, one concept at a time

---

## 📦 Phase 1 — JavaScript (Weeks 1–14)
> Master the language before the framework

### 🟢 Week 1 — Variables, Types & Scope
| Day | Topic |
|-----|-------|
| 1 | `var` vs `let` vs `const` + Hoisting ✅ |
| 2 | Temporal Dead Zone (TDZ) ✅ |
| 3 | Primitive vs Reference Types ✅ |
| 4 | Type Coercion (`==` vs `===`) ✅ |
| 5 | `typeof` & `null` quirks ✅ |
| 6 | Closures — concept ✅ |
| 7 | Closures — patterns & use cases |

### 🟢 Week 2 — Functions Deep Dive
| Day | Topic |
|-----|-------|
| 8  | Function declarations vs expressions vs arrow functions |
| 9  | `this` keyword — 4 binding rules |
| 10 | `call`, `apply`, `bind` |
| 11 | IIFE (Immediately Invoked Function Expression) |
| 12 | Higher-order functions |
| 13 | Pure functions & side effects |
| 14 | Default params, rest `...args`, spread `...` |

### 🟢 Week 3 — Arrays & Objects
| Day | Topic |
|-----|-------|
| 15 | Array methods — `map`, `filter`, `reduce` |
| 16 | Array methods — `find`, `findIndex`, `some`, `every`, `flat` |
| 17 | Chaining array methods |
| 18 | Object methods — `keys`, `values`, `entries`, `assign` |
| 19 | Destructuring — objects & arrays |
| 20 | Spread & rest in objects |
| 21 | Optional chaining `?.` & nullish coalescing `??` |

### 🟢 Week 4 — Prototypes & OOP
| Day | Topic |
|-----|-------|
| 22 | Prototype chain — how JS inheritance actually works |
| 23 | `Object.create()` — prototypal inheritance without classes |
| 24 | ES6 Classes — `class`, `constructor`, methods |
| 25 | `extends` and `super` |
| 26 | Static methods & private fields (`#`) |
| 27 | `instanceof`, `hasOwnProperty`, `Object.getPrototypeOf` |
| 28 | Mixins pattern |

### 🟡 Week 5 — Asynchronous JavaScript ⭐ (Most Asked)
| Day | Topic |
|-----|-------|
| 29 | The Event Loop — call stack, web APIs, callback queue, microtask queue |
| 30 | Callbacks & callback hell |
| 31 | Promises — `.then`, `.catch`, `.finally` |
| 32 | `Promise.all`, `Promise.race`, `Promise.allSettled`, `Promise.any` |
| 33 | `async` / `await` |
| 34 | Error handling in async code — `try/catch` |
| 35 | Debounce & Throttle |

### 🟡 Week 6 — Modern JavaScript (ES6–ES2024)
| Day | Topic |
|-----|-------|
| 36 | Template literals & tagged templates |
| 37 | Symbols & well-known symbols |
| 38 | Iterators & `for...of` loop |
| 39 | Generators (`function*`, `yield`) |
| 40 | `Map` and `Set` |
| 41 | `WeakMap` and `WeakSet` |
| 42 | Proxy & Reflect |

### 🟡 Week 7 — Error Handling & Modules
| Day | Topic |
|-----|-------|
| 43 | `try`, `catch`, `finally`, `throw` |
| 44 | Custom error classes |
| 45 | ES Modules — `import` / `export` |
| 46 | CommonJS vs ES Modules |
| 47 | Dynamic `import()` — code splitting |
| 48 | Module patterns (named, default, re-exports) |
| 49 | Tree shaking & dead code elimination |

### 🔴 Week 8 — DOM & Events
| Day | Topic |
|-----|-------|
| 50 | DOM tree — nodes, elements, traversal |
| 51 | `querySelector`, `querySelectorAll`, traversal methods |
| 52 | Creating, modifying & removing DOM elements |
| 53 | Event listeners — `addEventListener`, `removeEventListener` |
| 54 | Event bubbling, capturing, `stopPropagation` |
| 55 | Event delegation |
| 56 | Custom events |

### 🔴 Week 9 — Browser APIs & Storage
| Day | Topic |
|-----|-------|
| 57 | `fetch` API — GET, POST, headers, body |
| 58 | `XMLHttpRequest` vs `fetch` vs `axios` |
| 59 | `localStorage`, `sessionStorage`, `cookies` |
| 60 | `IndexedDB` basics |
| 61 | `requestAnimationFrame` & animations |
| 62 | `IntersectionObserver` & `MutationObserver` |
| 63 | Web Workers |

### 🔴 Week 10 — Advanced JavaScript Patterns
| Day | Topic |
|-----|-------|
| 64 | Currying & partial application |
| 65 | Compose & pipe |
| 66 | Memoization deep dive |
| 67 | Recursion & tail call optimisation |
| 68 | The module pattern |
| 69 | Observer pattern |
| 70 | Functional programming concepts |

### 🔴 Week 11 — Performance & Internals
| Day | Topic |
|-----|-------|
| 71 | V8 engine — JIT compilation, hidden classes, inline caching |
| 72 | Memory management & garbage collection |
| 73 | Memory leaks — causes & how to find them |
| 74 | `WeakRef` & `FinalizationRegistry` |
| 75 | Performance APIs — `performance.now()`, `PerformanceObserver` |
| 76 | Critical rendering path |
| 77 | `requestIdleCallback` & `requestAnimationFrame` |

### 🔴 Week 12 — TypeScript Essentials
| Day | Topic |
|-----|-------|
| 78 | Types vs Interfaces |
| 79 | Union types, intersection types, type guards |
| 80 | Generics |
| 81 | Utility types — `Partial`, `Pick`, `Omit`, `Record`, `Readonly` |
| 82 | Enums & literal types |
| 83 | Declaration files (`.d.ts`) |
| 84 | TypeScript with DOM & async |

### 🔴 Week 13 — Regular Expressions & Functional JS
| Day | Topic |
|-----|-------|
| 85 | RegEx basics — patterns, flags, character classes |
| 86 | RegEx methods — `test`, `match`, `replace`, `split` |
| 87 | Lookaheads & lookbehinds |
| 88 | Immutability patterns |
| 89 | Functional array operations |
| 90 | Point-free programming |
| 91 | Transducers |

### 🔴 Week 14 — JS Interview Practice
| Day | Topic |
|-----|-------|
| 92  | Implement: `debounce` from scratch |
| 93  | Implement: `throttle` from scratch |
| 94  | Implement: `Promise.all` from scratch |
| 95  | Implement: `deep clone` from scratch |
| 96  | Implement: `flat` from scratch |
| 97  | Implement: `bind` from scratch |
| 98  | Mixed JS problems — full review |

---

## ⚛️ Phase 2 — React (Weeks 15–22)
> Build UIs the right way

### Week 15 — React Fundamentals
JSX, components, props, state, controlled inputs, conditional rendering, list rendering

### Week 16 — Hooks Deep Dive ⭐
`useState`, `useEffect`, `useRef`, `useMemo`, `useCallback`, `useReducer`, custom hooks

### Week 17 — Context & State Management
Context API, Zustand, Redux Toolkit, `createAsyncThunk`

### Week 18 — React Router & Code Splitting
React Router v6, dynamic routes, protected routes, `React.lazy`, `Suspense`, error boundaries

### Week 19 — React Performance
`React.memo`, reconciliation, keys, Profiler, virtualisation, Web Vitals, batching

### Week 20 — Testing
Jest, React Testing Library, async testing, MSW, custom hook testing

### Week 21 — TypeScript with React
Typing props, generics in components, utility types, HOC types

### Week 22 — Advanced React Patterns
HOC, Render Props, Compound Components, controlled components, state machines

---

## 🟩 Phase 3 — Node.js (Weeks 23–27)
> Build the backend

### Week 23 — Node Fundamentals
Event loop, modules (CJS vs ESM), `fs`, `path`, streams, buffers, `child_process`

### Week 24 — Express.js & REST APIs
Routes, middleware, error handling, validation, REST design, folder structure

### Week 25 — Authentication & Security
JWT, refresh tokens, bcrypt, CORS, helmet, rate limiting, XSS, CSRF, SQLi

### Week 26 — Databases
SQL basics, MongoDB + Mongoose, indexing, connection pooling, transactions

### Week 27 — Node Advanced
Docker, env variables, caching (Redis), WebSockets, GraphQL basics, deployment

---

## 🎨 Phase 4 — CSS (Weeks 28–32)
> Make it look great

### Week 28 — CSS Fundamentals
Box model, specificity, cascade, inheritance, `display`, `position`, `z-index`

### Week 29 — Layouts
Flexbox deep dive, CSS Grid deep dive, responsive design, `clamp()`

### Week 30 — Modern CSS
CSS variables (custom properties), `calc()`, CSS animations & transitions, `@keyframes`

### Week 31 — Component Styling
BEM, CSS Modules, Styled Components, Tailwind CSS

### Week 32 — CSS Performance & Accessibility
Critical CSS, `will-change`, `contain`, `content-visibility`, `prefers-reduced-motion`

---

## 🏗️ Phase 5 — Design Patterns (Weeks 33–35)
> Write code that scales

### Week 33 — JavaScript Patterns
Module, Singleton, Observer, Factory, Strategy, Decorator, Command

### Week 34 — React Patterns
HOC, Render Props, Compound Components, Container/Presentational, State machines

### Week 35 — Architectural Patterns
MVC vs Flux, Atomic Design, Micro-frontends, Monorepo, Feature-based structure

---

## 🧱 Phase 6 — Frontend System Design (Weeks 36–40)
> Whiteboard like a senior

### Week 36 — System Design Fundamentals
Component API design, state architecture, routing, design systems, a11y, i18n

### Week 37 — Performance at Scale
Critical rendering path, caching, SSR/CSR/SSG/ISR, Next.js, bundle optimisation

### Week 38 — Real-World Problems (Part 1)
Design: Twitter feed, Google Docs editor, YouTube

### Week 39 — Real-World Problems (Part 2)
Design: Chat app, form builder, autocomplete, Trello board

### Week 40 — Mock Interviews & Final Prep
Behavioural Q&A, STAR format, live coding practice, system design walkthroughs

---

## 📊 Progress Tracker

| Phase | Topics | Status |
|:--|:--|:--|
| JavaScript | 98 days | 🟡 In Progress (Day 6/98) |
| React | 56 days | ⬜ Not Started |
| Node.js | 35 days | ⬜ Not Started |
| CSS | 35 days | ⬜ Not Started |
| Design Patterns | 21 days | ⬜ Not Started |
| System Design | 35 days | ⬜ Not Started |
| **Total** | **280 days** | |

---

<p align="center">
  <sub>Beginner → Advanced · 10 minutes/day · Built for Deepanshi</sub>
</p>
