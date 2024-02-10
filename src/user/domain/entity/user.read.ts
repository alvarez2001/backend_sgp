import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserReadDocument = HydratedDocument<UserRead>;

@Schema({ collection: 'users' })
export class UserRead {
    @Prop()
    public id: number;

    @Prop()
    public name: string;

    @Prop()
    public lastName: string;

    @Prop()
    public nationality: string;

    @Prop()
    public identification: string;

    @Prop()
    public email: string;

    @Prop()
    public username: string;

    @Prop()
    public password: string;

    @Prop()
    public created_at: Date;

    @Prop()
    public updated_at: Date;
}

export const UserReadSchema = SchemaFactory.createForClass(UserRead);
