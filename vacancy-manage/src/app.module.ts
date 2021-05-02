import { Module,NestModule, MiddlewareConsumer, HttpModule, HttpService  } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './user/controller/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/service/user.service';
import { AppService } from './app.service';
import { VacancyModule } from './vacancy/vacancy.module';
import { CompanyModule } from './company/company.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthMiddleware } from './middleware/auth.middleware';
import { RolesGuard } from './authorization/roles.guard';

@Module({
  imports: [UserModule, VacancyModule, CompanyModule, HttpModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService,{
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*');
  }
}

