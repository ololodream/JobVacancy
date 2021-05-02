import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SignTokenDto } from './dto/TokenDto';
import { connect } from './db/db';
import { User } from './model/User';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async login(signTokenDto: SignTokenDto): Promise<string> {
    connect();
    console.log(await User.find({}), signTokenDto)
    let user = await User.findOne({username: signTokenDto.username, password: signTokenDto.password});
    if (!user) {
      throw new HttpException("Username or password not found", HttpStatus.UNAUTHORIZED);
    }
    
    return jwt.sign({ username: signTokenDto.username, role: user.role }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRE });
  }

  verify(token: string) {
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch(err) {
      throw new HttpException("Invalid Token", HttpStatus.UNAUTHORIZED);
    }
  }
}
