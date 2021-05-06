import { Injectable } from '@nestjs/common';
import { connect } from '../db/db';
import { Company, MCompany } from '../model/company.model';
import { CompanyArgs } from '../vacancy/dto/company.args';

@Injectable()
export class CompanyService {

    async findOneById(id: string): Promise<Company> {
        connect();
        return await MCompany.findOne({ _id: id });
    }

    async find(companyArgs: CompanyArgs) {
        connect();
        return await MCompany.find(companyArgs).select('_id');
    }
}
