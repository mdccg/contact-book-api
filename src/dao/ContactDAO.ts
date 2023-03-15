import { ContactModel, IContact } from './../domains/ContactModel';

export class ContactDAO {
  async save(contact: IContact) {
    const savedContact = await ContactModel.create(contact);
    return savedContact;
  }
}