import { model, Schema, Model, Document } from 'mongoose';
import { ICompany, Company } from './Company';
import { Role } from './enum/enum';

export interface IUser extends Document {
    company: string;
    name: string;
    username: string;
    password: string;
    role: Role;
}

const UserSchema: Schema = new Schema({
    company: { type: Schema.Types.ObjectId, ref: Company },
    name: { type: String },
    username: {type: String },
    password: { type: String },
    role: { type: Role }
});

export const User: Model<IUser> = model('Users', UserSchema, 'Users');