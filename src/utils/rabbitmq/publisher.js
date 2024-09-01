const amqp = require('amqplib');

const sendMessage = async (message) => {
  let connection = null;
  let channel = null;
  try {
    connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    const queue = 'SendEmailQueue';

    await channel.assertQueue(queue, {
      durable: true,
    });

    console.log('Sending message to RabbitMQ:', message);

    channel.sendToQueue(queue, Buffer.from(message), {
      persistent: true,
    });

    console.log('Message sent to RabbitMQ');
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  } finally {
    if (channel) {
      try {
        await channel.close();
      } catch (error) {
        console.error('Error closing channel:', error);
      }
    }
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error('Error closing connection:', error);
      }
    }
  }
};

export const sendEmailMessage = async (email, subject, text) => {
  console.log('Preparing to send email:', { email, subject, text });

  const emailMessage = JSON.stringify({
    to: email,
    subject: subject,
    text: text,
  });

  await sendMessage(emailMessage);
};
