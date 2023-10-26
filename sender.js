var amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", function (error0, connection) {
   if (error0) {
      throw error0;
   }
   connection.createChannel(function (error1, channel) {
      if (error1) {
         throw error1;
      }
      var queue = "appqueue";
      var message = "hello world once again!";

      channel.assertQueue(queue, { durable: false });

      channel.sendToQueue(queue, Buffer.from(message));
      console.log(" [x] sent %s", message);
   });

   setTimeout(function () {
      connection.close();
      process.exit(0);
   }, 500);
});
