import { Controller, Get, Post, Body, Res, HttpStatus} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import {SignTokenDto, VerifyTokenDto} from './dto/TokenDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Post('login')
  async login(@Body() signTokenDto: SignTokenDto, @Res() res) {
    return res.status(HttpStatus.OK).send(await this.appService.login(signTokenDto)); 
  }

  @Post('verify')
  verify(@Body() verifyTokenDto: VerifyTokenDto, @Res() res) {
    let decode = this.appService.verify(verifyTokenDto.token);
    return res.status(HttpStatus.OK).send(decode); 
  } 

}
