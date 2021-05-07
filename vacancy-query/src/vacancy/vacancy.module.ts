import { Module } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { VacancyResolver } from './vacancy.resolver';

import { CompanyModule } from '../company/company.module';
import { CompanyService } from '../company/company.service';
import { GraphQLModule } from '@nestjs/graphql';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    CompanyModule, 
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
  ],
  providers: [VacancyService, CompanyService, UserService, VacancyResolver]
})
export class VacancyModule {}
