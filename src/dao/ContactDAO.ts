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
}