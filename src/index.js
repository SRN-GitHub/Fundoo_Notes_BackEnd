import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import routes from './routes';
import database from './config/database';
import {
  appErrorHandler,
  genericErrorHandler,
  notFound
} from './middlewares/error.middleware';
import logger, { logStream } from './config/logger';

const app = express();

// Initialize environment variables
const host = process.env.APP_HOST || 'localhost';
const port = process.env.APP_PORT || 3000; 
const api_version = process.env.API_VERSION || 'v1'; // Provide default values if not set
  
// Middleware setup
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined', { stream: logStream }));

// Connect to the database
database();

// Route handling
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
