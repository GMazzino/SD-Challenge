import { clients } from '../../dao/dao.js';

export async function getClients(req, res) {
  const query = await clients.getAllClients(req.params.field, req.params.order);
  await res.status(query.status).render('clients.ejs', { clients: query.content });
}

export async function getClientByDNI(req, res) {
  const query = await clients.getClientByDNI(req.params.dni);
  res.status(query.status).send(query.content);
}

export async function delClientByDNI(req, res) {
  const query = await clients.delClientByDNI(req.body.dni);
  res.status(query.status).send(query.content);
}

export async function addNewClient(req, res) {
  const query = await clients.addNewClient(req.body);
  res.status(query.status).send(query.content);
}

export async function updateClientByDNI(req, res) {
  const query = await clients.updateClientByDNI(req.body);
  res.status(query.status).send(query.content);
}
