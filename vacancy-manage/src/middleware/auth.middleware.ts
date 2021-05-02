import { Injectable, NestMiddleware, HttpService, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Role } from 'src/user/model/enum/role.enum';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private httpService: HttpService) {}
  
  async use(req: Request, res: Response, next: NextFunction) {
    
    let token = req.headers.authorization.replace('Bearer ', '');
    await this.httpService.post('http://localhost:3001/verify', { token: token }).toPromise()
    // await this.httpService.post('http://'+process.env.DB_HOST+":"+process.env.DB_PORT+'/verify', { token: token }).toPromise()
    .then( res => {
        
        // console.log(req);
           req['user'] = res.data;
      next();
    })
    .catch( err => {
    
      console.log(err);
      
      throw new HttpException(err.toJSON().message, HttpStatus.UNAUTHORIZED);
    })
  }
}
