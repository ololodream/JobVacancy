import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { IVacancy, Vacancy } from './model/Vacancy';
import {connect} from '../db/db'
import {CreateVacancyDto, UpdateVacancyDto} from './dto/vacancyDto'

@Injectable()
export class VacancyService {

    async getVacancies(): Promise<IVacancy[]> {
        connect();
        return await Vacancy.find({}).populate('company');
    }

    private async isVacancyExist(id: string): Promise<boolean> {
        connect();
        return await Vacancy.exists({_id: id});
    }

    async addVacancy(vacancy: CreateVacancyDto) {
        connect();
        if (await this.isVacancyExist(vacancy.company)) {
            throw new HttpException("vacancy exist", HttpStatus.NOT_ACCEPTABLE);
        }
        return Vacancy.create(vacancy);
    }

    async deleteVacancy(id: string) {
        connect();
        if (!await this.isVacancyExist(id)) {
            throw new HttpException("vacancy not exist", HttpStatus.NOT_ACCEPTABLE);
        }
        return Vacancy.deleteOne({_id:id});
    }

    async updateVacancy(vacancy: UpdateVacancyDto) {
        connect();
        if (!await this.isVacancyExist(vacancy.id)) {
            throw new HttpException("Vacancy not found", HttpStatus.NOT_FOUND);
        }
        return Vacancy.updateOne({_id: vacancy.id}, {title: vacancy.title, description: vacancy.description, expireAt: vacancy.expireAt, company: vacancy.company});
    }
    
}
