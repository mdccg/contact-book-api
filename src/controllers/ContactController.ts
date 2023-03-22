import { Request, Response } from 'express';
import { ContactModel, validateContactInputs } from './../domains/ContactModel';
import { ContactDAO } from './../dao/ContactDAO';
import { validate as validateEmail } from 'email-validator';

export class ContactController {
  private _contactDAO: ContactDAO;

  constructor() {
    this.contactDAO = new ContactDAO();
  }

  async save(req: Request, res: Response) {
    const errorMessages = validateContactInputs(req.body);
    
    if (errorMessages.length === 0) {
      const { name, email, phone, birthday } = req.body;
      
      const existingContact = await this.contactDAO.findByEmail(email);

      if (existingContact) {
        const errorMessages = ['A user with this email already exists'];
        return res.status(409).json({ errorMessages });
      }

      const contact = new ContactModel({
        name,
        email,
        phone,
        birthday: new Date(birthday)
      });

      const savedContact = await this.contactDAO.save(contact);
      return res.status(201).json({ contact: savedContact });
    }

    return res.status(400).json({ errorMessages });
  }

  async findByName(req: Request, res: Response) {
    const { name } = req.params;

    const contacts = await this.contactDAO.findByName(name);

    return res.json({ contacts });
  }

  async findByBirthdayPeriod(req: Request, res: Response) {
    const { start, end } = req.query;
    const dateRegExp = new RegExp(/^\d{4}\-\d{2}\-\d{2}$/);
    const errorMessages: string[] = [];

    if (!dateRegExp.test(`${start}`) || !dateRegExp.test(`${end}`)) {
      errorMessages.push('Invalid date format');
      return res.status(400).json({ errorMessages });
    }
    
    const startDate = new Date(`${start}`);
    const endDate = new Date(`${end}`);

    if (startDate <= endDate) {
      const contacts = await this.contactDAO.findByBirthdayPeriod(
        startDate,
        endDate
      );

      return res.json({ contacts });
    }

    errorMessages.push('Start date cannot be greater than end date');
    return res.status(400).json({ errorMessages });
  }

  async findByEmail(req: Request, res: Response) {
    const { email } = req.params;
    const errorMessages: string[] = [];
    let hasError: boolean = false;

    if (!email) {
      errorMessages.push('Email not provided');
      hasError = true;
    }

    if (!validateEmail(email)) {
      errorMessages.push('Invalid email');
      hasError = true;
    }
    
    if (hasError) {
      return res.status(400).json({ errorMessages });
    } else {
      const contact = await this.contactDAO.findByEmail(email);
      return res.json({ contact });
    }
  }

  public get contactDAO(): ContactDAO {
    return this._contactDAO;
  }

  public set contactDAO(value: ContactDAO) {
    this._contactDAO = value;
  }
}