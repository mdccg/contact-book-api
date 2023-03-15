import { Router } from 'express';
import { ContactController } from '../controllers/ContactController';

export const contactsRouter = Router();
const contactController = new ContactController();

contactsRouter.post('/', (req, res) => contactController.save(req, res));