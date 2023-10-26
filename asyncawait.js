const axios = require("axios");

async function getdata() {
   try {
      const resp = await axios.get("https://dog.ceo/api/breeds/list/all");
      console.log(resp);
   } catch (e) {
      console.error(e);
   }
}

// //getdata();

// axios
//    .get("https://dog.ceo/api/breeds/list/all")
//    .then((resp) => console.log(resp))
//    .catch((e) => console.log(e))
//    .finally(console.log("quit"));

// function hello() {
//    console.log("world");
// }

// setTimeout(hello, 2000);

// var z = { a: 1, b: 2 };

// var x = () => ({ ...z, c: 3 });

// console.log(x());

function outer() {
   var b = 10;
   function inner() {
      var a = 20;
      b = a + b;
      console.log(b);
   }
   return inner;
}

var X = outer();
var Y = outer();
//end of outer() function executions
X(); // X() invoked the first time
X(); // X() invoked the second time
X(); // X() invoked the third time
Y(); // Y() invoked the first time
