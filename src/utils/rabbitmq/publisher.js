// publisher.js
import { getChannel } from './rabbitmq.js';

export const publishToQueue = async (queueName, message) => {
    const channel = getChannel();
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(message));
    console.log(`Message sent to queue ${queueName}: ${message}`);
};
