import { model, Schema, Model, Document } from 'mongoose';
import { IUser, User } from 'src/user/model/User';
import { ICompany, Company } from 'src/user/model/Company';

export interface IVacancy extends Document {
    title: string;
    description: string;
    expireAt: Date;
    publishedBy: string;
    company: string;
}

const VacancySchema: Schema = new Schema({
    title: { type: String },
    description: { type: String },
    expireAt: { type: Date},
    publishedBy: { type: Schema.Types.ObjectId, ref: User },
    company: { type: Schema.Types.ObjectId, ref: Company }
});

export const Vacancy: Model<IVacancy> = model('Vacancy', VacancySchema, 'Vacancy');