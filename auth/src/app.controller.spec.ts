import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignTokenDto, VerifyTokenDto} from './dto/TokenDto';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  const response = {
    send: (body?: any) => body,
    status: (code: number) => response,
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });


  describe('ligin', () => {
    it('shloud return token"', async() => {

      let signTokenDto = new SignTokenDto;
      signTokenDto.username="admin";
      signTokenDto.password="admin";
      
      jest.spyOn(appService, 'login').mockImplementation(async () => Promise.resolve("token") );
      expect(await appController.login(signTokenDto, response)).toBe('token');
    });
  });

  describe('verify', () => {
    it('should return decoded token', async () => {
      let verifyTokenDto = new VerifyTokenDto();
      verifyTokenDto.token="token";
      let decoded = {username: "", role: "admin"}

      jest.spyOn(appService, 'verify').mockImplementation(() => decoded);
      expect(await appController.verify(verifyTokenDto, response)).toBe(decoded);
    });
  })

});
