import { Document, model, Schema } from 'mongoose';
import { validate as validateEmail } from 'email-validator';

export interface IContact extends Document {
  name: string;
  email?: string;
  phone: string;
  birthday: Date;
}

const schema = new Schema<IContact>({
  name: {
    type: String,
    required: true,
    unique: false
  },
  email: {
    type: String,
    required: false,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  birthday: {
    type: Date,
    required: true,
    unique: false
  }
});

export const ContactModel = model<IContact>('Contact', schema);

export const validateContactInputs = (contactObject: any): string[] => {
  const { name, email, phone, birthday } = contactObject;

  const errorMessages: string[] = [];

  if (!name) {
    errorMessages.push('Name cannot be empty');
  }

  if (!validateEmail(email)) {
    errorMessages.push('Invalid email');
  }

  if (!(phone as string).match(/^\(\d{2}\).\d{5}\-\d{4}$/)) {
    errorMessages.push('Phone must have the following pattern: (99) 99999-9999');
  }

  if ((birthday as string).match(/^\d{4}\-\d{2}\-\d{2}$/)) {
    if (new Date(birthday) > new Date()) {
      errorMessages.push('Birthday must be previous to today');
    }
  } else {
    errorMessages.push('Invalid date format');
  }

  return errorMessages;
}