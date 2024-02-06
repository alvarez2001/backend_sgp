import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRead } from '../../../user/domain/entity/user.read';

export type AuthenticationReadDocument = HydratedDocument<AuthenticationRead>;

@Schema({ collection: 'authentications' })
export class AuthenticationRead {
  @Prop()
  id: number;

  @Prop()
  token: string;

  @Prop()
  expire_in: string;

  @Prop({ type: UserRead })
  user: UserRead;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const AuthenticationReadSchema =
  SchemaFactory.createForClass(AuthenticationRead);
