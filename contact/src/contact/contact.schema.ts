import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema()
export class Contact {
  @Prop({ type: Number, required: true })
  id: number;

  @Prop({
    type: String,
    required: true,
    match: /^[a-zA-Z\s]+$/,
  })
  FirstName: string;

  @Prop({
    type: String,
    required: true,
    match: /^[a-zA-Z\s]+$/,
  })
  LastName: string;

  @Prop({
    type: String,
    required: true,
    match: /^.+@.+\..+$/,
  })
  Email: string;

  @Prop({
    type: String,
    required: true,
    match: /^[0-9]{10}$/,
  })
  Phone: string;

  @Prop()
  avatar?: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
