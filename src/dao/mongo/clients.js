import { mongoose, clientsModel } from '../../models/db/mongo.js';
import { mongoRemote } from '../../../config.js';
import logger from '../../utils/logger.js';

class Clients {
  async #dbConnection() {
    try {
      await mongoose.connect(mongoRemote.url, mongoRemote.advancedOptions);
    } catch (err) {
      logger.error(`Module: dao/mongo/clients.js Method: #dbConnection (2) -> ${err}`);
      throw Error(err.message);
    }
    mongoose.connection.on('error', (err) => {
      logger.error(`Module: dao/mongo/clients.js Method: #dbConnection (1) -> ${err}`);
      throw Error(err.message);
    });
    return mongoose.connection;
  }

  async getAllClients(field, order) {
    let db;
    try {
      db = await this.#dbConnection();
      let clients = await clientsModel.find({}).sort(JSON.parse(`{"${field}":"${order}"}`));
      await db.close();
      return { status: 200, content: clients };
    } catch (err) {
      logger.error(`Module: dao/mongo/clients.js Method: getAllClients -> ${err}`);
      return {
        status: 500,
        content: `Server error: ${err.message}`,
      };
    }
  }

  async getClientByDNI(dni) {
    let db;
    try {
      db = await this.#dbConnection();
      let query = await clientsModel.findOne({ dni: dni });
      await db.close();
      if (query !== null) {
        return { status: 200, content: query };
      } else {
        return { status: 200, content: 'Cliente no encontrado' };
      }
    } catch (err) {
      logger.error(`Module: dao/mongo/clients.js Method: getClientByDNI -> ${err}`);
      return {
        status: 500,
        content: `Server error: ${err.message}`,
      };
    }
  }

  async delClientByDNI(dni) {
    let db;
    try {
      db = await this.#dbConnection();
      let query = await clientsModel.findOneAndDelete({ dni: dni });
      await db.close();
      if (query !== null) {
        return { status: 200, content: 'Cliente borrado' };
      } else {
        return { status: 200, content: 'Cliente no encontrado' };
      }
    } catch (err) {
      logger.error(`Module: dao/mongo/clients.js Method: delClientByDNI -> ${err}`);
      return {
        status: 500,
        content: `Server error: ${err.message}`,
      };
    }
  }

  async addNewClient(newClient) {
    let db;
    try {
      db = await this.#dbConnection();
      const existingClient = await clientsModel.findOne({ dni: newClient.dni });
      if (!existingClient) {
        const createdClient = await clientsModel.create(newClient);
        await db.close();
        if (createdClient) {
          return { status: 201, content: 'Cliente creado' };
        } else {
          return { status: 500, content: 'El cliente no pudo ser creado' };
        }
      } else {
        return { status: 200, content: 'Ya existe un cliente con el DNI ingresado' };
      }
    } catch (err) {
      logger.error(`Module: dao/mongo/clients.js Method: addNewClient -> ${err.message}`);
      return {
        status: 500,
        content: `Server error: ${err.message}`,
      };
    }
  }

  async updateClientByDNI(client) {
    let db;
    try {
      db = await this.#dbConnection();
      let query = await clientsModel.findOneAndUpdate(
        { dni: client.dni },
        { name: client.name, lastname: client.lastname, sex: client.sex, phone: client.phone }
      );
      await db.close();
      if (query !== null) {
        return { status: 201, content: 'Cliente actualizado' };
      } else {
        return { status: 200, content: 'No se pudo actualizar el cliente ya que no fue encontrado' };
      }
    } catch (err) {
      logger.error(`Module: dao/mongo/clients.js Method: updateClient -> ${err}`);
      return {
        status: 500,
        content: `Server error: ${err.message}`,
      };
    }
  }
}

const clients = new Clients();
export { clients };
