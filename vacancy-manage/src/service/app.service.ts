import { Injectable } from '@nestjs/common';
import { User, IUser } from '../model/User';
import * as Enum from '../model/enum/enum';
import {connect, disconnect} from '../db/db.module';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    return "Hello World!";
  }
}
