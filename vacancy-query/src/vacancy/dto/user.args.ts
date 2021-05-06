import { ArgsType, Field, Int, InputType } from '@nestjs/graphql';
import { CompanyArgs } from './company.args';

@ArgsType()
@InputType("UserInput")
export class UserArgs {
  @Field({nullable: true})
  _id?: string;

  @Field({nullable: true})
  name?: string;

  @Field({nullable: true})
  username?: string;

  @Field({nullable: true})
  password?: string;

  @Field({nullable: true})
  role?: string;

}
