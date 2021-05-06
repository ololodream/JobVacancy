import { ArgsType, Field, InputType, Int, ID } from '@nestjs/graphql';

@ArgsType()
@InputType("CompanyInput")
export class CompanyArgs {
  @Field({nullable: true})
  _id?: string;

  @Field({nullable: true})
  name?: string;

  @Field({nullable: true})
  address?: string;

}
