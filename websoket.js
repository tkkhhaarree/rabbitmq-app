const ws = require("ws");
const w = new ws("wss://api-pub.bitfinex.com/ws/2");

w.on("message", (msg) => console.log(msg));

let msg = JSON.stringify({
   event: "subscribe",
   channel: "ticker",
   symbol: "tBTCUSD",
});

w.on("open", () => w.send(msg));

[
   28872,
   [
      57098,
      11.84181208,
      57099,
      8.54713818,
      -177,
      -0.0031,
      57086,
      9221.517223070001,
      57736,
      55282,
   ],
];
