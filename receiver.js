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

      channel.assertQueue(queue, { durable: false });

      console.log(
         "[*] waiting for messages in %s. To exit press Ctrl+C",
         queue
      );
      channel.consume(
         queue,
         function (msg) {
            console.log("Received %s", msg.content.toString());
         },
         { noAck: true }
      );
   });
});
