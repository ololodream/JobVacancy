import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './user/controller/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/service/user.service';
import { AppService } from './app.service';
import { VacancyModule } from './vacancy/vacancy.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [UserModule, VacancyModule, CompanyModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
