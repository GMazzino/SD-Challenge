export const SERVER_PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1/clients';
export const mongoRemote = {
  client: 'mongodb',
  url: MONGO_URL,
  advancedOptions: { useNewUrlParser: true, useUnifiedTopology: true },
};
// Console logging level -> info, warn, error
export const LOG_LEVEL = 'info';
// Data container
export const PERSISTENCE = 'mongo';
