import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserReadDocument = HydratedDocument<UserRead>;

@Schema({ collection: 'users' })
export class UserRead {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  lastName: string;

  @Prop()
  nationality: string;

  @Prop()
  identification: string;

  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  type: number;

  @Prop()
  status: number;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const UserReadSchema = SchemaFactory.createForClass(UserRead);
