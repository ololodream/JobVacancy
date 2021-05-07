import { Module, NestModule, MiddlewareConsumer, HttpModule } from '@nestjs/common';
import { AppService } from './app.service';
import { VacancyModule } from './vacancy/vacancy.module';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './authorization/roles.guard';


@Module({
  imports: [
    VacancyModule,
    CompanyModule,
    UserModule,
    HttpModule
  ],
  controllers: [],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*');
  }
}
