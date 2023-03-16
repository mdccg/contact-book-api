import { Router } from 'express';
import { ContactController } from '../controllers/ContactController';

export const contactsRouter = Router();
const contactController = new ContactController();

contactsRouter.post('/', (req, res) => contactController.save(req, res));
contactsRouter.get('/name/:name', (req, res) => contactController.findByName(req, res));
contactsRouter.get('/birthday', (req, res) => contactController.findByBirthdayPeriod(req, res));