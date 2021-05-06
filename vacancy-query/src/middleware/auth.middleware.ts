import { Injectable, NestMiddleware, HttpService, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private httpService: HttpService) {}
  
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      throw new HttpException("Token Not Found", HttpStatus.UNAUTHORIZED);
    }
    let token = req.headers.authorization.replace('Bearer ', '');
    await this.httpService.post(process.env.AUTH_PROVIDER_URL, { token: token }).toPromise()
    .then( res => {
      req['user'] = res.data;
      next();
    })
    .catch( err => {
      console.log(err);
      throw new HttpException(err.toJSON().message, HttpStatus.UNAUTHORIZED);
    })
  }
}
