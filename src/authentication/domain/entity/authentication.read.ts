import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRead } from '../../../user/domain/entity/user.read';

export type AuthenticationReadDocument = HydratedDocument<AuthenticationRead>;

@Schema({ collection: 'authentications' })
export class AuthenticationRead {
    @Prop()
    public id: number;

    @Prop()
    public token: string;

    @Prop()
    public expire_in: string;

    @Prop({ type: UserRead })
    public user: UserRead;

    @Prop()
    public created_at: Date;

    @Prop()
    public updated_at: Date;
}

export const AuthenticationReadSchema = SchemaFactory.createForClass(AuthenticationRead);
