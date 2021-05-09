import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    console.log("################app service");
    return "Hello World!";
  }
}
