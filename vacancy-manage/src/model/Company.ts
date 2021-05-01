import { model, Schema, Model, Document } from 'mongoose';

export interface ICompany extends Document {
    name: string;
    address: string;
}

const CompanySchema: Schema = new Schema({
    name: { type: String },
    address: {type: String }
});

export const Company: Model<ICompany> = model('Company', CompanySchema, 'Company');