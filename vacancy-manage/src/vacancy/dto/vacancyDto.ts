export class CreateVacancyDto{
    title: string;
    description: string;
    expireAt: Date;
    company: string;
}

export class UpdateVacancyDto{
    id: string;
    title: string;
    description: string;
    expireAt: Date;
    company: string;
}