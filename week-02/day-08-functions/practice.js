// ============================================================
// Day 8 — Functions: Declarations vs Expressions vs Arrow
// Instructions: Predict the output BEFORE running each block.
// ============================================================


// ----------------------------------------------------------
// Exercise 1 — Hoisting behaviour
// Which ones work before their definition?
// ----------------------------------------------------------
console.log("--- Exercise 1 ---");

// Test 1 — Declaration
try {
  console.log(sayHi("Deepanshi")); // ?
  function sayHi(name) { return "Hi " + name; }
} catch(e) { console.log("Error:", e.message); }

// Test 2 — const expression
try {
  console.log(sayBye("Deepanshi")); // ?
  const sayBye = function(name) { return "Bye " + name; };
} catch(e) { console.log("Error:", e.message); }

// Test 3 — var expression
try {
  console.log(sayHello("Deepanshi")); // ?
  var sayHello = function(name) { return "Hello " + name; };
} catch(e) { console.log("Error:", e.message); }

// Expected:
// "Hi Deepanshi"         ← declaration, fully hoisted ✅
// Error: Cannot access... ← const in TDZ ❌
// Error: sayHello is...   ← var hoisted as undefined, not a function ❌


// ----------------------------------------------------------
// Exercise 2 — this with regular functions
// ----------------------------------------------------------
console.log("\n--- Exercise 2 ---");

const user = {
  name: "Deepanshi",
  greetRegular: function() {
    return "Hello " + this.name;
  },
  greetArrow: () => {
    return "Hello " + this.name;
  }
};

console.log(user.greetRegular()); // ?
console.log(user.greetArrow());   // ?

// Expected:
// "Hello Deepanshi"  ← regular: this = user ✅
// "Hello undefined"  ← arrow: this = global (where it was written) ❌


// ----------------------------------------------------------
// Exercise 3 — Detached regular function loses this
// ----------------------------------------------------------
console.log("\n--- Exercise 3 ---");

const person = {
  name: "Deepanshi",
  greet: function() {
    return "Hello " + this.name;
  }
};

const greetFn = person.greet;  // detached from object

console.log(person.greet());   // ?
console.log(greetFn());        // ?

// Expected:
// "Hello Deepanshi"  ← called on object, this = person ✅
// "Hello undefined"  ← called standalone, this = global ❌


// ----------------------------------------------------------
// Exercise 4 — Arrow inherits this from parent
// ----------------------------------------------------------
console.log("\n--- Exercise 4 ---");

const timer = {
  name: "Deepanshi",

  startRegular: function() {
    // Simulate callback with immediately invoked function
    const callback = function() {
      return this.name; // which this?
    };
    return callback();
  },

  startArrow: function() {
    const callback = () => {
      return this.name; // which this?
    };
    return callback();
  }
};

console.log(timer.startRegular()); // ?
console.log(timer.startArrow());   // ?

// Expected:
// undefined     ← regular: callback has own this = global ❌
// "Deepanshi"   ← arrow: inherits this from startArrow = timer ✅


// ----------------------------------------------------------
// Exercise 5 — arguments object
// ----------------------------------------------------------
console.log("\n--- Exercise 5 ---");

function regularSum() {
  return Array.from(arguments).reduce((a, b) => a + b, 0);
}

const arrowSum = (...args) => {
  return args.reduce((a, b) => a + b, 0);
};

console.log(regularSum(1, 2, 3, 4)); // ?
console.log(arrowSum(1, 2, 3, 4));   // ?

// Both print: 10
// But arrowSum uses rest params (...args) — the modern approach


// ----------------------------------------------------------
// Exercise 6 — Arrow function syntax
// Predict output of each
// ----------------------------------------------------------
console.log("\n--- Exercise 6 ---");

const double   = n => n * 2;
const add      = (a, b) => a + b;
const getUser  = () => ({ name: "Deepanshi", age: 28 });
const multiLine = (n) => {
  const result = n * n;
  return result;
};

console.log(double(5));         // ?
console.log(add(3, 4));         // ?
console.log(getUser().name);    // ?
console.log(multiLine(4));      // ?

// Expected: 10, 7, "Deepanshi", 16


// ----------------------------------------------------------
// Exercise 7 — Arrow as constructor
// ----------------------------------------------------------
console.log("\n--- Exercise 7 ---");

function RegularPerson(name) {
  this.name = name;
}

const ArrowPerson = (name) => {
  this.name = name;
};

try {
  const p1 = new RegularPerson("Deepanshi");
  console.log(p1.name); // ?
} catch(e) { console.log("RegularPerson error:", e.message); }

try {
  const p2 = new ArrowPerson("Deepanshi");
  console.log(p2.name); // ?
} catch(e) { console.log("ArrowPerson error:", e.message); }

// Expected:
// "Deepanshi"                           ← regular: works ✅
// "ArrowPerson is not a constructor"    ← arrow: fails ❌


// ----------------------------------------------------------
// Challenge 1 — Fix the this problem
// The greet method loses 'this' inside the callback
// Fix it using an arrow function
// ----------------------------------------------------------
console.log("\n--- Challenge 1 ---");

const student = {
  name: "Deepanshi",
  subjects: ["JS", "React", "Node"],

  printSubjects: function() {
    this.subjects.forEach(function(subject) {
      // ❌ 'this' is lost here — fix this using arrow function
      console.log(this.name + " studies " + subject);
    });
  }
};

// student.printSubjects(); // currently broken — fix it


// ✅ Fixed version:
const studentFixed = {
  name: "Deepanshi",
  subjects: ["JS", "React", "Node"],

  printSubjects: function() {
    this.subjects.forEach((subject) => {
      // YOUR FIX HERE
    });
  }
};

studentFixed.printSubjects();

// Expected:
// Deepanshi studies JS
// Deepanshi studies React
// Deepanshi studies Node


// ----------------------------------------------------------
// Challenge 2 — Which function type should you use?
// Write the correct type for each scenario
// ----------------------------------------------------------
console.log("\n--- Challenge 2 ---");

// Scenario 1: A utility function used throughout the app
// → Use: function declaration (hoisted, easy to call anywhere)
function formatDate(date) {
  return date.toLocaleDateString();
}

// Scenario 2: A React component
// → Use: arrow function expression
const UserCard = ({ name, age }) => (
  `<div>${name} — ${age}</div>`
);

// Scenario 3: A forEach callback that needs access to outer 'this'
// → Use: arrow function
const team = {
  lead: "Deepanshi",
  members: ["Alice", "Bob"],
  announce: function() {
    this.members.forEach(member => {
      console.log(`${this.lead} leads ${member}`);
    });
  }
};

team.announce();

// Scenario 4: A constructor function
// → Use: regular function (or class)
function Product(name, price) {
  this.name = name;
  this.price = price;
}

const laptop = new Product("MacBook", 150000);
console.log(laptop.name);


// ----------------------------------------------------------
// Solutions
// ----------------------------------------------------------

/*
// Challenge 1 — Fixed version
printSubjects: function() {
  this.subjects.forEach((subject) => {       // ← arrow inherits this
    console.log(this.name + " studies " + subject);
  });
}
*/
