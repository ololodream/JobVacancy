import { Module,NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserService } from './service/user.service';
// import { AuthMiddleware } from '../middleware/auth.middleware';

@Module({

  exports: [UserService]
})
export class UserModule { }
