import * as dotenv from 'dotenv';

//------------------------------------------------
//   Config vars
//
// Application environment: "dev": development, "prod": production
const APP_ENV = 'dev';
// Console logging level -> info, warn, error
export const LOG_LEVEL = 'info';
// Data container. mongo is the only option by now...
export const PERSISTENCE = 'mongo';
//------------------------------------------------

dotenv.config({ path: APP_ENV == 'dev' ? './dev.env' : APP_ENV == 'prod' ? './prod.env' : '' });

export const SERVER_PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1/clients';

export const mongoRemote = {
  client: 'mongodb',
  url: MONGO_URL,
  advancedOptions: { useNewUrlParser: true, useUnifiedTopology: true },
};
