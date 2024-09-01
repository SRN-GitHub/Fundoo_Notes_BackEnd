// import amqp from 'amqplib';

// const amqpUrl = process.env.RABBITMQ_URL || 'amqp://localhost:5672';

// let connection;
// let channel;

// export const connectRabbitMQ = async () => {
//   try {
//     connection = await amqp.connect(amqpUrl);
//     channel = await connection.createChannel();
//     console.log('Connected to RabbitMQ');

//     // Ensure the queue exists
//     await channel.assertQueue('notes', { durable: true });
//   } catch (error) {
//     console.error('Failed to connect to RabbitMQ:', error);
//     throw error;
//   }
// };

// export const getChannel = () => {
//   if (!channel) {
//     throw new Error('Channel not initialized');
//   }
//   return channel;
// };

// export const closeConnection = async () => {
//   if (connection) {
//     await connection.close();
//   }
// };
