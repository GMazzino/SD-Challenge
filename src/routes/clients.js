import { Router } from 'express';
import {
  getClients,
  getClientByDNI,
  delClientByDNI,
  addNewClient,
  updateClientByDNI,
} from '../controllers/routers/clients_controller.js';

const router = Router();

router.get('/:field/:order', getClients);

router.get('/:dni', getClientByDNI);

router.delete('/', delClientByDNI);

router.post('/', addNewClient);

router.put('/', updateClientByDNI);

export default router;
