function outer() {
   var a = 10;
   function inner() {
      var b = 5;
      a = a + b;
      console.log(a);
   }
   return inner;
}

var X = outer();
X();
X();
X();
