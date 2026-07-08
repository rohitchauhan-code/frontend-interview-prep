// function factorial(n) {
//   if (n <= 1) return n;
//   return n * factorial(n - 1);
// }
// console.log("Test");
// console.log("test---", factorial(5));


function outer() {
  let val = 10;

  function middle() {
    let val = 20; // shadows outer's val

    function inner() {
      console.log(val); // which val?
    }

    inner();
    console.log(val); // which val?
  }

  middle();
  console.log(val); // which val?
}

outer();