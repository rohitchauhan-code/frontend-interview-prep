// ============================================================
// Day 9 — `this` Keyword: The 4 Binding Rules
// Instructions: Predict the output BEFORE running each block.
// ============================================================


// ----------------------------------------------------------
// Exercise 1 — Default Binding
// ----------------------------------------------------------
console.log("--- Exercise 1 ---");

function show() {
  console.log(this === globalThis); // ?
}

show();

// Expected: true — standalone call, this = global


// ----------------------------------------------------------
// Exercise 2 — Implicit Binding
// ----------------------------------------------------------
console.log("\n--- Exercise 2 ---");

const user = {
  name: "Deepanshi",
  greet() {
    console.log(this.name);
  }
};

const admin = {
  name: "Admin",
  greet: user.greet  // same function, different object
};

user.greet();  // ?
admin.greet(); // ?

// Expected:
// "Deepanshi" ← this = user
// "Admin"     ← this = admin (same function, different context)


// ----------------------------------------------------------
// Exercise 3 — Implicit Binding Loss
// ----------------------------------------------------------
console.log("\n--- Exercise 3 ---");

const person = {
  name: "Deepanshi",
  greet() {
    console.log(this.name);
  }
};

const fn = person.greet;  // detached!

person.greet(); // ?
fn();           // ?

// Expected:
// "Deepanshi"  ← bound to person ✅
// undefined    ← detached, this = global ❌


// ----------------------------------------------------------
// Exercise 4 — Explicit Binding (call, apply, bind)
// ----------------------------------------------------------
console.log("\n--- Exercise 4 ---");

function introduce(greeting, punctuation) {
  console.log(greeting + " I am " + this.name + punctuation);
}

const u1 = { name: "Deepanshi" };
const u2 = { name: "Rohit" };

introduce.call(u1, "Hello,", "!");    // ?
introduce.apply(u2, ["Hi,", "."]);    // ?

const boundFn = introduce.bind(u1);
boundFn("Hey,", "~");                 // ?

// Expected:
// "Hello, I am Deepanshi!"
// "Hi, I am Rohit."
// "Hey, I am Deepanshi~"


// ----------------------------------------------------------
// Exercise 5 — new Binding
// ----------------------------------------------------------
console.log("\n--- Exercise 5 ---");

function Car(brand, speed) {
  this.brand = brand;
  this.speed = speed;
  this.describe = function() {
    return this.brand + " goes " + this.speed + "kmph";
  };
}

const car1 = new Car("Tesla", 250);
const car2 = new Car("BMW", 280);

console.log(car1.describe()); // ?
console.log(car2.describe()); // ?
console.log(car1 === car2);   // ?

// Expected:
// "Tesla goes 250kmph"
// "BMW goes 280kmph"
// false — each new creates a separate object


// ----------------------------------------------------------
// Exercise 6 — Priority: Explicit beats Implicit
// ----------------------------------------------------------
console.log("\n--- Exercise 6 ---");

const a = { name: "A", show() { console.log(this.name); } };
const b = { name: "B" };

a.show();            // ?
a.show.call(b);      // ?

// Expected:
// "A"  — implicit: this = a
// "B"  — explicit beats implicit: this = b


// ----------------------------------------------------------
// Exercise 7 — The Timer Bug
// ----------------------------------------------------------
console.log("\n--- Exercise 7 ---");

function Counter() {
  this.count = 0;

  // ❌ Broken — regular function loses 'this'
  // setInterval(function() {
  //   this.count++;
  //   console.log(this.count); // NaN
  // }, 1000);

  // ✅ Fixed — arrow function inherits 'this'
  setInterval(() => {
    this.count++;
    console.log(this.count);
  }, 500);
}

// Uncomment to test (runs every 500ms, stop with Ctrl+C):
// const c = new Counter();


// ----------------------------------------------------------
// Challenge 1 — Predict all 4
// ----------------------------------------------------------
console.log("\n--- Challenge 1 ---");

function show() { return this?.name ?? "no name"; }

const x = { name: "X", show };
const y = { name: "Y" };

console.log(x.show());          // ?
console.log(show());            // ?
console.log(x.show.call(y));    // ?
console.log(x.show.bind(y)()); // ?

// Expected:
// "X"       — implicit: this = x
// "no name" — default: this = global (no name property)
// "Y"       — explicit call: this = y
// "Y"       — bind then call: this = y


// ----------------------------------------------------------
// Challenge 2 — Fix the broken code
// The forEach callback loses 'this' — fix it
// ----------------------------------------------------------
console.log("\n--- Challenge 2 ---");

const classroom = {
  teacher: "Deepanshi",
  students: ["Alice", "Bob", "Charlie"],

  // ❌ Broken version
  rollCallBroken: function() {
    this.students.forEach(function(student) {
      console.log(this.teacher + " calls " + student); // this.teacher = undefined
    });
  },

  // ✅ Fix 1 — arrow function
  rollCallFixed: function() {
    this.students.forEach((student) => {
      console.log(this.teacher + " calls " + student);
    });
  },

  // ✅ Fix 2 — bind
  rollCallBound: function() {
    this.students.forEach(function(student) {
      console.log(this.teacher + " calls " + student);
    }.bind(this));
  }
};

// classroom.rollCallBroken(); // broken — uncomment to see
classroom.rollCallFixed();
classroom.rollCallBound();

// Both fixed versions expected:
// "Deepanshi calls Alice"
// "Deepanshi calls Bob"
// "Deepanshi calls Charlie"


// ----------------------------------------------------------
// Challenge 3 — call vs apply vs bind
// Use each one to invoke greet with the right this
// ----------------------------------------------------------
console.log("\n--- Challenge 3 ---");

function greet(timeOfDay, emoji) {
  return `Good ${timeOfDay}, ${this.name}! ${emoji}`;
}

const dev = { name: "Deepanshi" };

// Use call:
console.log(greet.call(dev, "morning", "☀️"));

// Use apply:
console.log(greet.apply(dev, ["evening", "🌙"]));

// Use bind (invoke later):
const greetDev = greet.bind(dev, "afternoon");
console.log(greetDev("🌤️"));

// Expected:
// "Good morning, Deepanshi! ☀️"
// "Good evening, Deepanshi! 🌙"
// "Good afternoon, Deepanshi! 🌤️"
