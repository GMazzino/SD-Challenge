import server from './server.js';
import { SERVER_PORT } from '../config.js';
import logger from './utils/logger.js';

server
  .listen(SERVER_PORT, () => {
    logger.info(`Server running and listening on port ${SERVER_PORT}`);
  })
  .on('error', (error) => {
    logger.error(`Module: main.js -> ${error.message}`);
  });
