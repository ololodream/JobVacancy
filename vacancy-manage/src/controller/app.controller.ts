import { Controller, Get } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { UserService } from '../service/user.service';
import {IUser} from '../model/User';

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
