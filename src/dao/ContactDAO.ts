import { FilterQuery } from 'mongoose';
import { ContactModel, IContact } from './../domains/ContactModel';

export class ContactDAO {
  async save(contact: IContact) {
    const savedContact = await ContactModel.create(contact);
    return savedContact;
  }

  async findByName(name: string) {
    const contacts = await ContactModel.find({
      name: {
        $regex: name,
        $options: 'i',
      }
    });

    return contacts;
  }

  async findByBirthdayPeriod(start: Date, end: Date) {
    const contacts = await ContactModel.find({
      birthday: {
        $gte: start,
        $lte: end
      }
    });

    return contacts;
  }

  async findByEmail(email: string) {
    const options: FilterQuery<IContact> = { email };
    const contact = await ContactModel.findOne(options);
    return contact;
  }
}