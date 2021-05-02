import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateVacancyDto, UpdateVacancyDto } from './dto/VacancyDto';
import { IVacancy } from './model/Vacancy';
import { VacancyService } from './vacancy.service';

@Controller('vacancy')
export class VacancyController {
    constructor(
        private readonly vacancyService: VacancyService
    ) {}

    @Get()
    listAllVacancy(): Promise<IVacancy[]> {
        return this.vacancyService.getVacancies();
    }

    @Post()
    async createVacancy(@Body() createVacancyDto: CreateVacancyDto, @Res() res: Response) {
        await this.vacancyService.addVacancy(createVacancyDto);
        res.status(HttpStatus.CREATED).send();
    }

    @Delete(':id')
    async deleteVacancy(@Param() params, @Res() res: Response) {
        await this.vacancyService.deleteVacancy(params.id);
        res.status(HttpStatus.OK).send();
    }

    @Put()
    async updateVacancy(@Body() updateVacancyDto: UpdateVacancyDto, @Res() res: Response) {
        await this.vacancyService.updateVacancy(updateVacancyDto);
        res.status(HttpStatus.OK).send();
    }
  
}
