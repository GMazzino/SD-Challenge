import { PERSISTENCE } from '../../config.js';
import logger from '../utils/logger.js';
let clients;

try {
  ({ clients: clients } = await import(`./${PERSISTENCE}/clients.js`));
} catch (err) {
  logger.error(`Module: dao/dao.js Error determining data container. Defaulting to MongoDB. ${err.message}`);
  // Defaults to mongoDB
  ({ clients: clients } = await import(`./mongo/clients.js`));
}

export { clients };
