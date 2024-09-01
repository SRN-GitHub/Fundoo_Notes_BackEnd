// // consumer.js
// import { getChannel } from './rabbitmq.js';

// export const consumeFromQueue = async (queueName, callback) => {
//     const channel = getChannel();
//     await channel.assertQueue(queueName, { durable: true });
//     channel.consume(queueName, (message) => {
//         if (message !== null) {
//             callback(message.content.toString());
//             channel.ack(message);
//         }
//     });
// };
