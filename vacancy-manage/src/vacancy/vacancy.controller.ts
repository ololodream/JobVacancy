import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateVacancyDto, UpdateVacancyDto } from './Dto/VacancyDto';
import { IVacancy } from '../vacancy/model/Vacancy';
import { VacancyService } from './vacancy.service';
import {Roles} from '../authorization/roles.decorator'
import {Role} from '../user/model/enum/role.enum'

@Controller('vacancy')
export class VacancyController {
    constructor(
        private readonly vacancyService: VacancyService
    ) {}

    @Get()
    // @Roles(Role.ADMIN)
    listAllVacancy(): Promise<IVacancy[]> {
        return this.vacancyService.getVacancies();
    }

    @Post()
    @Roles(Role.ADMIN)
    async createVacancy(@Body() createVacancyDto: CreateVacancyDto, @Res() res: Response) {
        await this.vacancyService.addVacancy(createVacancyDto);
        res.status(HttpStatus.CREATED).send();
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    async deleteVacancy(@Param() params, @Res() res: Response) {
        await this.vacancyService.deleteVacancy(params.id);
        res.status(HttpStatus.OK).send();
    }

    @Put()
    @Roles(Role.ADMIN)
    async updateVacancy(@Body() updateVacancyDto: UpdateVacancyDto, @Res() res: Response) {
        await this.vacancyService.updateVacancy(updateVacancyDto);
        res.status(HttpStatus.OK).send();
    }
  
}
