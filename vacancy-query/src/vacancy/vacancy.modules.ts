import { Module } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { VacancyResolver } from './vacancy.resolver';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
  ],
  providers: [VacancyService VacancyResolver]
})
export class VacancyModule {}
