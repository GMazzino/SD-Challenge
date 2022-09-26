import express from 'express';
import logger from './utils/logger.js';
import clientsRouter from './routes/clients.js';

const server = express();
logger.info('Setting up sever');
server.set('views', `./src/views`);
server.set('view engine', 'ejs');
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));
server.use(`/clients`, clientsRouter);
server.all('*', (req, res) => {
  logger.warn(`Method ${req.method} on route "${req.originalUrl}" not implemented.`);
  res.status(400).json({
    error: `Método ${req.method} en ruta '${req.originalUrl}' no implementado.`,
  });
});

export default server;
