import { Injectable } from '@nestjs/common';
import { CompanyService } from '../company/company.service';
import { connect } from '../db/db';
import { MVacancy, Vacancy } from '../model/vacancy.model';
import { UserService } from '../user/user.service';
import { VacancyArgs } from './dto/vacancy.args';

@Injectable()
export class VacancyService {
    constructor(
        private readonly userService: UserService,
        private readonly companyService: CompanyService,
    ) {};

    async findAllVacancy(): Promise<Vacancy[]> {
        connect();
        return MVacancy.find({});
    }

    async findVacancyById(id: string): Promise<Vacancy> {
        connect();
        return MVacancy.findOne({_id: id});
    }

    async findVacancy(vacancyArgs: VacancyArgs) {
        connect();
        // console.log(vacancyArgs)
        // if (!vacancyArgs.publishedBy && !vacancyArgs.company)
        // return MVacancy.find(vacancyArgs);
        let query = {};
        query = vacancyArgs;
        if (vacancyArgs.publishedBy) {
            let user = await this.userService.find(vacancyArgs.publishedBy);
            query['publishedBy'] = { $in: user }
        }
        if (vacancyArgs.company) {
            let company = await this.companyService.find(vacancyArgs.company);
            query['company'] = { $in: company }
        }
        return MVacancy.find(query);
    }

}
