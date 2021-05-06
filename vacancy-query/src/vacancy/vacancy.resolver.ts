import { Resolver, Query, ResolveField, Parent, Args } from '@nestjs/graphql';
import { Roles } from '../authorization/roles.decorator';
import { CompanyService } from '../company/company.service';
import { Company } from '../model/company.model';
import { Role } from 'src/model/enum/role.enum';
import { Vacancy } from 'src/model/vacancy.model';
import { UserService } from '../user/user.service';
import { VacancyArgs } from './dto/vacancy.args';
import { VacancyService } from './vacancy.service';

@Resolver(of => Vacancy)
export class VacancyResolver {
    constructor(
        private readonly vacancyService: VacancyService,
        private readonly companyService: CompanyService,
        private readonly userService: UserService,
    ) {};

    @Roles(Role.ADMIN, Role.USER)
    @Query(returns => [Vacancy])
    async vacancies() {
        return this.vacancyService.findAllVacancy();
    }

    @ResolveField()
    async company(@Parent() vacancy: Vacancy & { company: string }): Promise<Company> {
        return this.companyService.findOneById(vacancy.company);
    }

    @ResolveField()
    async publishedBy(@Parent() vacancy: Vacancy & { publishedBy: string }): Promise<Company> {
        return this.userService.findOneById(vacancy.publishedBy);
    }

    @Roles(Role.ADMIN, Role.USER)
    @Query(returns => [Vacancy])
    async vacancy(@Args() args: VacancyArgs) {
        return this.vacancyService.findVacancy(args);
    }
}
