import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from "./user/service/user.service";
import {IUser} from './user/model/User';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService
  ) {}

  @Get()
  getHello(): Promise<string> {
    return this.appService.getHello();
  }
}
