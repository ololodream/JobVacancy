import { Test, TestingModule } from '@nestjs/testing';
import { IVacancy } from './model/Vacancy';
import { VacancyController } from './vacancy.controller';
import {VacancyService} from './vacancy.service';

describe('VacancyController', () => {
  let controller: VacancyController;
  let service: VacancyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VacancyController],
      providers:[VacancyService],
    }).compile();

    controller = module.get<VacancyController>(VacancyController);
    service = module.get<VacancyService>(VacancyService);
    
    
  });


  describe('listAllVacancy', () => {
    it('should return an array of Vacancies', async () => {
      let result = [];
      let result_vacancy = {title: "a", description:"a", expireAt: new Date(), publishedBy: "", company: "a"};
      result.push(result_vacancy);    
      jest.spyOn(service, 'getVacancies').mockImplementation(async() => result);
      expect(await controller.listAllVacancy()).toBe(result);
    });
  });


});
