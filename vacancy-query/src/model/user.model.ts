import { model, Schema, Model, Document } from 'mongoose';
import { Company } from './company.model';
import { Role } from './enum/role.enum';
import { ArgsType, Field, InputType, Int, ObjectType, DateScalarMode } from '@nestjs/graphql';


@ObjectType()
export class User extends Document {
  @Field(type => String, { nullable: true })
  _id?: string;

  @Field({ nullable: true })
  company?: Company;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  role?: string;
}

const UserSchema: Schema = new Schema({
    company: { type: Schema.Types.ObjectId, ref: Company },
    name: { type: String },
    username: {type: String },
    password: { type: String },
    role: { type: Role }
});

export const MUser: Model<User> = model('Users', UserSchema, 'Users');