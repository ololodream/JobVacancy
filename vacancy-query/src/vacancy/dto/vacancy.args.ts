import { ArgsType, Field, Int, DateScalarMode } from '@nestjs/graphql';
import { CompanyArgs } from './company.args';
import { UserArgs } from './user.args';

@ArgsType()
export class VacancyArgs {
    @Field({ nullable: true })
    _id?: string;
  
    @Field({ nullable: true })
    title?: string;
  
    @Field({ nullable: true })
    description?: string;
  
    @Field({ nullable: true })
    expireAt?: string;
  
    @Field({ nullable: true })
    publishedBy?: UserArgs;
    
    @Field({ nullable: true })
    company?: CompanyArgs;
}
