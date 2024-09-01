import dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import routes from './routes';
import database from './config/database'; 
// import { connectRabbitMQ } from './utils/rabbitmq/rabbitmq'; // Import the RabbitMQ connection

import {
  appErrorHandler,
  genericErrorHandler,
  notFound
} from './middlewares/error.middleware';
import logger, { logStream } from './config/logger';

import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';

// Correct the path to point to the exact location of swaggerFile.json
const swaggerFilePath = path.resolve(__dirname, './swagger/swaggerFile.json'); 

let swaggerDoc;

try {
  const swaggerData = fs.readFileSync(swaggerFilePath, 'utf8');
  swaggerDoc = JSON.parse(swaggerData);
} catch (error) {
  logger.error(`Failed to read Swagger file: ${error.message}`);
  swaggerDoc = {}; // Fallback to an empty object to prevent server crash
}

const app = express();

// Initialize environment variables
const host = process.env.APP_HOST || 'localhost';
const port = process.env.APP_PORT || 4051; 
const api_version = process.env.API_VERSION || 'v1'; // Provide default values if not set

// Middleware setup
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined', { stream: logStream }));

// Connect to the database
database();

// Connect to RabbitMQ
// connectRabbitMQ().then(() => {
//   logger.info('Connected to RabbitMQ successfully.');
// }).catch((error) => {
//   logger.error(`Failed to connect to RabbitMQ: ${error.message}`);
//   process.exit(1); // Exit the process if RabbitMQ connection fails
// });

// Route handling
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc)); // Correct Swagger UI setup
app.use(`/api/${api_version}`, routes());

// Error handling middleware
app.use(notFound);
app.use(appErrorHandler);
app.use(genericErrorHandler);

// Start the server
app.listen(port, () => {
  logger.info(`Server started at http://${host}:${port}/api/${api_version}/`);
});

export default app;
