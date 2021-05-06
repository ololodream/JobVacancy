import { model, Schema, Model, Document } from 'mongoose';
import { Company } from './company.model';
import { User } from './user.model';
import { ArgsType, Field, InputType, Int, ObjectType, DateScalarMode } from '@nestjs/graphql';


@ObjectType()
export class Vacancy extends Document {
  @Field({ nullable: true })
  _id?: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  expireAt?: string;

  @Field({ nullable: true })
  publishedBy?: User;
  
  @Field({ nullable: true })
  company?: Company;
}

const VacancySchema: Schema = new Schema({
    title: { type: String },
    description: { type: String },
    expireAt: { type: Date},
    publishedBy: { type: Schema.Types.ObjectId, ref: User },
    company: { type: Schema.Types.ObjectId, ref: Company }
});

export const MVacancy: Model<Vacancy> = model('Vacancy', VacancySchema, 'Vacancy');