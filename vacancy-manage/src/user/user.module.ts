import { Module,NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
// import { AuthMiddleware } from '../middleware/auth.middleware';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
