import { Module,NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserService } from './user.service';
// import { AuthMiddleware } from '../middleware/auth.middleware';

@Module({

  providers: [UserService]
})
export class UserModule { }
