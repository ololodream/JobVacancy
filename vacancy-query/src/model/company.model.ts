import { ArgsType, Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { model, Schema, Model, Document, ObjectId } from 'mongoose';

@ObjectType()
export class Company extends Document {
  @Field(type => String, { nullable: true })
  _id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  address?: string;

}

const CompanySchema: Schema = new Schema({
    name: { type: String },
    address: {type: String }
});

export const MCompany: Model<Company> = model('Company', CompanySchema, 'Company');